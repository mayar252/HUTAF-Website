import tempfile
import numpy as np
import cv2
from ultralytics import YOLO
from detection2 import create_colors_info, detect, create_heatmap  # Custom module
import os

def main():
    # --- Demo setup ---
    demo_selected = "Demo 2"
    demo_vid_paths = {
        "Demo 1": './demo_vid_1.mp4',
        "Demo 2": './demo_vid_2.mp4'
    }
    demo_team_info = {
        "Demo 1": {
            "team1_name": "France",
            "team2_name": "Switzerland",
            "team1_p_color": '#1E2530',
            "team1_gk_color": '#F5FD15',
            "team2_p_color": '#FBFCFA',
            "team2_gk_color": '#B1FCC4',
        },
        "Demo 2": {
            "team1_name": "Chelsea",
            "team2_name": "Manchester City",
            "team1_p_color": '#29478A',
            "team1_gk_color": '#DC6258',
            "team2_p_color": '#90C8FF',
            "team2_gk_color": '#BCC703',
        }
    }

    demo_vid_path = demo_vid_paths[demo_selected]
    selected_team_info = demo_team_info[demo_selected]

    # Load YOLO models
    model_players = YOLO("/Users/mayaralthebati/Desktop/realtime_analysis/models/Yolo8L Players/weights/best.pt")
    model_keypoints = YOLO("/Users/mayaralthebati/Desktop/realtime_analysis/models/Yolo8M Field Keypoints/weights/best.pt")

    # Team settings
    team1_name = selected_team_info["team1_name"]
    team2_name = selected_team_info["team2_name"]
    team1_p_color = selected_team_info["team1_p_color"]
    team1_gk_color = selected_team_info["team1_gk_color"]
    team2_p_color = selected_team_info["team2_p_color"]
    team2_gk_color = selected_team_info["team2_gk_color"]

    # Create color info
    colors_dic, color_list_lab = create_colors_info(
        team1_name, team1_p_color, team1_gk_color,
        team2_name, team2_p_color, team2_gk_color
    )

    # Detection and tracking hyperparameters
    detection_hyper_params = {
        0: 0.6,  # player_model_conf_thresh
        1: 0.7,  # keypoints_model_conf_thresh
        2: 7     # keypoints_displacement_mean_tol
    }

    ball_track_hyperparams = {
        0: 30,   # nbr_frames_no_ball_thresh
        1: 100,  # ball_track_dist_thresh
        2: 35    # max_track_length
    }

    # Plotting options
    plot_hyperparams = {
        0: False,  # show_keypoints
        1: True,   # show_palettes
        2: True,   # show_ball_tracks
        3: True    # show_players
    }

    num_pal_colors = 3
    output_file_name = "output_video.mp4"
    save_output = True

    # --- Video I/O setup ---
    cap = cv2.VideoCapture(demo_vid_path)
    if not cap.isOpened():
        print("Error: Could not open input video.")
        return

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = 15


    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # More reliable for .mp4
    out = cv2.VideoWriter(output_file_name, fourcc, fps, (frame_width, frame_height))
    if not out.isOpened():
        print("Error: Could not initialize video writer.")
        cap.release()
        return

    print("Starting detection... Press 'q' to quit.")

    # --- Frame processing loop ---
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        annotated_frame = detect(
            cap, frame, output_file_name, save_output,
            model_players, model_keypoints,
            detection_hyper_params, ball_track_hyperparams,
            plot_hyperparams, num_pal_colors,
            colors_dic, color_list_lab
        )

        if annotated_frame is None:
            annotated_frame = frame

        # Resize to ensure compatibility with writer
        annotated_frame = cv2.resize(annotated_frame, (frame_width, frame_height))

        # Write and display
        if save_output:
            out.write(annotated_frame)
        cv2.imshow("Football Tactical Analysis", annotated_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # --- Cleanup ---
    print("Detection completed!")
    cap.release()
    out.release()
    cv2.destroyAllWindows()
    
    # --- Create and save heatmaps ---
    print("Generating heatmaps...")
    
    # Read the tactical map for heatmap creation
    tac_map = cv2.imread('../tactical map.jpg')
    if tac_map is not None:
        # Create output directory if it doesn't exist
        os.makedirs('./outputs', exist_ok=True)
        
        # Get player positions from the detect function's state
        if hasattr(detect, 'state'):
            team1_positions = detect.state.get('team1_positions', [])
            team2_positions = detect.state.get('team2_positions', [])
            
            # Create heatmap for team 1
            if team1_positions:
                team1_heatmap_path = f'./outputs/{team1_name}_heatmap.jpg'
                create_heatmap(tac_map, team1_positions, team1_name, team1_heatmap_path)
                print(f"Team 1 heatmap saved to {team1_heatmap_path}")
            
            # Create heatmap for team 2
            if team2_positions:
                team2_heatmap_path = f'./outputs/{team2_name}_heatmap.jpg'
                create_heatmap(tac_map, team2_positions, team2_name, team2_heatmap_path)
                print(f"Team 2 heatmap saved to {team2_heatmap_path}")
        else:
            print("No player position data available for heatmap generation.")
    else:
        print("Tactical map not found. Cannot generate heatmaps.")

if __name__ == '__main__':
    try:
        main()
    except SystemExit:
        pass
