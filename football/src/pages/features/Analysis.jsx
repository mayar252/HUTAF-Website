import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
// import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { Radar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Analysis.css";
import videoFile from "../../assets/analysis.mp4";
import matchfile from "../../assets/match.mp4";
// You may need to import these images, replace with actual paths
import chelseaLogo from "../../assets/chlogo.png";
import cityLogo from "../../assets/mancitylogo.png";

import chelseamap from "../../assets/anlaysis-1.jpeg";
import citymap from "../../assets/analysis-2.jpeg";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const Analysis = () => {
  // Use a sample football match video if local video is not available
  const [mainVideoUrl] = useState(matchfile);
  const [secondaryVideoUrl] = useState(videoFile);
  const [isPlaying, setIsPlaying] = useState(true); // Start playing automatically
  const [matchTime, setMatchTime] = useState("45:00"); // Initial match time
  const [matchDate] = useState("May 28, 2023"); // Match date
  const [matchStadium] = useState("Etihad Stadium"); // Stadium
  const [matchCompetition] = useState("Premier League"); // Competition

  const [teamStats, setTeamStats] = useState({
    teamA: {
      name: "Manchester City",
      possession: 65,
      shots: 12,
      shotsOnTarget: 8,
      passes: 423,
      passAccuracy: 89,
      saves: 3,
      goals: 0,
    },
    teamB: {
      name: "Chelsea",
      possession: 35,
      shots: 8,
      shotsOnTarget: 4,
      passes: 289,
      passAccuracy: 76,
      saves: 6,
      goals: 0,
    },
  });

  const [aiAnalysis, setAiAnalysis] = useState({
    predictedWinner: {
      team: "Manchester City",
      probability: 68.5,
      factors: [
        "Higher possession control (65%)",
        "Better shooting accuracy (66% vs 50%)",
        "Superior pass completion rate (89% vs 76%)",
      ],
    },
    performance: {
      teamA: {
        rating: 8.2,
        strongPoints: [
          "Ball control",
          "Attacking efficiency",
          "Team coordination",
        ],
        areasToImprove: ["Defensive pressure", "Set piece conversion"],
      },
      teamB: {
        rating: 7.4,
        strongPoints: [
          "Counter-attacks",
          "Physical presence",
          "Defensive blocks",
        ],
        areasToImprove: ["Possession retention", "Final third passing"],
      },
    },
    keyPlayers: {
      teamA: [
        {
          name: "Kevin De Bruyne",
          rating: 8.9,
          position: "CM",
          highlight: "Key passes: 24",
        },
        {
          name: "Erling Haaland",
          rating: 8.5,
          position: "ST",
          highlight: "Shot accuracy: 85%",
        },
      ],
      teamB: [
        {
          name: "Reece James",
          rating: 8.3,
          position: "RB",
          highlight: "Tackles won: 8",
        },
        {
          name: "Nicolas Jackson",
          rating: 8.0,
          position: "ST",
          highlight: "Saves: 6",
        },
      ],
    },
    matchPredictions: {
      finalScore: { teamA: 0, teamB: 0 },
      possessionTrend: "Increasing for Manchester City",
      nextGoalProbability: { teamA: 65, teamB: 35 },
    },
  });

  // Function to generate random number within a range
  const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to update stats with small random variations
  const updateStats = () => {
    setTeamStats((prevStats) => {
      const newStats = { ...prevStats };

      // Update Team A stats
      newStats.teamA = {
        ...newStats.teamA,
        possession: Math.min(
          100,
          Math.max(0, newStats.teamA.possession + getRandomInRange(-2, 2))
        ),
        shots: newStats.teamA.shots + getRandomInRange(0, 1),
        shotsOnTarget: newStats.teamA.shotsOnTarget + getRandomInRange(0, 1),
        passes: newStats.teamA.passes + getRandomInRange(5, 15),
        passAccuracy: Math.min(
          100,
          Math.max(0, newStats.teamA.passAccuracy + getRandomInRange(-1, 1))
        ),
        saves: newStats.teamA.saves + getRandomInRange(0, 1),
      };

      // Update Team B stats
      newStats.teamB = {
        ...newStats.teamB,
        possession: Math.min(
          100,
          Math.max(0, newStats.teamB.possession + getRandomInRange(-2, 2))
        ),
        shots: newStats.teamB.shots + getRandomInRange(0, 1),
        shotsOnTarget: newStats.teamB.shotsOnTarget + getRandomInRange(0, 1),
        passes: newStats.teamB.passes + getRandomInRange(5, 15),
        passAccuracy: Math.min(
          100,
          Math.max(0, newStats.teamB.passAccuracy + getRandomInRange(-1, 1))
        ),
        saves: newStats.teamB.saves + getRandomInRange(0, 1),
      };

      return newStats;
    });

    // Update match time
    setMatchTime((prevTime) => {
      const [minutes, seconds] = prevTime.split(":").map(Number);
      let newSeconds = seconds + 15; // Add 15 seconds
      let newMinutes = minutes;

      if (newSeconds >= 60) {
        newSeconds = newSeconds - 60;
        newMinutes = newMinutes + 1;
      }

      // Don't exceed 90 minutes
      if (newMinutes > 90) {
        return "90:00";
      }

      return `${newMinutes}:${newSeconds.toString().padStart(2, "0")}`;
    });

    // Update AI analysis with new predictions
    setAiAnalysis((prevAnalysis) => {
      const newAnalysis = { ...prevAnalysis };

      // Update win probability based on current stats
      const teamAAdvantage = teamStats.teamA.goals - teamStats.teamB.goals;
      const possessionAdvantage =
        teamStats.teamA.possession - teamStats.teamB.possession;
      const shotsAdvantage = teamStats.teamA.shots - teamStats.teamB.shots;

      const newProbability = Math.min(
        95,
        Math.max(
          5,
          50 +
            teamAAdvantage * 10 +
            possessionAdvantage * 0.2 +
            shotsAdvantage * 0.5
        )
      );

      newAnalysis.predictedWinner = {
        ...newAnalysis.predictedWinner,
        probability: newProbability,
        team: newProbability > 50 ? teamStats.teamA.name : teamStats.teamB.name,
      };

      // Update performance ratings
      newAnalysis.performance.teamA.rating = Math.min(
        10,
        Math.max(
          0,
          newAnalysis.performance.teamA.rating + getRandomInRange(-0.1, 0.1)
        )
      );
      newAnalysis.performance.teamB.rating = Math.min(
        10,
        Math.max(
          0,
          newAnalysis.performance.teamB.rating + getRandomInRange(-0.1, 0.1)
        )
      );

      // Update next goal probability
      newAnalysis.matchPredictions.nextGoalProbability = {
        teamA: Math.min(
          95,
          Math.max(
            5,
            newAnalysis.matchPredictions.nextGoalProbability.teamA +
              getRandomInRange(-2, 2)
          )
        ),
        teamB: Math.min(
          95,
          Math.max(
            5,
            newAnalysis.matchPredictions.nextGoalProbability.teamB +
              getRandomInRange(-2, 2)
          )
        ),
      };

      return newAnalysis;
    });
  };

  // Effect to update stats when video is playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(updateStats, 5000); // Update every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle video play/pause
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const StatItem = ({ label, valueA, valueB, unit = "" }) => (
    <div className="stat-comparison-row">
      <div className="team-a-value">
        {valueA}
        {unit}
      </div>
      <div className="stat-label">{label}</div>
      <div className="team-b-value">
        {valueB}
        {unit}
      </div>
    </div>
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="analysis-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Add decorative animated shapes */}
      <motion.div
        className="shape-1"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 15 }}
      ></motion.div>
      <motion.div
        className="shape-2"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 20, delay: 5 }}
      ></motion.div>
      <motion.div
        className="shape-3"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 18, delay: 2 }}
      ></motion.div>

      {/* Match Header */}
      <motion.div
        className="match-header"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="match-teams">
          <div className="match-team team-left">
            <img
              src={cityLogo}
              alt="Manchester City Logo"
              className="match-team-logo"
            />
            <h2>{teamStats.teamA.name}</h2>
          </div>

          <div className="match-info">
            <div className="match-score">
              <span>{teamStats.teamA.goals}</span>
              <span className="match-time-indicator">{matchTime}</span>
              <span>{teamStats.teamB.goals}</span>
            </div>
            <div className="match-details">
              <div className="match-date">{matchDate}</div>
              <div className="match-stadium">{matchStadium}</div>
              <div className="match-competition">{matchCompetition}</div>
            </div>
          </div>

          <div className="match-team team-right">
            <h2>{teamStats.teamB.name}</h2>
            <img
              src={chelseaLogo}
              alt="Chelsea Logo"
              className="match-team-logo"
            />
          </div>
        </div>
      </motion.div>

      <motion.div className="analysis-layout" variants={containerVariants}>
        <motion.div className="left-section" variants={itemVariants}>
          <motion.div
            className="team-stats-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="team-header">
              <h2>{teamStats.teamA.name}</h2>
            </div>
            <div className="team-stats-grid">
              <div className="big-stat">
                <span className="value">{teamStats.teamA.goals}</span>
                <span className="label">Goals</span>
              </div>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="label">Possession</span>
                  <span className="value">{teamStats.teamA.possession}%</span>
                </div>
                <div className="stat-item">
                  <span className="label">Shots (On Target)</span>
                  <span className="value">
                    {teamStats.teamA.shots} ({teamStats.teamA.shotsOnTarget})
                  </span>
                </div>
                <div className="stat-item">
                  <span className="label">Pass Accuracy</span>
                  <span className="value">{teamStats.teamA.passAccuracy}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team logo image */}
          <motion.div
            className="team-logo-container flex-1"
            variants={cardVariants}
            whileHover="hover"
          >
            <img
              src={citymap}
              alt="Manchester City Logo"
              className="team-logo_two"
            />
          </motion.div>
        </motion.div>

        <motion.div className="center-section" variants={itemVariants}>
          <motion.div
            className="main-video"
            variants={cardVariants}
            whileHover="hover"
          >
            <ReactPlayer
              url={mainVideoUrl}
              width="100%"
              height="100%"
              playing={true}
              loop={true}
              muted={true}
              onPlay={handlePlay}
              onPause={handlePause}
              playsinline
            />
          </motion.div>
          <motion.div
            className="secondary-video"
            variants={cardVariants}
            whileHover="hover"
          >
            <ReactPlayer
              url={secondaryVideoUrl}
              width="100%"
              height="100%"
              playing={true}
              loop={true}
              muted={true}
              playsinline
            />
          </motion.div>
        </motion.div>

        <motion.div className="right-section" variants={itemVariants}>
          <motion.div
            className="team-stats-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="team-header">
              <h2>{teamStats.teamB.name}</h2>
            </div>
            <div className="team-stats-grid">
              <div className="big-stat">
                <span className="value">{teamStats.teamB.goals}</span>
                <span className="label">Goals</span>
              </div>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="label">Possession</span>
                  <span className="value">{teamStats.teamB.possession}%</span>
                </div>
                <div className="stat-item">
                  <span className="label">Shots (On Target)</span>
                  <span className="value">
                    {teamStats.teamB.shots} ({teamStats.teamB.shotsOnTarget})
                  </span>
                </div>
                <div className="stat-item">
                  <span className="label">Pass Accuracy</span>
                  <span className="value">{teamStats.teamB.passAccuracy}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team logo image */}
          <motion.div
            className="team-logo-container flex-1"
            variants={cardVariants}
            whileHover="hover"
          >
            <img
              src={chelseamap}
              alt="Chelsea Logo"
              className="team-logo_two"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="ai-analysis-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          AI Match Analysis
        </motion.h2>
        <motion.div className="ai-analysis-grid" variants={containerVariants}>
          <motion.div
            className="ai-card prediction-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3>Match Prediction</h3>
            <div className="prediction-content">
              <div className="prediction-header">
                <span className="predicted-winner">
                  {aiAnalysis.predictedWinner.team}
                </span>
                <span className="win-probability">
                  {aiAnalysis.predictedWinner.probability}% probability
                </span>
              </div>
              <div className="prediction-factors">
                <h4>Key Factors:</h4>
                <ul>
                  {aiAnalysis.predictedWinner.factors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ai-card performance-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3>Team Performance Analysis</h3>
            <div className="team-performance">
              <div className="team-a-performance">
                <h4>{teamStats.teamA.name}</h4>
                <div className="rating">
                  Rating: {aiAnalysis.performance.teamA.rating}/10
                </div>
                <div className="performance-details">
                  <h5>Strong Points:</h5>
                  <ul>
                    {aiAnalysis.performance.teamA.strongPoints.map(
                      (point, index) => (
                        <li key={index}>{point}</li>
                      )
                    )}
                  </ul>
                  <h5>Areas to Improve:</h5>
                  <ul>
                    {aiAnalysis.performance.teamA.areasToImprove.map(
                      (area, index) => (
                        <li key={index}>{area}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="team-b-performance">
                <h4>{teamStats.teamB.name}</h4>
                <div className="rating">
                  Rating: {aiAnalysis.performance.teamB.rating}/10
                </div>
                <div className="performance-details">
                  <h5>Strong Points:</h5>
                  <ul>
                    {aiAnalysis.performance.teamB.strongPoints.map(
                      (point, index) => (
                        <li key={index}>{point}</li>
                      )
                    )}
                  </ul>
                  <h5>Areas to Improve:</h5>
                  <ul>
                    {aiAnalysis.performance.teamB.areasToImprove.map(
                      (area, index) => (
                        <li key={index}>{area}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ai-card key-players-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3>Key Players</h3>
            <div className="key-players-grid">
              <div className="team-key-players">
                <h4>{teamStats.teamA.name}</h4>
                {aiAnalysis.keyPlayers.teamA.map((player, index) => (
                  <div key={index} className="player-card">
                    <div className="player-name">{player.name}</div>
                    <div className="player-position">{player.position}</div>
                    <div className="player-rating">Rating: {player.rating}</div>
                    <div className="player-highlight">{player.highlight}</div>
                  </div>
                ))}
              </div>
              <div className="team-key-players">
                <h4>{teamStats.teamB.name}</h4>
                {aiAnalysis.keyPlayers.teamB.map((player, index) => (
                  <div key={index} className="player-card">
                    <div className="player-name">{player.name}</div>
                    <div className="player-position">{player.position}</div>
                    <div className="player-rating">Rating: {player.rating}</div>
                    <div className="player-highlight">{player.highlight}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ai-card predictions-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3>Match Predictions</h3>
            <div className="predictions-content">
              <div className="predicted-score">
                <h4>Predicted Final Score</h4>
                <div className="score-display">
                  <span>
                    {teamStats.teamA.name}:{" "}
                    {aiAnalysis.matchPredictions.finalScore.teamA}
                  </span>
                  <span>
                    {teamStats.teamB.name}:{" "}
                    {aiAnalysis.matchPredictions.finalScore.teamB}
                  </span>
                </div>
              </div>
              <div className="other-predictions">
                <div className="prediction-item">
                  <span className="label">Possession Trend:</span>
                  <span className="value">
                    {aiAnalysis.matchPredictions.possessionTrend}
                  </span>
                </div>
                <div className="prediction-item">
                  <span className="label">Next Goal Probability:</span>
                  <div className="probability-bars">
                    <div className="team-a-prob">
                      {teamStats.teamA.name}:{" "}
                      {aiAnalysis.matchPredictions.nextGoalProbability.teamA}%
                    </div>
                    <div className="team-b-prob">
                      {teamStats.teamB.name}:{" "}
                      {aiAnalysis.matchPredictions.nextGoalProbability.teamB}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Analysis;
