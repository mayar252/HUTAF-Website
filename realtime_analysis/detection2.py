# Import libraries
import numpy as np
import pandas as pd
import cv2
from PIL import Image, ImageColor
from ultralytics import YOLO
from sklearn.metrics import mean_squared_error
import skimage.color
import os
import json
import yaml
import time
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap

def get_labels_dics():
    """Load labels and keypoints mapping from configuration files."""
    # Get tactical map keypoints positions dictionary
    json_path = "/Users/mayaralthebati/Desktop/realtime_analysis/pitch map labels position.json"
    with open(json_path, 'r') as f:
        keypoints_map_pos = json.load(f)

    # Get football field keypoints numerical to alphabetical mapping
    yaml_path = "/Users/mayaralthebati/Desktop/realtime_analysis/config pitch dataset.yaml"
    with open(yaml_path, 'r') as file:
        classes_names_dic = yaml.safe_load(file)
    classes_names_dic = classes_names_dic['names']

    # Get football field objects (players, ball, etc.) numerical to alphabetical mapping
    yaml_path = "/Users/mayaralthebati/Desktop/realtime_analysis/config players dataset.yaml"
    with open(yaml_path, 'r') as file:
        labels_dic = yaml.safe_load(file)
    labels_dic = labels_dic['names']
    return keypoints_map_pos, classes_names_dic, labels_dic

def create_colors_info(team1_name, team1_p_color, team1_gk_color, team2_name, team2_p_color, team2_gk_color):
    """Create color dictionaries and LAB color list for team prediction."""
    team1_p_color_rgb = ImageColor.getcolor(team1_p_color, "RGB")
    team1_gk_color_rgb = ImageColor.getcolor(team1_gk_color, "RGB")
    team2_p_color_rgb = ImageColor.getcolor(team2_p_color, "RGB")
    team2_gk_color_rgb = ImageColor.getcolor(team2_gk_color, "RGB")

    colors_dic = {
        team1_name: [team1_p_color_rgb, team1_gk_color_rgb],
        team2_name: [team2_p_color_rgb, team2_gk_color_rgb]
    }
    colors_list = colors_dic[team1_name] + colors_dic[team2_name]
    color_list_lab = [skimage.color.rgb2lab([i / 255 for i in c]) for c in colors_list]
    return colors_dic, color_list_lab

def generate_file_name():
    """Generate a unique output file name."""
    list_video_files = os.listdir('./outputs/')
    idx = 0
    while True:
        idx += 1
        output_file_name = f'detect_{idx}'
        if output_file_name + '.mp4' not in list_video_files:
            break
    return output_file_name

def create_heatmap(tac_map, player_positions, team_name, output_path):
    """
    Create a heatmap of player positions and save it as an image.
    
    Args:
        tac_map: The tactical map image
        player_positions: List of player positions (x, y) for a specific team
        team_name: Name of the team for the heatmap
        output_path: Path to save the heatmap image
    """
    # Create a copy of the tactical map
    heatmap_img = tac_map.copy()
    
    # Convert to grayscale for the heatmap
    gray = cv2.cvtColor(heatmap_img, cv2.COLOR_BGR2GRAY)
    
    # Create a blank canvas for the heatmap
    heatmap = np.zeros_like(gray, dtype=np.float32)
    
    # Add player positions to the heatmap
    for pos in player_positions:
        x, y = int(pos[0]), int(pos[1])
        # Add a Gaussian kernel at each player position
        cv2.circle(heatmap, (x, y), 20, 1, -1)
    
    # Apply Gaussian blur to smooth the heatmap
    heatmap = cv2.GaussianBlur(heatmap, (21, 21), 0)
    
    # Normalize the heatmap
    heatmap = heatmap / np.max(heatmap)
    
    # Create a custom colormap (blue to red)
    colors = [(0, 0, 1), (0, 1, 0), (1, 0, 0)]
    n_bins = 100
    cmap = LinearSegmentedColormap.from_list("custom", colors, N=n_bins)
    
    # Apply the colormap
    heatmap_colored = cv2.applyColorMap(
        (heatmap * 255).astype(np.uint8), 
        cv2.COLORMAP_JET
    )
    
    # Overlay the heatmap on the tactical map
    alpha = 0.6
    overlay = cv2.addWeighted(heatmap_img, 1 - alpha, heatmap_colored, alpha, 0)
    
    # # Add title
    # cv2.putText(
    #     overlay, 
    #     f"{team_name} Heatmap", 
    #     (20, 40), 
    #     cv2.FONT_HERSHEY_SIMPLEX, 
    #     1, 
    #     (255, 255, 255), 
    #     2
    # )
    
    # Save the heatmap
    cv2.imwrite(output_path, overlay)
    
    return overlay

def detect(cap, frame, output_file_name, save_output, model_players, model_keypoints,
           hyper_params, ball_track_hyperparams, plot_hyperparams, num_pal_colors, colors_dic, color_list_lab):
    """
    Process a single frame for detection, team prediction, and tactical mapping.
    Returns the annotated frame.
    """
    show_k = plot_hyperparams[0]  # Show keypoints
    show_pal = plot_hyperparams[1]  # Show color palettes
    show_b = plot_hyperparams[2]  # Show ball tracks
    show_p = plot_hyperparams[3]  # Show players

    p_conf = hyper_params[0]  # Players detection confidence
    k_conf = hyper_params[1]  # Keypoints detection confidence
    k_d_tol = hyper_params[2]  # Keypoints displacement tolerance

    nbr_frames_no_ball_thresh = ball_track_hyperparams[0]
    ball_track_dist_thresh = ball_track_hyperparams[1]
    max_track_length = ball_track_hyperparams[2]

    nbr_team_colors = len(list(colors_dic.values())[0])
    
    # Initialize ball position variables
    detected_ball_src_pos = None
    detected_ball_dst_pos = None

    # Static variables (persistent across frames)
    if not hasattr(detect, 'state'):
        detect.state = {
            'prev_frame_time': 0,
            'ball_track_history': {'src': [], 'dst': []},
            'nbr_frames_no_ball': 0,
            'detected_labels_prev': [],
            'detected_labels_src_pts_prev': [],
            'homog': None,
            'frame_nbr': 0,
            'team1_positions': [],  # Store positions for team 1
            'team2_positions': []   # Store positions for team 2
        }
    state = detect.state

    # Read tactical map image
    tac_map = cv2.imread('/Users/mayaralthebati/Desktop/realtime_analysis/tactical map.jpeg')
    if tac_map is None:
        raise FileNotFoundError("Tactical map image not found.")
    tac_width = tac_map.shape[1]  # Note: OpenCV uses (height, width)
    tac_height = tac_map.shape[0]

    # Initialize video writer if saving output (done once)
    if save_output and not hasattr(detect, 'output'):
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) + tac_width
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))  # Adjust height as needed
        detect.output = cv2.VideoWriter(
            f'./outputs/{output_file_name if output_file_name else generate_file_name()}.mp4',
            cv2.VideoWriter_fourcc(*'mp4v'), 30.0, (width, height)
        )

    keypoints_map_pos, classes_names_dic, labels_dic = get_labels_dics()

    state['frame_nbr'] += 1
    tac_map_copy = tac_map.copy()

    if state['nbr_frames_no_ball'] > nbr_frames_no_ball_thresh:
        state['ball_track_history']['src'] = []
        state['ball_track_history']['dst'] = []

    # Object Detection & Coordinate Transformation
    results_players = model_players(frame, conf=p_conf)
    results_keypoints = model_keypoints(frame, conf=k_conf)

    # Extract detections information
    bboxes_p = results_players[0].boxes.xyxy.cpu().numpy()
    bboxes_p_c = results_players[0].boxes.xywh.cpu().numpy()
    labels_p = list(results_players[0].boxes.cls.cpu().numpy())
    confs_p = list(results_players[0].boxes.conf.cpu().numpy())

    bboxes_k = results_keypoints[0].boxes.xyxy.cpu().numpy()
    bboxes_k_c = results_keypoints[0].boxes.xywh.cpu().numpy()
    labels_k = list(results_keypoints[0].boxes.cls.cpu().numpy())

    detected_labels = [classes_names_dic[i] for i in labels_k]
    detected_labels_src_pts = np.array([list(np.round(bboxes_k_c[i][:2]).astype(int)) for i in range(bboxes_k_c.shape[0])])
    detected_labels_dst_pts = np.array([keypoints_map_pos[i] for i in detected_labels])

    # Calculate Homography transformation matrix
    if len(detected_labels) > 3:
        update_homography = False
        if state['frame_nbr'] > 1:
            common_labels = set(state['detected_labels_prev']) & set(detected_labels)
            if len(common_labels) > 3:
                common_label_idx_prev = [state['detected_labels_prev'].index(i) for i in common_labels]
                common_label_idx_curr = [detected_labels.index(i) for i in common_labels]
                coor_common_label_prev = state['detected_labels_src_pts_prev'][common_label_idx_prev]
                coor_common_label_curr = detected_labels_src_pts[common_label_idx_curr]
                coor_error = mean_squared_error(coor_common_label_prev, coor_common_label_curr)
                update_homography = coor_error > k_d_tol
            else:
                update_homography = True
        else:
            update_homography = True

        if update_homography:
            homog, _ = cv2.findHomography(detected_labels_src_pts, detected_labels_dst_pts)
            state['homog'] = homog

    if state['homog'] is not None:
        state['detected_labels_prev'] = detected_labels.copy()
        state['detected_labels_src_pts_prev'] = detected_labels_src_pts.copy()

        bboxes_p_c_0 = bboxes_p_c[[i == 0 for i in labels_p], :]
        bboxes_p_c_2 = bboxes_p_c[[i == 2 for i in labels_p], :]

        detected_ppos_src_pts = bboxes_p_c_0[:, :2] + np.array([[0] * bboxes_p_c_0.shape[0], bboxes_p_c_0[:, 3] / 2]).T
        detected_ball_src_pos = bboxes_p_c_2[0, :2] if bboxes_p_c_2.shape[0] > 0 else None
        
        if detected_ball_src_pos is None:
            state['nbr_frames_no_ball'] += 1
        else:
            state['nbr_frames_no_ball'] = 0

        pred_dst_pts = []
        for pt in detected_ppos_src_pts:
            pt_homog = np.append(pt, 1)
            dest_point = state['homog'] @ pt_homog
            dest_point = dest_point / dest_point[2]
            pred_dst_pts.append(dest_point[:2])
        pred_dst_pts = np.array(pred_dst_pts)

        if detected_ball_src_pos is not None:
            pt = np.append(detected_ball_src_pos, 1)
            dest_point = state['homog'] @ pt
            dest_point = dest_point / dest_point[2]
            detected_ball_dst_pos = dest_point[:2]

            if show_b:
                if state['ball_track_history']['src']:
                    if np.linalg.norm(detected_ball_src_pos - state['ball_track_history']['src'][-1]) < ball_track_dist_thresh:
                        state['ball_track_history']['src'].append((int(detected_ball_src_pos[0]), int(detected_ball_src_pos[1])))
                        state['ball_track_history']['dst'].append((int(detected_ball_dst_pos[0]), int(detected_ball_dst_pos[1])))
                    else:
                        state['ball_track_history']['src'] = [(int(detected_ball_src_pos[0]), int(detected_ball_src_pos[1]))]
                        state['ball_track_history']['dst'] = [(int(detected_ball_dst_pos[0]), int(detected_ball_dst_pos[1]))]
                else:
                    state['ball_track_history']['src'].append((int(detected_ball_src_pos[0]), int(detected_ball_src_pos[1])))
                    state['ball_track_history']['dst'].append((int(detected_ball_dst_pos[0]), int(detected_ball_dst_pos[1])))

                if len(state['ball_track_history']['src']) > max_track_length:
                    state['ball_track_history']['src'].pop(0)
                    state['ball_track_history']['dst'].pop(0)

    # Players Team Prediction
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    obj_palette_list = []
    palette_interval = (0, num_pal_colors)

    for i, j in enumerate(labels_p):
        if int(j) == 0:
            bbox = bboxes_p[i, :]
            obj_img = frame_rgb[int(bbox[1]):int(bbox[3]), int(bbox[0]):int(bbox[2])]
            obj_img_w, obj_img_h = obj_img.shape[1], obj_img.shape[0]
            center_filter_x1 = max((obj_img_w // 2) - (obj_img_w // 5), 1)
            center_filter_x2 = (obj_img_w // 2) + (obj_img_w // 5)
            center_filter_y1 = max((obj_img_h // 3) - (obj_img_h // 5), 1)
            center_filter_y2 = (obj_img_h // 3) + (obj_img_h // 5)
            center_filter = obj_img[center_filter_y1:center_filter_y2, center_filter_x1:center_filter_x2]
            obj_pil_img = Image.fromarray(np.uint8(center_filter))
            reduced = obj_pil_img.convert("P", palette=Image.Palette.WEB)
            palette = reduced.getpalette()
            palette = [palette[3 * n:3 * n + 3] for n in range(256)]
            color_count = [(n, palette[m]) for n, m in reduced.getcolors()]
            RGB_df = pd.DataFrame(color_count, columns=['cnt', 'RGB']).sort_values(by='cnt', ascending=False).iloc[
                     palette_interval[0]:palette_interval[1], :]
            obj_palette_list.append(list(RGB_df.RGB))

    players_distance_features = []
    for palette in obj_palette_list:
        palette_distance = []
        palette_lab = [skimage.color.rgb2lab([i / 255 for i in color]) for color in palette]
        for color in palette_lab:
            distance_list = [skimage.color.deltaE_cie76(color, c) for c in color_list_lab]
            palette_distance.append(distance_list)
        players_distance_features.append(palette_distance)

    players_teams_list = []
    for distance_feats in players_distance_features:
        vote_list = [dist_list.index(min(dist_list)) // nbr_team_colors for dist_list in distance_feats]
        players_teams_list.append(max(vote_list, key=vote_list.count))

    # Updated Frame & Tactical Map With Annotations
    ball_color_bgr = (0, 0, 255)
    j = 0
    palette_box_size = 10
    annotated_frame = frame.copy()
    
    # Clear team positions for this frame
    team1_positions = []
    team2_positions = []

    for i in range(bboxes_p.shape[0]):
        conf = confs_p[i]
        if labels_p[i] == 0:
            if show_pal and j < len(obj_palette_list):
                palette = obj_palette_list[j]
                for k, c in enumerate(palette):
                    c_bgr = c[::-1]
                    annotated_frame = cv2.rectangle(
                        annotated_frame,
                        (int(bboxes_p[i, 2]) + 3, int(bboxes_p[i, 1]) + k * palette_box_size),
                        (int(bboxes_p[i, 2]) + palette_box_size, int(bboxes_p[i, 1]) + (palette_box_size) * (k + 1)),
                        c_bgr, -1
                    )

            team_name = list(colors_dic.keys())[players_teams_list[j]]
            color_rgb = colors_dic[team_name][0]
            color_bgr = color_rgb[::-1]
            if show_p:
                annotated_frame = cv2.rectangle(
                    annotated_frame, (int(bboxes_p[i, 0]), int(bboxes_p[i, 1])),
                    (int(bboxes_p[i, 2]), int(bboxes_p[i, 3])), color_bgr, 1
                )
                annotated_frame = cv2.putText(
                    annotated_frame, f"{team_name} {conf:.2f}",
                    (int(bboxes_p[i, 0]), int(bboxes_p[i, 1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color_bgr, 2
                )

            if state['homog'] is not None and j < len(pred_dst_pts):
                # Store player position for heatmap
                player_pos = (int(pred_dst_pts[j][0]), int(pred_dst_pts[j][1]))
                if players_teams_list[j] == 0:  # Team 1
                    team1_positions.append(player_pos)
                else:  # Team 2
                    team2_positions.append(player_pos)
                
                tac_map_copy = cv2.circle(
                    tac_map_copy, player_pos, 5, color_bgr, -1
                )
                tac_map_copy = cv2.circle(
                    tac_map_copy, player_pos, 5, (0, 0, 0), 1
                )
            j += 1
        else:
            annotated_frame = cv2.rectangle(
                annotated_frame, (int(bboxes_p[i, 0]), int(bboxes_p[i, 1])),
                (int(bboxes_p[i, 2]), int(bboxes_p[i, 3])), (255, 255, 255), 1
            )
            annotated_frame = cv2.putText(
                annotated_frame, f"{labels_dic[labels_p[i]]} {conf:.2f}",
                (int(bboxes_p[i, 0]), int(bboxes_p[i, 1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2
            )

            if detected_ball_src_pos is not None and state['homog'] is not None:
                tac_map_copy = cv2.circle(
                    tac_map_copy, (int(detected_ball_dst_pos[0]), int(detected_ball_dst_pos[1])), 5, ball_color_bgr, 3
                )

    # Update the state with current team positions
    state['team1_positions'].extend(team1_positions)
    state['team2_positions'].extend(team2_positions)

    if show_k:
        for i in range(bboxes_k.shape[0]):
            annotated_frame = cv2.rectangle(
                annotated_frame, (int(bboxes_k[i, 0]), int(bboxes_k[i, 1])),
                (int(bboxes_k[i, 2]), int(bboxes_k[i, 3])), (0, 0, 0), 1
            )

    if show_b and state['ball_track_history']['dst']:
        points = np.hstack(state['ball_track_history']['dst']).astype(np.int32).reshape((-1, 1, 2))
        tac_map_copy = cv2.polylines(tac_map_copy, [points], isClosed=False, color=(0, 0, 100), thickness=2)

    # Combine annotated frame and tactical map
    border_color = [255, 255, 255]
    annotated_frame = cv2.copyMakeBorder(annotated_frame, 40, 10, 10, 10, cv2.BORDER_CONSTANT, value=border_color)
    tac_map_copy = cv2.copyMakeBorder(tac_map_copy, 70, 50, 10, 10, cv2.BORDER_CONSTANT, value=border_color)
    tac_map_copy = cv2.resize(tac_map_copy, (tac_width, annotated_frame.shape[0]))
    final_img = cv2.hconcat([annotated_frame, tac_map_copy])

    # Add annotations
    cv2.putText(final_img, "Tactical Map", (annotated_frame.shape[1] + 10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 0), 2)
    new_frame_time = time.time()
    fps = 1 / (new_frame_time - state['prev_frame_time']) if state['prev_frame_time'] else 0
    state['prev_frame_time'] = new_frame_time
    cv2.putText(final_img, f"FPS: {int(fps)}", (20, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 0), 2)

    # Save to video if enabled
    if save_output and hasattr(detect, 'output'):
        detect.output.write(final_img)

    return final_img

# Cleanup function to release resources (call this when done)
def cleanup():
    if hasattr(detect, 'output'):
        detect.output.release()
        del detect.output
    if hasattr(detect, 'state'):
        del detect.state