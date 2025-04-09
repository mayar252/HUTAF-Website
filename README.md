# 🏟️ Hutaf – Real-Time Football Match Analysis Using AI & Computer Vision

**Hutaf** is an AI-powered web platform designed to revolutionize the way football matches are analyzed and experienced. By combining real-time computer vision, predictive models, and user interaction features, Hutaf offers in-depth match analysis, real-time foul prediction, and fan participation in guessing match outcomes.

---

## 📌 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [How It Works](#how-it-works)
5. [YOLO Models & AI Techniques](#yolo-models--ai-techniques)
6. [Frontend (React)](#frontend-react)
7. [Pages and Components](#pages-and-components)
8. [Installation & Setup](#installation--setup)
9. [Folder Structure](#folder-structure)
10. [Future Enhancements](#future-enhancements)
11. [Contributing](#contributing)
12. [License](#license)

---

## 🔍 Overview

**Hutaf** provides intelligent insights into football matches using AI models, specifically YOLO for object detection and tracking. It runs in **real-time**, giving users and analysts the ability to:

- **Analyze ongoing matches**
- **Predict fouls using AI-based models**
- **Engage fans to guess the match winner**

This tool is aimed at sports analysts, broadcasters, referees, and fans who want a smart assistant during live football games.

---

## 🚀 Features

### 📊 1. **Real-Time Match Analysis (Analysis Page)**
- Uses YOLO models to detect players, ball, referee, and field zones.
- Tracks player movements, ball possession, passing, and shots.
- Displays insights visually through overlays on the video feed.

### ⚖️ 2. **Virtual Referee (Foul Prediction Page)**
- Detects possible fouls using custom-trained models.
- Flags events like tripping, sliding, handball, or aggressive behavior.
- Sends alerts during the match with a confidence score.

### 🤔 3. **Guess the Winner (User Interaction Page)**
- Lets users guess the match winner during or before the game.
- Aggregates votes and displays live results.
- Can be used to measure fan sentiment in real-time.

---

## 🛠️ Tech Stack

| Layer        | Tools / Frameworks |
|--------------|--------------------|
| Frontend     | React.js, Tailwind CSS |
| Backend      | Python (FastAPI or Flask) |
| AI Models    | YOLOv5, YOLOv8 (Ultralytics), Custom CNN Models |
| Deployment   | (Optional: Docker, Vercel for frontend, Render or Heroku for backend) |
| Others       | OpenCV, Numpy, Pandas, WebSocket (for real-time updates) |

---

## 🔄 How It Works

### 1. **Input**
- Live stream or uploaded football match video is fed into the backend.
- Video frames are processed in real-time.

### 2. **Detection**
- YOLO detects players, ball, referee, and field lines.
- Bounding boxes are generated and tracked over time.

### 3. **Analysis**
- Frame-wise analysis is done to detect ball possession, zones, formations.
- Time-based events like passes and shots are identified.

### 4. **Foul Prediction**
- A separate pipeline analyzes body posture, collision intensity, and movement vectors to detect fouls.
- Model is trained on a custom dataset of labeled fouls.

### 5. **Frontend Display**
- React app fetches data from backend and renders:
  - Bounding boxes
  - Foul alerts
  - Live stats
  - User guesses and results

---

## 🧠 YOLO Models & AI Techniques

- **YOLOv5 / YOLOv8**: Used for detecting:
  - Players (with jersey color classification)
  - Ball (small object detection tuning)
  - Referee
- **Custom CNN/RNN**: Foul detection based on player interactions and frame sequences.
- **Object Tracking**: Using SORT/DeepSORT for consistent ID assignment across frames.

---

## 🖼️ Frontend (React)

- Built using **React.js**
- Real-time updates via WebSocket or API polling
- Components:
  - VideoFrameOverlay
  - LiveStatsPanel
  - FoulAlerts
  - UserGuessForm

---

## 📄 Pages and Components

### `/analysis`
- Live video with overlay
- Player tracking
- Ball position
- Heatmap generation (future enhancement)

### `/virtual-referee`
- Live foul detection
- Alert history
- Accuracy and confidence score

### `/guess-winner`
- Form to guess winner
- Live results graph
- Fan sentiment stats

---

## 🧪 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/hutaf.git
cd hutaf

# Frontend Setup
cd frontend
npm install
npm start

# Backend Setup
cd backend
pip install -r requirements.txt
python app.py  # or uvicorn main:app --reload for FastAPI

# Make sure to have models in ./models
```

> ⚠️ You need GPU support for real-time predictions. Use Colab or a local machine with CUDA.

---

## 🗂️ Folder Structure

```
hutaf/
│
├── frontend/            # React app
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
│
├── backend/             # Python server with AI models
│   ├── models/          # YOLO weights and AI models
│   ├── utils/
│   └── app.py
│
├── dataset/             # Optional dataset for training
└── README.md
```

---

## 🔮 Future Enhancements

- ⚙️ Automated model tuning based on game type (league, friendly, etc.)
- 📈 Generate post-match reports (PDF/CSV)
- 📡 Integration with football APIs (e.g., Live scoreboards)
- 🧠 Improve foul accuracy using pose estimation (e.g., MediaPipe or OpenPose)
- 🎙️ Audio alerts for fouls or goals

---

## 🤝 Contributing

1. Fork the project
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit your changes
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a Pull Request



## 🚨 Important Notice:

I was unable to upload the weight files for the models due to their large size. Instead, I have uploaded them in full to a Drive link for downloading and running the website.

- Drive Link : https://drive.google.com/drive/folders/1kEjPjb_lbVDCMP_HNFLuLmFaJCqvX4_o?usp=share_link
---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
