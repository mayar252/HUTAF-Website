import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "../../components/FixFramerMotion";
import "./VirtualFan.css";
import {
  getVirtualFanChat,
  sendMessageToVirtualFan,
} from "../../config/virtualFanGemini";

import aiChatImageOne from "../../assets/ai-chat-bot-1.png";
import aiChatImageTwo from "../../assets/coach_header.jpeg";
import aiChatImageThree from "../../assets/ai-chat-bot-3.png";
import aiChatImageFour from "../../assets/ai-chat-bot-4.png";

import fourThreeThree from "../../assets/four-three-three.jpeg";
import fourFourTwo from "../../assets/four-four-two.jpeg";
import threeFiveTwo from "../../assets/three-five-two.jpeg";
import fourTwoThreeOne from "../../assets/four-two-three-one.jpeg";

const VirtualFan = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeSection, setActiveSection] = useState("analysis");
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [tacticalAnalysis, setTacticalAnalysis] = useState(null);
  const [analysisStep, setAnalysisStep] = useState(1);
  const [analysisData, setAnalysisData] = useState({
    opponent: "",
    venue: "",
    teamForm: "",
    strugglingArea: "",
    unavailablePlayers: [],
    matchImportance: "Regular match"
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const chatInstanceRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});

  // Example formations data
  const formations = [
    {
      id: 1,
      name: "4-3-3",
      description: "Balanced formation with strong midfield control",
    },
    {
      id: 2,
      name: "4-4-2",
      description: "Classic formation with two strikers",
    },
    {
      id: 3,
      name: "3-5-2",
      description: "Attacking formation with wing-backs",
    },
    {
      id: 4,
      name: "4-2-3-1",
      description: "Modern formation with attacking midfield",
    },
  ];

  // Example tactical analysis data
  const formationAnalysisData = {
    "4-3-3": {
      strengths: ["Midfield control", "Wing play", "High pressing"],
      weaknesses: ["Vulnerable to counter-attacks", "Requires fit wingers"],
      bestAgainst: ["4-4-2", "3-5-2"],
      worstAgainst: ["5-3-2", "4-2-3-1"],
    },
    "4-4-2": {
      strengths: ["Defensive stability", "Direct play", "Two strikers"],
      weaknesses: ["Midfield gaps", "Limited creativity"],
      bestAgainst: ["4-3-3", "3-4-3"],
      worstAgainst: ["4-2-3-1", "3-5-2"],
    },
  };

  // Example questions
  const exampleQuestions = [
    "What's the best formation against a team that plays 4-3-3?",
    "How can I improve my team's possession in a 4-4-2 formation?",
    "What are the weaknesses of a 3-5-2 formation?",
    "Should I switch to a 4-2-3-1 for the next match?",
    "What are the key differences between 4-3-3 and 4-2-3-1?",
  ];

  // Add new AI capabilities data
  const aiCapabilities = [
    {
      id: 1,
      title: "Tactical Analysis",
      description: "Analyzes formations, strategies, and match scenarios",
      features: [
        "Real-time formation recommendations",
        "Opponent analysis and counter-strategies",
        "Player positioning optimization",
        "Match situation analysis",
      ],
      icon: "🧠",
    },
    {
      id: 2,
      title: "Training Optimization",
      description: "Provides personalized training recommendations",
      features: [
        "Custom drill suggestions",
        "Player role development",
        "Team chemistry building",
        "Fitness and recovery planning",
      ],
      icon: "⚽",
    },
    {
      id: 3,
      title: "Match Preparation",
      description: "Helps prepare for upcoming matches",
      features: [
        "Opponent scouting reports",
        "Tactical game plans",
        "Set-piece strategies",
        "In-game adjustments",
      ],
      icon: "📊",
    },
    {
      id: 4,
      title: "Player Development",
      description: "Focuses on individual player growth",
      features: [
        "Position-specific training",
        "Skill development plans",
        "Performance analysis",
        "Career progression guidance",
      ],
      icon: "👤",
    },
  ];

  // Initialize chat instance
  useEffect(() => {
    const initializeChat = async () => {
      try {
        chatInstanceRef.current = await getVirtualFanChat();
        // Add welcoming message
        setTimeout(() => {
          setMessages([
            {
              text: "Hi there! I'm your Virtual Fan AI assistant. Ask me anything about football tactics, player development, or match analysis!",
              isUser: false,
            },
          ]);
        }, 800);
      } catch (error) {
        console.error("Error initializing chat:", error);
        setMessages([
          {
            text: "I'm having trouble connecting to the analysis service. Please try again later.",
            isUser: false,
          },
        ]);
      }
    };

    initializeChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Check if the question is about a specific formation
      const formationMatch = input.match(/(4-3-3|4-4-2|3-5-2|4-2-3-1)/i);
      if (formationMatch) {
        const formation = formationMatch[0];
        // Add formation image to the chat
        setMessages((prev) => [
          ...prev,
          {
            text: `<div class="formation-chat-image">
                    <img src="${
                      formation === "4-3-3"
                        ? fourThreeThree
                        : formation === "4-4-2"
                        ? fourFourTwo
                        : formation === "3-5-2"
                        ? threeFiveTwo
                        : fourTwoThreeOne
                    }" alt="${formation} formation" class="formation-image" />
                    <p>${formation} Formation</p>
                  </div>`,
            isUser: false,
          },
        ]);
      }

      // Get response from Gemini
      const response = await sendMessageToVirtualFan(
        chatInstanceRef.current,
        input
      );

      // Add AI response
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I apologize, but I'm having trouble analyzing that right now. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormationSelect = (formation) => {
    setSelectedFormation(formation);
    setTacticalAnalysis(formationAnalysisData[formation.name]);
  };

  const validateStep = () => {
    const errors = {};
    switch (analysisStep) {
      case 1:
        if (!analysisData.opponent) {
          errors.opponent = "Please select an opponent";
        }
        break;
      case 2:
        if (!analysisData.venue) {
          errors.venue = "Please select a venue";
        }
        break;
      case 3:
        if (!analysisData.teamForm) {
          errors.teamForm = "Please select your team's recent form";
        }
        break;
      case 4:
        if (!analysisData.strugglingArea) {
          errors.strugglingArea = "Please select an area your team is struggling with";
        }
        break;
      case 5:
        // No validation for unavailable players since "I'm not sure" is a valid option
        break;
      case 6:
        // No validation for match importance since it's optional and has a default value
        break;
      default:
        break;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAnalysisSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    if (analysisStep < 6) {
      setAnalysisStep(analysisStep + 1);
    } else {
      setIsAnalyzing(true);
      try {
        // Select a random formation to display
        const formations = ["4-3-3", "4-4-2", "3-5-2", "4-2-3-1"];
        const randomFormation = formations[Math.floor(Math.random() * formations.length)];
        
        const prompt = `Based on the following match details, provide detailed tactical recommendations:
          Opponent: ${analysisData.opponent}
          Venue: ${analysisData.venue}
          Team Form: ${analysisData.teamForm}
          Struggling Area: ${analysisData.strugglingArea}
          Unavailable Players: ${analysisData.unavailablePlayers.length > 0 ? analysisData.unavailablePlayers.join(", ") : "None"}
          Match Importance: ${analysisData.matchImportance}
          
          Please recommend the ${randomFormation} formation and provide:
          1. Key tactical points for using this formation
          2. Player roles and responsibilities
          3. Specific instructions for different phases of play
          4. Potential adjustments based on match flow`;

        const response = await sendMessageToVirtualFan(
          chatInstanceRef.current,
          prompt
        );
        
        setAnalysisResult({
          text: response,
          formation: randomFormation
        });
        setActiveSection("analysis");
      } catch (error) {
        console.error("Error getting analysis:", error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const renderAnalysisForm = () => {
    // Sample opponent teams for dropdown
    const opponentTeams = [
      "Arsenal", 
      "Aston Villa", 
      "Brentford", 
      "Brighton", 
      "Burnley", 
      "Chelsea", 
      "Crystal Palace", 
      "Everton", 
      "Fulham", 
      "Liverpool", 
      "Manchester City", 
      "Manchester United", 
      "Newcastle United", 
      "Nottingham Forest", 
      "Southampton", 
      "Tottenham Hotspur", 
      "West Ham United", 
      "Wolverhampton Wanderers"
    ];
    
    // Sample players for the unavailable players list
    const teamPlayers = [
      "Alexander-Arnold", "Salah", "Van Dijk", "Alisson", 
      "De Bruyne", "Haaland", "Foden", "Ederson",
      "Rashford", "Fernandes", "Casemiro", "Martinez",
      "Son", "Kane", "Kulusevski", "Romero"
    ];
    
    switch (analysisStep) {
      case 1:
        return (
          <div className="analysis-form-step">
            <h3>1. Who is your team playing against?</h3>
            <div className="team-selection">
              {opponentTeams.slice(0, 6).map(team => (
                <button
                  key={team}
                  className={`team-button ${
                    analysisData.opponent === team ? "selected" : ""
                  }`}
                  onClick={() =>
                    setAnalysisData({ ...analysisData, opponent: team })
                  }
                >
                  {team}
                </button>
              ))}
              <button
                className={`team-button ${
                  analysisData.opponent === "Other" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, opponent: "Other" })
                }
              >
                Other
              </button>
            </div>
            {formErrors.opponent && (
              <div className="form-error">{formErrors.opponent}</div>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="analysis-form-step">
            <h3>2. Where will the match be played?</h3>
            <div className="venue-selection">
              <button
                className={`venue-button ${
                  analysisData.venue === "Home" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, venue: "Home" })
                }
              >
                Home
              </button>
              <button
                className={`venue-button ${
                  analysisData.venue === "Away" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, venue: "Away" })
                }
              >
                Away
              </button>
              <button
                className={`venue-button ${
                  analysisData.venue === "Neutral venue" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, venue: "Neutral venue" })
                }
              >
                Neutral venue
              </button>
            </div>
            {formErrors.venue && (
              <div className="form-error">{formErrors.venue}</div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="analysis-form-step">
            <h3>3. What is your team's recent form?</h3>
            <div className="form-selection">
              <button
                className={`form-button ${
                  analysisData.teamForm === "Winning most matches" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, teamForm: "Winning most matches" })
                }
              >
                Winning most matches
              </button>
              <button
                className={`form-button ${
                  analysisData.teamForm === "Mixed results" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, teamForm: "Mixed results" })
                }
              >
                Mixed results
              </button>
              <button
                className={`form-button ${
                  analysisData.teamForm === "Losing most matches" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, teamForm: "Losing most matches" })
                }
              >
                Losing most matches
              </button>
              <button
                className={`form-button ${
                  analysisData.teamForm === "I'm not sure" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, teamForm: "I'm not sure" })
                }
              >
                I'm not sure
              </button>
            </div>
            {formErrors.teamForm && (
              <div className="form-error">{formErrors.teamForm}</div>
            )}
          </div>
        );
      
      case 4:
        return (
          <div className="analysis-form-step">
            <h3>4. Which area do you feel your team is struggling with lately?</h3>
            <div className="struggle-selection">
              <button
                className={`struggle-button ${
                  analysisData.strugglingArea === "Scoring goals" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, strugglingArea: "Scoring goals" })
                }
              >
                Scoring goals
              </button>
              <button
                className={`struggle-button ${
                  analysisData.strugglingArea === "Defending" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, strugglingArea: "Defending" })
                }
              >
                Defending
              </button>
              <button
                className={`struggle-button ${
                  analysisData.strugglingArea === "Midfield control" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, strugglingArea: "Midfield control" })
                }
              >
                Midfield control
              </button>
              <button
                className={`struggle-button ${
                  analysisData.strugglingArea === "Team chemistry" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, strugglingArea: "Team chemistry" })
                }
              >
                Team chemistry
              </button>
              <button
                className={`struggle-button ${
                  analysisData.strugglingArea === "I'm not sure" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, strugglingArea: "I'm not sure" })
                }
              >
                I'm not sure
              </button>
            </div>
            {formErrors.strugglingArea && (
              <div className="form-error">{formErrors.strugglingArea}</div>
            )}
          </div>
        );
      
      case 5:
        return (
          <div className="analysis-form-step">
            <h3>5. Are there any key players unavailable for the next match?</h3>
            <div className="players-selection">
              {teamPlayers.map(player => (
                <button
                  key={player}
                  className={`player-button ${
                    analysisData.unavailablePlayers.includes(player) ? "selected" : ""
                  }`}
                  onClick={() => {
                    const currentPlayers = [...analysisData.unavailablePlayers];
                    if (currentPlayers.includes(player)) {
                      setAnalysisData({
                        ...analysisData,
                        unavailablePlayers: currentPlayers.filter(p => p !== player)
                      });
                    } else {
                      setAnalysisData({
                        ...analysisData,
                        unavailablePlayers: [...currentPlayers, player]
                      });
                    }
                  }}
                >
                  {player}
                </button>
              ))}
              <button
                className={`player-button ${
                  analysisData.unavailablePlayers.length === 0 && analysisData.noMissingPlayers ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({
                    ...analysisData,
                    unavailablePlayers: [],
                    noMissingPlayers: true
                  })
                }
              >
                No key players missing
              </button>
              <button
                className={`player-button ${
                  analysisData.unavailablePlayers.length === 0 && !analysisData.noMissingPlayers ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({
                    ...analysisData,
                    unavailablePlayers: [],
                    noMissingPlayers: false
                  })
                }
              >
                I'm not sure
              </button>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="analysis-form-step">
            <h3>(Optional) How important is this match?</h3>
            <div className="importance-selection">
              <button
                className={`importance-button ${
                  analysisData.matchImportance === "Very important (e.g. final, derby)" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, matchImportance: "Very important (e.g. final, derby)" })
                }
              >
                Very important (e.g. final, derby)
              </button>
              <button
                className={`importance-button ${
                  analysisData.matchImportance === "Regular match" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, matchImportance: "Regular match" })
                }
              >
                Regular match
              </button>
              <button
                className={`importance-button ${
                  analysisData.matchImportance === "Friendly" ? "selected" : ""
                }`}
                onClick={() =>
                  setAnalysisData({ ...analysisData, matchImportance: "Friendly" })
                }
              >
                Friendly
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const TacticalSection = () => {
    return (
      <section className="tactical-hero-section">
        <div className="tactical-content">
          <motion.h1
            className="tactical-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tactical Mastery Is The Art Of Victory
          </motion.h1>
          <motion.p
            className="tactical-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Elevate your team's performance with AI-powered tactical analysis,
            real-time formation adjustments, and intelligent player positioning
          </motion.p>
          <motion.button
            className="tactical-cta-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <span className="btn-arrow">→</span>
          </motion.button>
        </div>

        <div className="tactical-visual-container">
          <motion.div
            className="tactical-field"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="player-markers">
              <motion.div
                className="player-marker"
                animate={{
                  y: [-10, 10, -10],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="tactical-line"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="tactical-image-circle">
              <img
                src={aiChatImageThree}
                alt="Tactical Analysis Board"
                className="tactical-image"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="featured-tools"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="featured-title">Featured Tactical Tools</h2>
          <div className="tools-grid">
            <motion.div
              className="tool-card"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="tool-icon-ring">
                <img
                  src={aiChatImageTwo}
                  alt="Formation Analyzer"
                  className="tool-image"
                />
              </div>
              <h3 className="tool-name">Formation Analyzer Pro</h3>
              <p className="tool-description">Compare Tactics</p>
              <button className="analyze-btn">Analyze Now</button>
            </motion.div>
            <motion.div
              className="tool-card"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="tool-icon-ring">
                <img
                  src={aiChatImageThree}
                  alt="Player Positioning"
                  className="tool-image"
                />
              </div>
              <h3 className="tool-name">Position Optimizer</h3>
              <p className="tool-description">Real-time Analysis</p>
              <button className="optimize-btn">Optimize Now</button>
            </motion.div>
            <motion.div
              className="tool-card"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="tool-icon-ring">
                <img
                  src={aiChatImageFour}
                  alt="Match Simulator"
                  className="tool-image"
                />
              </div>
              <h3 className="tool-name">Match Simulator</h3>
              <p className="tool-description">What-If Scenarios</p>
              <button className="simulate-btn">Simulate Now</button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  };

  return (
    <motion.div
      className="virtual-fan-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background */}
      <div className="animated-bg">
        <motion.div
          className="animated-sphere sphere-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="animated-sphere sphere-2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.div
        className="hero-section "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Advanced Football Tactics & Analysis</h1>
          <p className="hero-description">
            Master the game with AI-powered tactical analysis, real-time
            strategy simulations, and intelligent team coordination tools.
          </p>
          <div className="app-ratings">
            <div className="rating-card">
              <div className="rating-number">⚔️</div>
              <div className="rating-source">Tactical Analysis</div>
            </div>
            <div className="rating-card">
              <div className="rating-number">🎯</div>
              <div className="rating-source">Live Insights</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={aiChatImageTwo}
            alt="Football Tactics App Interface"
            className="app-mockup"
          />
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div className="section-navigation">
        {["analysis", "chat", "formations"].map((section) => (
          <motion.button
            key={section}
            className={`nav-button ${
              activeSection === section ? "active" : ""
            }`}
            onClick={() => setActiveSection(section)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-icon">
              {section === "chat" && "💬"}
              {section === "formations" && "⚽"}
              {section === "analysis" && "🧠"}
            </span>
            {section === "analysis" ? "AI Coach Analysis" : section.charAt(0).toUpperCase() + section.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeSection === "chat" && (
          <motion.div
            key="chat"
            className="chat-interface"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="chat-header">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Virtual Tactical Assistant
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ask me anything about football tactics, formations, or match
                analysis
              </motion.p>
            </div>

            <motion.div
              className="messages-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.isUser ? "user" : "ai"}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="message-avatar">
                    {message.isUser ? "👤" : "🤖"}
                  </div>
                  <div className="message-content">
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  className="typing-indicator"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="typing-avatar">🤖</div>
                  <div className="typing-dots">
                    <motion.span
                      animate={{
                        y: [0, -5, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.span
                      animate={{
                        y: [0, -5, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    />
                    <motion.span
                      animate={{
                        y: [0, -5, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="input-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about tactics, player development, or match analysis..."
                className="chat-input"
                whileFocus={{
                  boxShadow: "0 0 0 2px rgba(41, 98, 255, 0.5)",
                  scale: 1.02,
                }}
              />
              <motion.button
                type="submit"
                className="send-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="send-icon"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  ⚡
                </motion.span>
              </motion.button>
            </motion.form>
          </motion.div>
        )}

        {activeSection === "formations" && (
          <motion.div
            key="formations"
            className="formations-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="formations-header">
              <h2>Available Formations</h2>
              <p>Select a formation to analyze its strengths and weaknesses</p>
            </div>
            <div className="formations-grid">
              {formations.map((formation) => (
                <motion.div
                  key={formation.id}
                  className="formation-card"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleFormationSelect(formation)}
                >
                  <div className="formation-image-container">
                    <img
                      src={
                        formation.name === "4-3-3"
                          ? fourThreeThree
                          : formation.name === "4-4-2"
                          ? fourFourTwo
                          : formation.name === "3-5-2"
                          ? threeFiveTwo
                          : fourTwoThreeOne
                      }
                      alt={`${formation.name} formation diagram`}
                      className="formation-image"
                    />
                  </div>
                  <div className="formation-icon">⚽</div>
                  <div className="formation-content">
                    <h3>{formation.name}</h3>
                    <p>{formation.description}</p>
                  </div>
                  <div className="formation-arrow">→</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === "analysis" && (
          <motion.div
            key="analysis"
            className="analysis-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="analysis">
              {isAnalyzing ? (
                <div className="analysis-loading">
                  <div className="loading-spinner"></div>
                  <h3>Analyzing Tactics</h3>
                  <p>
                    Our AI is crafting the perfect strategy for your match...
                  </p>
                </div>
              ) : analysisResult ? (
                <div className="analysis-result">
                  <div className="analysis-header">
                    <h2>Tactical Analysis</h2>
                    <p>Detailed breakdown of recommended strategy</p>
                  </div>
                  <div className="analysis-content">
                    <div className="recommended-formation">
                      <h3>Recommended Formation: {analysisResult.formation}</h3>
                      <div className="formation-image-container">
                        <img
                          src={
                            analysisResult.formation === "4-3-3"
                              ? fourThreeThree
                              : analysisResult.formation === "4-4-2"
                              ? fourFourTwo
                              : analysisResult.formation === "3-5-2"
                              ? threeFiveTwo
                              : fourTwoThreeOne
                          }
                          alt={`${analysisResult.formation} formation diagram`}
                          className="formation-image"
                        />
                      </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: analysisResult.text }} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="analysis-header">
                    <h2>Tactical Analysis</h2>
                    <p>
                      Step {analysisStep} of 6: Let's create your tactical plan
                    </p>
                  </div>
                  {renderAnalysisForm()}
                  <motion.button
                    className="analysis-submit-btn"
                    onClick={handleAnalysisSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {analysisStep < 4 ? "Next Step" : "Get Analysis"}
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Example Questions */}
      <motion.div
        className="example-questions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2>Example Questions</h2>
        <div className="questions-grid">
          {exampleQuestions.map((question, index) => (
            <motion.div
              key={index}
              className="question-card"
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setActiveSection("chat");
                setInput(question);
              }}
            >
              <div className="question-icon">❓</div>
              {question}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Player Development Section */}
      <motion.div
        className="player-development-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="development-header">
          <h2>Player Development</h2>
          <p className="development-description">
            Comprehensive tools and insights to help players reach their full
            potential.
          </p>
        </div>

        <div className="development-grid">
          <div className="development-card">
            <h3>Skill Assessment</h3>
            <ul>
              <li>Technical ability analysis</li>
              <li>Physical attributes tracking</li>
              <li>Mental strength evaluation</li>
              <li>Position-specific skills</li>
            </ul>
          </div>

          <div className="development-card">
            <h3>Training Programs</h3>
            <ul>
              <li>Customized training plans</li>
              <li>Skill development drills</li>
              <li>Fitness routines</li>
              <li>Recovery protocols</li>
            </ul>
          </div>

          <div className="development-card">
            <h3>Progress Tracking</h3>
            <ul>
              <li>Performance metrics</li>
              <li>Improvement analysis</li>
              <li>Goal setting</li>
              <li>Feedback system</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Training Programs Hero Section */}
      <motion.div
        className="training-programs-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="training-programs-container">
          <div className="training-content">
            <h2 className="training-title">Intelligent Cooperation</h2>
            <p className="training-description">
              Enhance team coordination with AI-driven insights and real-time
              tactical adjustments.
            </p>
            <div className="training-features">
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h3 className="feature-title">Player Synergy</h3>
                <p className="feature-text">
                  Real-time position optimization and movement suggestions
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💭</div>
                <h3 className="feature-title">Live Analysis</h3>
                <p className="feature-text">
                  Instant tactical advice and player-to-player communication
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚔️</div>
                <h3 className="feature-title">Formation Comparison</h3>
                <p className="feature-text">
                  4-3-3 vs 3-5-2 analysis and effectiveness metrics
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">What-If Scenarios</h3>
                <p className="feature-text">
                  Tactical simulations and outcome predictions
                </p>
              </div>
            </div>
          </div>
          <div className="training-visual">
            <div className="program-card">
              <h3 className="program-title">Counter-Attack Strategies</h3>
              <p className="program-description">
                Analyze opponent weaknesses and develop targeted attacks
              </p>
              <div className="program-stats">
                <div className="program-stat">
                  <div className="stat-value">⚡</div>
                  <div className="stat-name">Quick Breaks</div>
                </div>
                <div className="program-stat">
                  <div className="stat-value">🎯</div>
                  <div className="stat-name">Precision</div>
                </div>
              </div>
            </div>
            <div className="program-card">
              <h3 className="program-title">Team Coordination</h3>
              <p className="program-description">
                Real-time positioning and movement optimization
              </p>
              <div className="program-stats">
                <div className="program-stat">
                  <div className="stat-value">🤝</div>
                  <div className="stat-name">Synergy</div>
                </div>
                <div className="program-stat">
                  <div className="stat-value">📊</div>
                  <div className="stat-name">Analysis</div>
                </div>
              </div>
            </div>
            <div className="program-card">
              <h3 className="program-title">Formation Analysis</h3>
              <p className="program-description">
                Compare different tactical setups and their effectiveness
              </p>
              <div className="program-stats">
                <div className="program-stat">
                  <div className="stat-value">⚔️</div>
                  <div className="stat-name">Tactics</div>
                </div>
                <div className="program-stat">
                  <div className="stat-value">📈</div>
                  <div className="stat-name">Success</div>
                </div>
              </div>
            </div>
            <div className="program-card">
              <h3 className="program-title">Scenario Simulation</h3>
              <p className="program-description">
                Test different tactical approaches and predict outcomes
              </p>
              <div className="program-stats">
                <div className="program-stat">
                  <div className="stat-value">🎮</div>
                  <div className="stat-name">Simulate</div>
                </div>
                <div className="program-stat">
                  <div className="stat-value">🎯</div>
                  <div className="stat-name">Predict</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <TacticalSection />

      {/* Match Analysis Hero Section */}
      <motion.div
        className="match-analysis-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="match-analysis-content">
          <h2 className="match-analysis-title">Team-Specific Tactics</h2>
          <p className="match-analysis-description">
            Develop targeted strategies and counter-attacks based on opponent
            analysis and historical data.
          </p>
          <div className="match-stats">
            <div className="stat-card">
              <div
                className="stat-number"
                data-description="Lightning-fast transitions"
              >
                ⚡
              </div>
              <div className="stat-label">Counter-Attack Plans</div>
              <div className="stat-description">
                Quick transitions from defense to attack with optimized player
                positioning
              </div>
            </div>
            <div className="stat-card">
              <div
                className="stat-number"
                data-description="Interactive formations"
              >
                🎮
              </div>
              <div className="stat-label">Formation Simulations</div>
              <div className="stat-description">
                Test different tactical setups with real-time player movement
              </div>
            </div>
            <div className="stat-card">
              <div
                className="stat-number"
                data-description="Data-driven insights"
              >
                📊
              </div>
              <div className="stat-label">Success Rate Analysis</div>
              <div className="stat-description">
                Track and optimize tactical effectiveness with detailed metrics
              </div>
            </div>
          </div>
        </div>
        <div className="match-analysis-visual">
          <img
            src={aiChatImageOne}
            alt="Match Analysis Dashboard"
            className="analysis-mockup"
          />
        </div>
      </motion.div>

      {/* Performance Insights Hero Section */}
      <motion.div
        className="performance-insights-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="insights-container">
          <div className="insights-header">
            <h2 className="insights-title">Performance Insights</h2>
            <p className="insights-description">
              Track your progress and analyze your performance with advanced
              metrics and AI-driven insights. Make data-informed decisions to
              elevate your game to the next level.
            </p>
          </div>

          <div className="insights-content">
            <div className="insight-card">
              <div
                className="circular-progress"
                style={{ "--progress": "85%" }}
              >
                <div className="progress-value">85%</div>
              </div>
              <h3 className="insight-title">Pass Accuracy</h3>
              <div className="insight-stats">
                <div className="stat-item">
                  <div className="stat-value">92</div>
                  <div className="stat-label">Complete</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">108</div>
                  <div className="stat-label">Total</div>
                </div>
              </div>
            </div>

            <div className="insight-card">
              <div
                className="circular-progress"
                style={{ "--progress": "78%" }}
              >
                <div className="progress-value">78%</div>
              </div>
              <h3 className="insight-title">Shot Precision</h3>
              <div className="insight-stats">
                <div className="stat-item">
                  <div className="stat-value">14</div>
                  <div className="stat-label">On Target</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">18</div>
                  <div className="stat-label">Total</div>
                </div>
              </div>
            </div>

            <div className="insight-card">
              <div
                className="circular-progress"
                style={{ "--progress": "92%" }}
              >
                <div className="progress-value">92%</div>
              </div>
              <h3 className="insight-title">Tackle Success</h3>
              <div className="insight-stats">
                <div className="stat-item">
                  <div className="stat-value">24</div>
                  <div className="stat-label">Won</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">26</div>
                  <div className="stat-label">Total</div>
                </div>
              </div>
            </div>
          </div>

          <div className="insights-footer">
            <div className="trend-card">
              <div className="trend-icon">📈</div>
              <div className="trend-info">
                <div className="trend-value">+15%</div>
                <div className="trend-label">Performance Trend</div>
              </div>
            </div>
            <div className="trend-card">
              <div className="trend-icon">⚡</div>
              <div className="trend-info">
                <div className="trend-value">12.4 km/h</div>
                <div className="trend-label">Avg. Sprint Speed</div>
              </div>
            </div>
            <div className="trend-card">
              <div className="trend-icon">🎯</div>
              <div className="trend-info">
                <div className="trend-value">8.5</div>
                <div className="trend-label">Match Rating</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VirtualFan;
