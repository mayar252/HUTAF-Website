import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CallToAction from "../../components/CallToAction";
import "./GhostSeats.css";

import mancity from "../../assets/mancitylogo.png";
import liverpool from "../../assets/liverpool.jpeg";

const GhostSeats = () => {
  // Match data - normally would come from an API
  const [matchData] = useState({
    homeTeam: {
      name: "Manchester City",
      score: 0,
      logo: mancity,
      stats: {
        possession: 58,
        shots: 16,
        shotsOnTarget: 7,
        corners: 8,
        fouls: 9,
        yellowCards: 1,
        redCards: 0,
        passes: 528,
        passAccuracy: 91,
      },
    },
    awayTeam: {
      name: "Liverpool",
      score: 0,
      logo: liverpool,
      stats: {
        possession: 42,
        shots: 12,
        shotsOnTarget: 5,
        corners: 4,
        fouls: 11,
        yellowCards: 2,
        redCards: 0,
        passes: 389,
        passAccuracy: 85,
      },
    },
    matchInfo: {
      stadium: "Etihad Stadium",
      referee: "Michael Oliver",
      attendance: "53,487",
      date: "November 25, 2023",
      league: "Premier League",
      matchweek: "Week 13",
    },
  });

  // Messages and predictions state - using timestamps to sort
  const [messages, setMessages] = useState([
    {
      id: 1,
      team: "homeTeam",
      username: "BlueCity88",
      message: "City dominated the midfield today. Great performance!",
      timestamp: new Date("2023-11-25T14:30:00Z").getTime(),
      prediction: { home: 2, away: 0 },
    },
    {
      id: 2,
      team: "awayTeam",
      username: "LiverpoolFan",
      message: "We deserved at least a draw. The ref missed a clear penalty.",
      timestamp: new Date("2023-11-25T14:45:00Z").getTime(),
      prediction: { home: 1, away: 2 },
    },
    {
      id: 3,
      team: "homeTeam",
      username: "FootballExpert",
      message: "Haaland makes the difference again. What a player!",
      timestamp: new Date("2023-11-25T15:15:00Z").getTime(),
      prediction: { home: 3, away: 1 },
    },
    {
      id: 4,
      team: "awayTeam",
      username: "AnfieldRed",
      message:
        "Close match but our defense needs to improve. City exploited the gaps too easily.",
      timestamp: new Date("2023-11-25T15:30:00Z").getTime(),
      prediction: { home: 2, away: 1 },
    },
    {
      id: 5,
      team: "homeTeam",
      username: "CitySupporter",
      message: "Great win today lads! Top of the league!",
      timestamp: new Date("2023-11-25T15:40:00Z").getTime(),
      prediction: { home: 2, away: 0 },
    },
  ]);

  // User information
  const [username, setUsername] = useState(
    localStorage.getItem("ghostSeatsUsername") ||
      "Guest" + Math.floor(Math.random() * 1000)
  );
  const [selectedTeam, setSelectedTeam] = useState("");
  const [message, setMessage] = useState("");
  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [userPrediction, setUserPrediction] = useState(null);

  // Check if user has already made a prediction when component mounts
  useEffect(() => {
    const predictionData = localStorage.getItem("ghostSeatsPrediction");
    if (predictionData) {
      try {
        const savedPrediction = JSON.parse(predictionData);
        setHasPredicted(true);
        setUserPrediction(savedPrediction);
        setHomeGoals(savedPrediction.home);
        setAwayGoals(savedPrediction.away);
      } catch (e) {
        console.error("Error parsing saved prediction:", e);
      }
    }
  }, []);

  // Save username to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("ghostSeatsUsername", username);
  }, [username]);

  // Calculate metrics for both teams
  const homeTeamMessages = messages.filter((msg) => msg.team === "homeTeam");
  const awayTeamMessages = messages.filter((msg) => msg.team === "awayTeam");
  const totalMessages = messages.length;

  // Home team metrics
  const homeMessageCount = homeTeamMessages.length;
  const homePercentage = totalMessages
    ? Math.round((homeMessageCount / totalMessages) * 100)
    : 0;
  const homeLastSupporter = homeTeamMessages.length
    ? homeTeamMessages.sort((a, b) => b.timestamp - a.timestamp)[0]
    : null;
  const homeFirstSupporter = homeTeamMessages.length
    ? homeTeamMessages.sort((a, b) => a.timestamp - b.timestamp)[0]
    : null;
  const homeMessageTrend =
    homeTeamMessages.length >= 2
      ? (
          (homeTeamMessages.slice(-3).length / Math.min(3, totalMessages)) *
          100
        ).toFixed(0) + "%"
      : "N/A";

  // Away team metrics
  const awayMessageCount = awayTeamMessages.length;
  const awayPercentage = totalMessages
    ? Math.round((awayMessageCount / totalMessages) * 100)
    : 0;
  const awayLastSupporter = awayTeamMessages.length
    ? awayTeamMessages.sort((a, b) => b.timestamp - a.timestamp)[0]
    : null;
  const awayFirstSupporter = awayTeamMessages.length
    ? awayTeamMessages.sort((a, b) => a.timestamp - b.timestamp)[0]
    : null;
  const awayMessageTrend =
    awayTeamMessages.length >= 2
      ? (
          (awayTeamMessages.slice(-3).length / Math.min(3, totalMessages)) *
          100
        ).toFixed(0) + "%"
      : "N/A";

  // Calculate average score predictions
  const calculateAverageScore = (team) => {
    const teamMessages = messages.filter((msg) => msg.team === team);
    if (teamMessages.length === 0) return { home: 0, away: 0 };

    const totalHome = teamMessages.reduce(
      (sum, msg) => sum + (msg.prediction?.home || 0),
      0
    );
    const totalAway = teamMessages.reduce(
      (sum, msg) => sum + (msg.prediction?.away || 0),
      0
    );

    return {
      home: parseFloat((totalHome / teamMessages.length).toFixed(1)),
      away: parseFloat((totalAway / teamMessages.length).toFixed(1)),
    };
  };

  const homeTeamAvgPrediction = calculateAverageScore("homeTeam");
  const awayTeamAvgPrediction = calculateAverageScore("awayTeam");

  // Conversation duration metrics
  const firstMessageTime = messages.length
    ? Math.min(...messages.map((msg) => msg.timestamp))
    : null;
  const lastMessageTime = messages.length
    ? Math.max(...messages.map((msg) => msg.timestamp))
    : null;
  const conversationDuration =
    firstMessageTime && lastMessageTime
      ? Math.round((lastMessageTime - firstMessageTime) / (1000 * 60))
      : 0;

  // Handle submitting a message
  const handleSubmitMessage = () => {
    if (!message.trim()) return;
    if (!selectedTeam) {
      alert("Please select a team to support");
      return;
    }

    // Create the message object
    const newMessage = {
      id: Date.now(),
      team: selectedTeam,
      username,
      message: message.trim(),
      timestamp: Date.now(),
    };

    // If user hasn't predicted yet, add prediction to the message
    if (!hasPredicted) {
      // Save the prediction
      const prediction = {
        home: homeGoals,
        away: awayGoals,
        team: selectedTeam,
        timestamp: Date.now(),
      };
      newMessage.prediction = prediction;

      // Save prediction in localStorage
      localStorage.setItem("ghostSeatsPrediction", JSON.stringify(prediction));

      // Update state to show user has predicted
      setHasPredicted(true);
      setUserPrediction(prediction);
    }

    // Add the new message to the chat
    setMessages([...messages, newMessage]);
    setMessage(""); // Clear message input
  };

  // Change username
  const handleUsernameChange = (newName) => {
    if (newName.trim()) {
      setUsername(newName.trim());
    }
    setShowUsernameModal(false);
  };

  // Format timestamp to readable time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format timestamp to readable date and time
  const formatDateTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="ghost-seats-container">
      {/* Animated shapes for background */}
      <div className="ghost-shape shape-1"></div>
      <div className="ghost-shape shape-2"></div>
      <div className="ghost-shape shape-3"></div>

      <motion.div
        className="ghost-seats-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header section */}
        <motion.div className="ghost-header" variants={itemVariants}>
          <h1>Guess The Winner Experience</h1>
          <p>
            Cast your vote and share your opinion on the match. Join the fan
            conversation!
          </p>
        </motion.div>

        {/* Match information */}
        <motion.div className="match-info-banner" variants={itemVariants}>
          <div className="match-info-details">
            <div className="match-stadium">{matchData.matchInfo.stadium}</div>
            <div className="match-date">{matchData.matchInfo.date}</div>
            <div className="match-league">
              {matchData.matchInfo.league} • {matchData.matchInfo.matchweek}
            </div>
          </div>
        </motion.div>

        {/* Scoreboard */}
        <motion.div className="scoreboard" variants={itemVariants}>
          <div className="team-container home-team">
            <img
              src={matchData.homeTeam.logo}
              alt={matchData.homeTeam.name}
              className="team-logo"
            />
            <h2 className="team-name">{matchData.homeTeam.name}</h2>
          </div>

          <div className="score-container">
            <div className="score">
              {matchData.homeTeam.score} - {matchData.awayTeam.score}
            </div>
            <div className="match-status">Live - 78'</div>
          </div>

          <div className="team-container away-team">
            <img
              src={matchData.awayTeam.logo}
              alt={matchData.awayTeam.name}
              className="team-logo"
            />
            <h2 className="team-name">{matchData.awayTeam.name}</h2>
          </div>
        </motion.div>

        {/* Main content with 3 columns */}
        <motion.div
          className="ghost-seats-main mb-20"
          variants={containerVariants}
        >
          {/* Left column - Home team stats */}
          <motion.div className="left-column" variants={itemVariants}>
            <div className="team-stats-container home-stats">
              <h3 className="stats-header">
                <img
                  src={matchData.homeTeam.logo}
                  alt={matchData.homeTeam.name}
                  className="stats-team-logo"
                />
                {matchData.homeTeam.name} Stats
              </h3>

              <div className="stats-list">
                {Object.entries(matchData.homeTeam.stats).map(
                  ([key, value], index) => (
                    <div key={index} className="stat-item">
                      <span className="stat-label">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="stat-value">
                        {typeof value === "number" &&
                        (key === "possession" || key === "passAccuracy")
                          ? `${value}%`
                          : value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Home team vote metrics */}
            <div className="vote-metrics-container home-team-metrics">
              <h3 className="metrics-header">
                <img
                  src={matchData.homeTeam.logo}
                  alt={matchData.homeTeam.name}
                  className="stats-team-logo"
                />
                Fan Prediction Metrics
              </h3>

              <div className="metrics-badge">{homePercentage}% Support</div>

              <div className="metrics-list">
                <div className="metric-item">
                  <span className="metric-label">Total Messages</span>
                  <span className="metric-value">{homeMessageCount}</span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">Recent Trend</span>
                  <span className="metric-value">{homeMessageTrend}</span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">Avg. Score Prediction</span>
                  <span className="metric-value">
                    {homeTeamAvgPrediction.home}-{homeTeamAvgPrediction.away}
                  </span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">First Supporter</span>
                  <span className="metric-value">
                    {homeFirstSupporter ? homeFirstSupporter.username : "N/A"}
                  </span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">Latest Supporter</span>
                  <span className="metric-value">
                    {homeLastSupporter ? homeLastSupporter.username : "N/A"}
                  </span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">Latest Message Time</span>
                  <span className="metric-value time-value">
                    {homeLastSupporter
                      ? formatDateTime(homeLastSupporter.timestamp)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle column - Fan votes section */}
          <motion.div className="chat-container" variants={itemVariants}>
            <div className="vote-header">
              <div className="vote-title">Fan Discussion</div>
              <div className="vote-stats">
                <div className="fan-percentage-bar">
                  <div
                    className="home-fan-percentage"
                    style={{ width: `${homePercentage}%` }}
                  >
                    {homePercentage}%
                  </div>
                  <div
                    className="away-fan-percentage"
                    style={{ width: `${awayPercentage}%` }}
                  >
                    {awayPercentage}%
                  </div>
                </div>
                <div className="fan-count">
                  <span>
                    {homeMessageCount} messages for {matchData.homeTeam.name}
                  </span>
                  <span>
                    {awayMessageCount} messages for {matchData.awayTeam.name}
                  </span>
                </div>
                <div className="vote-duration">
                  Chat active for {conversationDuration} minutes •{" "}
                  {totalMessages} total messages
                </div>
              </div>
            </div>

            <div className="votes-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`vote-message ${
                    msg.team === "homeTeam"
                      ? "home-team-message"
                      : "away-team-message"
                  }`}
                >
                  <div className="vote-bubble">
                    <div className="message-header">
                      <span className="message-username">{msg.username}</span>
                      <span className="message-time">
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    </div>
                    <p className="message-text">{msg.message}</p>
                    {msg.prediction && (
                      <div className="prediction-tag">
                        Prediction: {msg.prediction.home} -{" "}
                        {msg.prediction.away}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="vote-input-area">
              <div className="vote-user-info">
                <span>
                  Chatting as <b>{username}</b>
                </span>
                <button
                  className="change-username-btn"
                  onClick={() => setShowUsernameModal(true)}
                >
                  Change
                </button>
              </div>

              <div className="vote-selection">
                <div className="vote-prompt">I'm supporting:</div>
                <div className="team-selector">
                  <div
                    className={`team-option home-team-option ${
                      selectedTeam === "homeTeam" ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTeam("homeTeam")}
                  >
                    <img
                      src={matchData.homeTeam.logo}
                      alt={matchData.homeTeam.name}
                      className="selector-team-logo"
                    />
                    <span className="selector-team-name">
                      {matchData.homeTeam.name}
                    </span>
                  </div>
                  <div
                    className={`team-option away-team-option ${
                      selectedTeam === "awayTeam" ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTeam("awayTeam")}
                  >
                    <img
                      src={matchData.awayTeam.logo}
                      alt={matchData.awayTeam.name}
                      className="selector-team-logo"
                    />
                    <span className="selector-team-name">
                      {matchData.awayTeam.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="score-prediction">
                <div className="prediction-prompt">
                  {hasPredicted
                    ? "Your final score prediction:"
                    : "Predict final score:"}
                </div>
                <div className="score-input-container">
                  <div className="score-input-team">
                    <span className="score-team-name">
                      {matchData.homeTeam.name}
                    </span>
                    <div className="score-input-field">
                      <button
                        className="score-btn"
                        onClick={() => setHomeGoals(Math.max(0, homeGoals - 1))}
                        disabled={homeGoals <= 0 || hasPredicted}
                      >
                        -
                      </button>
                      <span className="score-value">{homeGoals}</span>
                      <button
                        className="score-btn"
                        onClick={() => setHomeGoals(homeGoals + 1)}
                        disabled={hasPredicted}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="score-separator">vs</span>
                  <div className="score-input-team">
                    <span className="score-team-name">
                      {matchData.awayTeam.name}
                    </span>
                    <div className="score-input-field">
                      <button
                        className="score-btn"
                        onClick={() => setAwayGoals(Math.max(0, awayGoals - 1))}
                        disabled={awayGoals <= 0 || hasPredicted}
                      >
                        -
                      </button>
                      <span className="score-value">{awayGoals}</span>
                      <button
                        className="score-btn"
                        onClick={() => setAwayGoals(awayGoals + 1)}
                        disabled={hasPredicted}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {hasPredicted && (
                  <div className="prediction-locked-message">
                    You predicted {matchData.homeTeam.name}{" "}
                    {userPrediction.home} - {userPrediction.away}{" "}
                    {matchData.awayTeam.name}
                    while supporting{" "}
                    {userPrediction.team === "homeTeam"
                      ? matchData.homeTeam.name
                      : matchData.awayTeam.name}
                    .
                    <br />
                    You can still send messages!
                  </div>
                )}
              </div>

              <textarea
                className="vote-input"
                placeholder="Share your thoughts on the match..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button className="submit-vote-btn" onClick={handleSubmitMessage}>
                {hasPredicted ? "Send Message" : "Submit Prediction & Message"}
              </button>
            </div>
          </motion.div>

          {/* Right column - Away team stats */}
          <motion.div className="right-column" variants={itemVariants}>
            <div className="team-stats-container away-stats">
              <h3 className="stats-header">
                <img
                  src={matchData.awayTeam.logo}
                  alt={matchData.awayTeam.name}
                  className="stats-team-logo"
                />
                {matchData.awayTeam.name} Stats
              </h3>

              <div className="stats-list">
                {Object.entries(matchData.awayTeam.stats).map(
                  ([key, value], index) => (
                    <div key={index} className="stat-item">
                      <span className="stat-label">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="stat-value">
                        {typeof value === "number" &&
                        (key === "possession" || key === "passAccuracy")
                          ? `${value}%`
                          : value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Away team vote metrics */}
            <div className="vote-metrics-container away-team-metrics">
              <h3 className="metrics-header">
                <img
                  src={matchData.awayTeam.logo}
                  alt={matchData.awayTeam.name}
                  className="stats-team-logo"
                />
                Fan Prediction Metrics
              </h3>

              <div className="metrics-badge">{awayPercentage}% Support</div>

              <div className="metrics-list">
                <div className="metric-item">
                  <span className="metric-label">Total Messages</span>
                  <span className="metric-value">{awayMessageCount}</span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">Recent Trend</span>
                  <span className="metric-value">{awayMessageTrend}</span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">Avg. Score Prediction</span>
                  <span className="metric-value">
                    {awayTeamAvgPrediction.home}-{awayTeamAvgPrediction.away}
                  </span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">First Supporter</span>
                  <span className="metric-value">
                    {awayFirstSupporter ? awayFirstSupporter.username : "N/A"}
                  </span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">Latest Supporter</span>
                  <span className="metric-value">
                    {awayLastSupporter ? awayLastSupporter.username : "N/A"}
                  </span>
                </div>

                <div className="metric-item">
                  <span className="metric-label">Latest Message Time</span>
                  <span className="metric-value time-value">
                    {awayLastSupporter
                      ? formatDateTime(awayLastSupporter.timestamp)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Username change modal */}
      {showUsernameModal && (
        <div className="username-modal-overlay">
          <div className="username-modal">
            <h3>Change Your Display Name</h3>
            <input
              type="text"
              placeholder="Enter new username"
              defaultValue={username}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUsernameChange(e.target.value);
                }
              }}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowUsernameModal(false)}>
                Cancel
              </button>
              <button
                onClick={(e) =>
                  handleUsernameChange(
                    e.target.closest(".username-modal").querySelector("input")
                      .value
                  )
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call to action component */}
      <CallToAction />
    </div>
  );
};

export default GhostSeats;
