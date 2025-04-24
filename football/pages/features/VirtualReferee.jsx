import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./VirtualReferee.css";
import refVideo from "../../assets/output_video.mp4"; // Reuse video from Analysis page
// Import placeholder images (replace with your actual images)
import refereeImage1 from "../../assets/foul-1.jpeg";
import refereeImage2 from "../../assets/foul-2.jpeg";

const VirtualReferee = () => {
  // Stats state - using const [stats] to avoid the unused setStats warning
  const [stats] = useState({
    foulDuration: 3.9,
    foulIntensity: 12.82,
    playerSpeed: 157.39,
    maxPlayerSpeed: 1730.29,
    foulLocationX: 0.55,
    foulLocationY: 0.47,
  });

  // Foul data state
  const [foulData, setFoulData] = useState([]);
  const [currentFoul, setCurrentFoul] = useState(null);

  // Additional statistics
  const [foulTypes] = useState([
    { type: "Slide Tackle", count: 12, severity: "High" },
    { type: "Jersey Pull", count: 8, severity: "Medium" },
    { type: "Pushing", count: 15, severity: "Low" },
    { type: "Tripping", count: 6, severity: "Medium" },
    { type: "High Boot", count: 4, severity: "High" },
    { type: "Obstruction", count: 11, severity: "Low" },
  ]);

  const [playerFouls] = useState([
    {
      player: "Kevin De Bruyne",
      team: "Manchester City",
      fouls: 2,
      cards: "Yellow (1)",
    },
    { player: "Rodri", team: "Manchester City", fouls: 3, cards: "None" },
    { player: "Reece James", team: "Chelsea", fouls: 4, cards: "Yellow (1)" },
    { player: "Nicolas Jackson", team: "Chelsea", fouls: 1, cards: "None" },
    {
      player: "Bernardo Silva",
      team: "Manchester City",
      fouls: 2,
      cards: "None",
    },
    { player: "Cole Palmer", team: "Chelsea", fouls: 3, cards: "None" },
  ]);

  const [matchPeriods] = useState([
    { period: "First Half", fouls: 18, cards: 2 },
    { period: "Second Half", fouls: 14, cards: 1 },
    { period: "Extra Time", fouls: 0, cards: 0 },
  ]);

  // Generate random data
  const generateRandomData = () => {
    const generateRandom = (min, max) => Math.random() * (max - min) + min;

    const newData = [];
    for (let i = 0; i < 20; i++) {
      newData.push({
        id: i + 1,
        velocity_x: generateRandom(-100, 100).toFixed(2),
        velocity_y: generateRandom(-100, 100).toFixed(2),
        acceleration_x: generateRandom(-20, 20).toFixed(2),
        acceleration_y: generateRandom(-20, 20).toFixed(2),
        distance_to_nearest_player: generateRandom(0.5, 10).toFixed(2),
        interaction_angle: generateRandom(0, 360).toFixed(2),
        foul_event_id: Math.floor(generateRandom(1000, 9999)),
        foul_duration: generateRandom(1, 10).toFixed(2),
        foul_intensity: generateRandom(5, 20).toFixed(2),
        player_speed: generateRandom(50, 300).toFixed(2),
        player_direction: generateRandom(0, 360).toFixed(2),
      });
    }

    setFoulData(newData);
    setCurrentFoul(newData[0]);
  };

  // Generate data on component mount
  useEffect(() => {
    generateRandomData();

    // Simulate data updates every 5 seconds
    const interval = setInterval(() => {
      setCurrentFoul(foulData[Math.floor(Math.random() * foulData.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  // Fallback image URLs in case the imports don't work
  const fallbackImage1 =
    "https://via.placeholder.com/600x400/111827/ffffff?text=Referee+Technology";
  const fallbackImage2 =
    "https://via.placeholder.com/600x400/111827/ffffff?text=VAR+System";

  return (
    <motion.div
      className="virtual-referee-container"
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

      {/* Header */}
      <motion.div className="referee-header" variants={itemVariants}>
        <h1>Virtual Referee System</h1>
        <p>AI-powered foul detection and analysis in real-time</p>
      </motion.div>

      {/* Featured images section */}
      <motion.div className="featured-images" variants={containerVariants}>
        <motion.div className="image-container" variants={itemVariants}>
          <img
            src={refereeImage1 || fallbackImage1}
            alt="Referee Technology"
            onError={(e) => {
              e.target.src = fallbackImage1;
            }}
          />
          <div className="image-overlay">
            <h3>Advanced Foul Detection</h3>
            <p>AI-powered technology detecting fouls in real-time</p>
          </div>
        </motion.div>
        <motion.div className="image-container" variants={itemVariants}>
          <img
            src={refereeImage2 || fallbackImage2}
            alt="VAR System"
            onError={(e) => {
              e.target.src = fallbackImage2;
            }}
          />
          <div className="image-overlay">
            <h3>Decision Support System</h3>
            <p>Helping referees make accurate decisions</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div className="referee-content" variants={containerVariants}>
        {/* Stats panel */}
        <motion.div className="stats-panel" variants={itemVariants}>
          <div className="stats-card">
            <h2>Foul Detection Statistics</h2>
            <div className="stats-list">
              <div className="stat-item">
                <span className="label">Average Foul Duration:</span>
                <span className="value">{stats.foulDuration} frames</span>
              </div>
              <div className="stat-item">
                <span className="label">Average Foul Intensity:</span>
                <span className="value">{stats.foulIntensity}</span>
              </div>
              <div className="stat-item">
                <span className="label">Average Player Speed:</span>
                <span className="value">{stats.playerSpeed} pixels/frame</span>
              </div>
              <div className="stat-item">
                <span className="label">Max Player Speed:</span>
                <span className="value">
                  {stats.maxPlayerSpeed} pixels/frame
                </span>
              </div>
            </div>

            <h3>Foul Location Statistics:</h3>
            <div className="stats-list">
              <div className="stat-item">
                <span className="label">Most Common X Location:</span>
                <span className="value">{stats.foulLocationX}</span>
              </div>
              <div className="stat-item">
                <span className="label">Most Common Y Location:</span>
                <span className="value">{stats.foulLocationY}</span>
              </div>
            </div>

            <div className="pitch-heatmap">
              <div className="pitch-overlay">
                <div
                  className="foul-indicator"
                  style={{
                    left: `${stats.foulLocationX * 100}%`,
                    top: `${stats.foulLocationY * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video panel */}
        <motion.div className="video-panel" variants={itemVariants}>
          <div className="video-container">
            <ReactPlayer
              url={refVideo}
              width="100%"
              height="100%"
              playing={true}
              loop={true}
              muted={true}
              playsinline
            />
            <div className="overlay-stats">
              <div className="overlay-label">AI FOUL DETECTION ACTIVE</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Detailed foul data */}
      <motion.div className="foul-data-section" variants={containerVariants}>
        <motion.h2 className="section-title" variants={itemVariants}>
          Real-time Foul Detection Data
        </motion.h2>

        <motion.div className="foul-data-table" variants={itemVariants}>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {currentFoul && (
                <>
                  <tr>
                    <td>Velocity X</td>
                    <td>{currentFoul.velocity_x}</td>
                    <td>Velocity Y</td>
                    <td>{currentFoul.velocity_y}</td>
                  </tr>
                  <tr>
                    <td>Acceleration X</td>
                    <td>{currentFoul.acceleration_x}</td>
                    <td>Acceleration Y</td>
                    <td>{currentFoul.acceleration_y}</td>
                  </tr>
                  <tr>
                    <td>Distance to Player</td>
                    <td>{currentFoul.distance_to_nearest_player} m</td>
                    <td>Interaction Angle</td>
                    <td>{currentFoul.interaction_angle}°</td>
                  </tr>
                  <tr>
                    <td>Foul Event ID</td>
                    <td>{currentFoul.foul_event_id}</td>
                    <td>Foul Duration</td>
                    <td>{currentFoul.foul_duration} frames</td>
                  </tr>
                  <tr>
                    <td>Foul Intensity</td>
                    <td>{currentFoul.foul_intensity}</td>
                    <td>Player Speed</td>
                    <td>{currentFoul.player_speed} px/frame</td>
                  </tr>
                  <tr>
                    <td>Player Direction</td>
                    <td>{currentFoul.player_direction}°</td>
                    <td>Confidence Score</td>
                    <td>{(Math.random() * 10 + 90).toFixed(2)}%</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Additional statistics display */}
        <motion.div
          className="additional-stats-section"
          variants={containerVariants}
        >
          <div className="stats-grid">
            {/* Foul Types Panel */}
            <motion.div className="stats-panel-mini" variants={itemVariants}>
              <div className="stats-card-mini">
                <h3>Foul Types</h3>
                <div className="stats-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Count</th>
                        <th>Severity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foulTypes.map((foul, index) => (
                        <tr key={index}>
                          <td>{foul.type}</td>
                          <td>{foul.count}</td>
                          <td>
                            <span
                              className={`severity-${foul.severity.toLowerCase()}`}
                            >
                              {foul.severity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Player Fouls Panel */}
            <motion.div className="stats-panel-mini" variants={itemVariants}>
              <div className="stats-card-mini">
                <h3>Player Fouls</h3>
                <div className="stats-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Team</th>
                        <th>Fouls</th>
                        <th>Cards</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerFouls.map((player, index) => (
                        <tr key={index}>
                          <td>{player.player}</td>
                          <td>{player.team}</td>
                          <td>{player.fouls}</td>
                          <td>{player.cards}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Match Periods Panel */}
            <motion.div className="stats-panel-mini" variants={itemVariants}>
              <div className="stats-card-mini">
                <h3>Match Periods</h3>
                <div className="stats-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Fouls</th>
                        <th>Cards</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchPeriods.map((period, index) => (
                        <tr key={index}>
                          <td>{period.period}</td>
                          <td>{period.fouls}</td>
                          <td>{period.cards}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VirtualReferee;
