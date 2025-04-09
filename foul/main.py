import cv2
from ultralytics import YOLO
import csv
import time
from datetime import datetime
import os
import numpy as np
from collections import defaultdict

# Load the YOLO model
model = YOLO('./train_20_v2/weights/best.pt')

# Open video file or capture device (0 for webcam)
video_path = r'/Users/mayaralthebati/Desktop/vid.mp4'  # Change to 0 for webcam
cap = cv2.VideoCapture(video_path)

# Get video properties
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
fps = int(15)

# Define codec and create VideoWriter object
output_path = "output_video2.mp4"
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_path, fourcc, fps, (frame_width, frame_height))

# Create CSV file for logging detection data
csv_filename = f"detection_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
csv_headers = [
    'timestamp', 'frame_number', 'object_id', 'class_name', 'confidence',
    'x_center', 'y_center', 'width', 'height', 'area',
    'processing_time_ms', 'frame_width', 'frame_height',
    'track_id', 'velocity_x', 'velocity_y', 'acceleration_x', 'acceleration_y',
    'distance_to_nearest_player', 'interaction_angle', 'foul_event_id',
    'foul_duration', 'foul_intensity', 'player_speed', 'player_direction'
]

# Initialize tracking variables
prev_tracks = {}
foul_events = defaultdict(list)
current_foul_event = None
foul_event_counter = 0

# Initialize statistics
stats = {
    'total_fouls': 0,
    'foul_durations': [],
    'player_interactions': defaultdict(int),
    'foul_locations': [],
    'player_speeds': defaultdict(list),
    'foul_intensities': []
}

with open(csv_filename, 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=csv_headers)
    writer.writeheader()

    frame_count = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        start_time = time.time()
        current_timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        
        # Run YOLO detection with tracking - FIXED LINE
        results = model.track(frame, conf=0.6, imgsz=640, persist=True, tracker="bytetrack.yaml")
        
        processing_time = (time.time() - start_time) * 1000

        # Process detection results and write to CSV
        current_tracks = {}
        
        for result in results:
            boxes = result.boxes
            for i, box in enumerate(boxes):
                # Extract basic detection data
                x, y, w, h = box.xywh[0].tolist()
                conf = float(box.conf[0])
                class_id = int(box.cls[0])
                class_name = result.names[class_id]
                track_id = int(box.id[0]) if box.id is not None else -1
                
                # Calculate advanced metrics
                velocity_x = velocity_y = acceleration_x = acceleration_y = 0
                distance_to_nearest = float('inf')
                interaction_angle = 0
                player_speed = 0
                player_direction = 0
                
                if track_id in prev_tracks:
                    prev_x, prev_y = prev_tracks[track_id]
                    velocity_x = (x - prev_x) / (1/fps)
                    velocity_y = (y - prev_y) / (1/fps)
                    player_speed = np.sqrt(velocity_x**2 + velocity_y**2)
                    player_direction = np.arctan2(velocity_y, velocity_x)
                
                # Calculate distances and interactions with other players
                for other_box in boxes:
                    if other_box.id is not None and other_box.id[0] != track_id:
                        other_x, other_y = other_box.xywh[0][:2].tolist()
                        distance = np.sqrt((x - other_x)**2 + (y - other_y)**2)
                        if distance < distance_to_nearest:
                            distance_to_nearest = distance
                            interaction_angle = np.arctan2(other_y - y, other_x - x)
                
                # Update foul event tracking
                foul_event_id = -1
                foul_duration = 0
                foul_intensity = 0
                
                if class_name == 'foul':
                    if current_foul_event is None:
                        current_foul_event = foul_event_counter
                        foul_event_counter += 1
                    foul_event_id = current_foul_event
                    foul_duration = len(foul_events[current_foul_event]) + 1
                    foul_intensity = conf * (1 + player_speed/10)  # Scale intensity by confidence and speed
                    foul_events[current_foul_event].append({
                        'frame': frame_count,
                        'track_id': track_id,
                        'intensity': foul_intensity
                    })
                elif class_name in ['victim', 'fouling_player']:
                    current_foul_event = None
                
                # Update statistics
                if class_name == 'foul':
                    stats['total_fouls'] += 1
                    stats['foul_durations'].append(foul_duration)
                    stats['foul_intensities'].append(foul_intensity)
                    stats['foul_locations'].append((x/frame_width, y/frame_height))
                
                if track_id != -1:
                    stats['player_speeds'][track_id].append(player_speed)
                
                # Store current position for next frame
                current_tracks[track_id] = (x, y)
                
                # Write detection data to CSV
                writer.writerow({
                    'timestamp': current_timestamp,
                    'frame_number': frame_count,
                    'object_id': i,
                    'class_name': class_name,
                    'confidence': conf,
                    'x_center': x,
                    'y_center': y,
                    'width': w,
                    'height': h,
                    'area': w * h,
                    'processing_time_ms': processing_time,
                    'frame_width': frame_width,
                    'frame_height': frame_height,
                    'track_id': track_id,
                    'velocity_x': velocity_x,
                    'velocity_y': velocity_y,
                    'acceleration_x': acceleration_x,
                    'acceleration_y': acceleration_y,
                    'distance_to_nearest_player': distance_to_nearest,
                    'interaction_angle': interaction_angle,
                    'foul_event_id': foul_event_id,
                    'foul_duration': foul_duration,
                    'foul_intensity': foul_intensity,
                    'player_speed': player_speed,
                    'player_direction': player_direction
                })

        prev_tracks = current_tracks

        # Write the frame to output video
        out.write(results[0].plot())

        # Show the output
        cv2.imshow('YOLO Realtime Detection', results[0].plot())

        frame_count += 1

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# Release resources
cap.release()
out.release()
cv2.destroyAllWindows()

# Save statistics to a separate file
stats_filename = f"foul_statistics_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
#with open(stats_filename, 'w') as f:
   # f.write("Foul Detection Statistics\n")
   # f.write("=======================\n\n")
    #f.write(f"Total Fouls Detected: {stats['total_fouls']}\n")
   # f.write(f"Average Foul Duration: {np.mean(stats['foul_durations']):.2f} frames\n")
    #f.write(f"Average Foul Intensity: {np.mean(stats['foul_intensities']):.2f}\n")
    
    # Calculate player speed statistics
   # all_speeds = [speed for speeds in stats['player_speeds'].values() for speed in speeds]
    #f.write(f"Average Player Speed: {np.mean(all_speeds):.2f} pixels/frame\n")
   # f.write(f"Max Player Speed: {np.max(all_speeds):.2f} pixels/frame\n")
    
    # Calculate foul location heatmap data
    #foul_locations = np.array(stats['foul_locations'])
    #f.write("\nFoul Location Statistics:\n")
    #f.write(f"Most Common X Location: {np.percentile(foul_locations[:, 0], 50):.2f}\n")
    #f.write(f"Most Common Y Location: {np.percentile(foul_locations[:, 1], 50):.2f}\n")

print(f"Output video saved as {output_path}")
print(f"Detection data saved to {csv_filename}")
print(f"Statistics saved to {stats_filename}")