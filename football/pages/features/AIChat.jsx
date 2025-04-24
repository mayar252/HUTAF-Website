import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "../../components/FixFramerMotion";
import "./AIChat.css";
import aiChatBot1 from "../../assets/ai-chat-bot-1.png";
import liverpoolLogo from "../../assets/liverpool.jpeg";
import manchesterCityLogo from "../../assets/mancitylogo.png";
import aiChatBot2 from "../../assets/ai-chat-bot-2.png";
import { getGeminiChat, sendMessageToGemini } from "../../config/gemini";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeSection, setActiveSection] = useState("chat"); // New state for managing active section
  const [teamLogos, setTeamLogos] = useState({
    home: liverpoolLogo,
    away: manchesterCityLogo,
  });
  const chatInstanceRef = useRef(null);

  // Simulated match data
  const matchData = {
    homeTeam: "Liverpool",
    awayTeam: "Manchester City",
    score: { home: 2, away: 1 },
    possession: { home: 53, away: 47 },
    shots: { home: 12, away: 9 },
    shotsOnTarget: { home: 5, away: 3 },
  };

  // Animated example questions
  const exampleQuestions = [
    "Why did Liverpool dominate today?",
    "Who was the best player in the match?",
    "What was the weak point in Manchester City's team?",
    "What was Liverpool's possession percentage?",
    "Could Pep have changed the game plan?",
    "What was the key moment that changed the game?",
    "How did the weather conditions affect the match?",
    "Which team had better defensive organization?",
    "What was the impact of the substitutions?",
    "How did the referee's decisions affect the game?",
  ];

  // New trending topics
  const trendingTopics = [
    { id: 1, topic: "Tactical Analysis", count: 235 },
    { id: 2, topic: "Player Performance", count: 189 },
    { id: 3, topic: "Referee Decisions", count: 143 },
    { id: 4, topic: "Coaching Strategy", count: 112 },
    { id: 5, topic: "Team Formation", count: 98 },
  ];

  // AI capabilities section data
  const aiCapabilities = [
    {
      icon: "📊",
      title: "Match Statistics Analysis",
      description:
        "Process and interpret complex match statistics in real-time",
    },
    {
      icon: "📋",
      title: "Tactical Evaluation",
      description: "Analyze team formations, strategies, and tactical changes",
    },
    {
      icon: "⚽",
      title: "Player Performance Metrics",
      description: "Track individual player contributions and performance data",
    },
    {
      icon: "🔍",
      title: "Predictive Insights",
      description: "Generate predictions based on historical and current data",
    },
    {
      icon: "📱",
      title: "Real-time Updates",
      description: "Provide instant analysis and updates during live matches",
    },
    {
      icon: "🎯",
      title: "Custom Analysis",
      description: "Answer specific questions about any aspect of the match",
    },
  ];

  // Predefined AI responses for a more realistic demo
  const aiResponses = {
    "Why did Liverpool dominate today?":
      "Liverpool dominated today due to their strong defensive organization and efficient midfield play. Their back line was rarely caught out of position, allowing them to create 8 high-quality chances. Additionally, their midfield maintained possession in crucial moments, with a 78% pass completion rate in the final third compared to their season average of 78%.",
    "Who was the best player in the match?":
      "Based on the match data, Cristiano Ronaldo was the standout performer today with 1 goal, 2 assists, and 4 key passes. He maintained a 91% pass completion rate and won 7 duels. His xG (expected goals) of 0.8 also indicates he was efficiently converting his chances.",
    "What was the weak point in Al-Nassr's team?":
      "Al-Nassr's primary weakness today was their midfield transition. They lost possession 24 times in the middle third of the pitch, allowing counter-attacks. Their defensive midfielders were often caught out of position, creating a gap between defense and midfield that was repeatedly exploited.",
  };

  // Generate random logos on component mount for demo
  useEffect(() => {
    // This would normally fetch real logos from an API
    const demoLogos = {
      home: "https://assets.stickpng.com/images/584a9b47b080d7616d298778.png",
      away: "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png",
    };
    setTeamLogos(demoLogos);

    // Add welcoming message
    setTimeout(() => {
      setMessages([
        {
          text: "Hi there! I'm your Match Analysis AI. Ask me anything about the game!",
          isUser: false,
        },
      ]);
    }, 800);
  }, []);

  // Initialize Gemini chat instance
  useEffect(() => {
    const initializeChat = async () => {
      try {
        chatInstanceRef.current = await getGeminiChat();
        // Add welcoming message
        setTimeout(() => {
          setMessages([
            {
              text: "Hi there! I'm your Match Analysis AI. Ask me anything about the game!",
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

  // Enhanced handleSubmit function with Gemini integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Enhance the user's query with match context
      const enhancedQuery = `Analyze this about the match between ${matchData.homeTeam} vs ${matchData.awayTeam} (Score: ${matchData.score.home}-${matchData.score.away}): ${input}
      
      Consider these match statistics:
      - Possession: ${matchData.homeTeam} ${matchData.possession.home}% - ${matchData.awayTeam} ${matchData.possession.away}%
      - Shots: ${matchData.homeTeam} ${matchData.shots.home} - ${matchData.awayTeam} ${matchData.shots.away}
      - Shots on Target: ${matchData.homeTeam} ${matchData.shotsOnTarget.home} - ${matchData.awayTeam} ${matchData.shotsOnTarget.away}`;

      // Get response from Gemini
      const response = await sendMessageToGemini(
        chatInstanceRef.current,
        enhancedQuery
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

  // Handle section changes
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  return (
    <motion.div
      className="ai-chat-container "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced animated background elements */}
      <div className="animated-bg">
        <motion.div
          className="animated-sphere sphere-1 "
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
        <motion.div
          className="animated-sphere sphere-3"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="animated-particles"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      {/* Enhanced Header Section */}
      <motion.div
        className="ai-chat-header mt-[70px]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="team-display left-team"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img
            src={
              matchData.homeTeam === "Liverpool"
                ? liverpoolLogo
                : manchesterCityLogo
            }
            alt={matchData.homeTeam}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.3 }}
            className={`${
              matchData.homeTeam === "Liverpool"
                ? "!rounded-full"
                : "!rounded-full "
            }`}
          />
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {matchData.homeTeam}
          </motion.h3>
          <motion.div
            className="team-score"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {matchData.score.home}
          </motion.div>
        </motion.div>

        <div className="header-content">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glow-text"
          >
            Match Analysis AI
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="subtitle"
          >
            Ask any question about the match and get instant AI-powered insights
          </motion.p>
          <motion.div
            className="match-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          ></motion.div>
        </div>

        <motion.div
          className="team-display right-team"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img
            src={
              matchData.awayTeam === "Manchester City"
                ? manchesterCityLogo
                : liverpoolLogo
            }
            alt={matchData.awayTeam}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.3 }}
          />
          <motion.h3
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {matchData.awayTeam}
          </motion.h3>
          <motion.div
            className="team-score"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {matchData.score.away}
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Enhanced Section Navigation */}
      <motion.div
        className="section-navigation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {["chat", "trending", "capabilities"].map((section) => (
          <motion.button
            key={section}
            className={`nav-button ${
              activeSection === section ? "active" : ""
            }`}
            onClick={() => handleSectionChange(section)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <span className="nav-icon">
              {section === "chat" && "💬"}
              {section === "trending" && "📈"}
              {section === "capabilities" && "⚡"}
            </span>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </motion.button>
        ))}
      </motion.div>
      {/* Enhanced Main Content Area */}
      <AnimatePresence mode="wait">
        {activeSection === "chat" && (
          <motion.div
            key="chat"
            className="chat-interface"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="messages-container">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`message ${message.isUser ? "user" : "ai"}`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="message-avatar">
                      {message.isUser ? (
                        <div className="user-avatar">👤</div>
                      ) : (
                        <div className="ai-avatar">🤖</div>
                      )}
                    </div>
                    <div
                      className="message-content"
                      dangerouslySetInnerHTML={{ __html: message.text }}
                    ></div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    className="message ai typing"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="message-avatar">
                      <div className="ai-avatar">🤖</div>
                    </div>
                    <div className="typing-indicator">
                      <motion.span
                        animate={{
                          opacity: [0.2, 1, 0.2],
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.span
                        animate={{
                          opacity: [0.2, 1, 0.2],
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                      />
                      <motion.span
                        animate={{
                          opacity: [0.2, 1, 0.2],
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="input-container"
              variants={itemVariants}
            >
              <motion.input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the match..."
                className="chat-input"
                // whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="send-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="send-icon">🚀</span>
              </motion.button>
            </motion.form>
          </motion.div>
        )}

        {/* Enhanced Trending Section */}
        {activeSection === "trending" && (
          <motion.div
            key="trending"
            className="trending-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.h2 variants={itemVariants} className="section-title">
              Trending Questions
            </motion.h2>
            <motion.p className="section-description" variants={itemVariants}>
              See what other fans are asking about this match
            </motion.p>

            <div className="trending-topics">
              {trendingTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  className="trending-topic-card"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 20px rgba(0, 180, 216, 0.2)",
                  }}
                  onClick={() => {
                    setActiveSection("chat");
                    setInput(
                      `Tell me about ${topic.topic.toLowerCase()} in this match`
                    );
                  }}
                >
                  <div className="topic-content">
                    <h3>{topic.topic}</h3>
                    <div className="topic-meta">
                      <span className="topic-count">
                        {topic.count} questions
                      </span>
                      <span className="trending-indicator">
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          🔥
                        </motion.span>
                        Trending
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="trending-chart" variants={itemVariants}>
              <h3>Popular Topics Over Time</h3>
              <div className="chart-placeholder">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    className="chart-bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${(topic.count / 235) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <span>{topic.topic}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Enhanced Capabilities Section */}
        {activeSection === "capabilities" && (
          <motion.div
            key="capabilities"
            className="capabilities-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.h2 variants={itemVariants} className="section-title">
              AI Capabilities
            </motion.h2>
            <motion.p className="section-description" variants={itemVariants}>
              Discover what our Match Analysis AI can do for you
            </motion.p>

            <div className="capabilities-grid">
              {aiCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  className="capability-card"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0, 180, 216, 0.2)",
                  }}
                >
                  <motion.div
                    className="capability-icon"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {capability.icon}
                  </motion.div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div className="ai-banner" variants={itemVariants}>
              <div className="banner-content">
                <h3>Advanced Match Analysis</h3>
                <p>
                  Our AI processes terabytes of match data to provide insights
                  that traditional analysis might miss. From player positioning
                  to tactical patterns, get the complete picture.
                </p>
                <motion.button
                  className="try-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection("chat")}
                >
                  Try It Now
                </motion.button>
              </div>
              <div className="banner-decoration">
                <motion.div
                  className="banner-sphere"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Enhanced Example Questions */}
      <motion.div
        className="example-questions"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={itemVariants} className="section-title">
          Example Questions
        </motion.h2>
        <div className="questions-grid">
          {exampleQuestions.map((question, index) => (
            <motion.div
              key={index}
              className="question-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0, 180, 216, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveSection("chat");
                setInput(question);
              }}
              custom={index}
            >
              <div className="question-icon">
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ❓
                </motion.span>
              </div>
              {question}
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Welcome Sections */}
      <motion.div
        className="welcome-sections"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Section - Bot and Text */}
        <motion.div className="welcome-top" variants={itemVariants}>
          <div className="welcome-text">
            <h1>Beyond Text: Visual Experiences in Every Chat</h1>
            <p>
              Experience rich interactions with our AI chatbot, making every
              conversation engaging and meaningful.
            </p>
          </div>
          <motion.img
            src={aiChatBot1}
            alt="AI Chat Bot"
            className="welcome-bot-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Bottom Section - Stats and Reviews */}
        <motion.div className="welcome-bottom" variants={itemVariants}>
          <div className="stats-section">
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>10M+</h3>
              <p>Active Users</p>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>30K+</h3>
              <p>Reviews</p>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>4.7</h3>
              <p>Rating</p>
            </motion.div>
          </div>
          <h2>Satisfying Experience With Our AI Chatbot</h2>
          <div className="reviews-grid">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="review-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="stars">★★★★★</div>
                <p>
                  "Amazing chat experience! The AI understands context
                  perfectly."
                </p>
                <div className="reviewer">- Happy User</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      {/* Features Section */}
      <motion.div
        className="features-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="features-grid">
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                />
              </svg>
            </div>
            <h3>Friendly Chatbot</h3>
            <p>Quick Answers For You</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.31-.94-2.31-1.68 0-.84.79-1.43 2-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2 1.39-1.53 0-2.13-.6-2.21-1.75H8.33c.09 1.83 1.47 2.85 3.03 3.19V19h2.08v-1.71c1.52-.29 2.72-1.16 2.72-2.78 0-2.19-1.9-2.93-3.85-3.37z"
                />
              </svg>
            </div>
            <h3>Fast Solution</h3>
            <p>With Our Chatbot</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"
                />
              </svg>
            </div>
            <h3>24/7 Support</h3>
            <p>Always Here For You</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"
                />
              </svg>
            </div>
            <h3>Easy Access</h3>
            <p>Simple To Use</p>
          </motion.div>
        </div>

        <div className="stats-bar">
          <div className="stat-counter">
            <h3>5623</h3>
            <p>Total Messages</p>
          </div>
          <div className="stat-counter">
            <h3>4523</h3>
            <p>Happy Users</p>
          </div>
          <div className="stat-counter">
            <h3>5.0</h3>
            <p>Rating</p>
          </div>
          <div className="stat-counter">
            <h3>200</h3>
            <p>Daily Users</p>
          </div>
        </div>
      </motion.div>
      l
      {/* Add this new section before the closing tag of your main container */}
      <section className="showcase-section">
        <div className="showcase-content">
          <div className="showcase-text">
            <h2 className="showcase-heading">
              Experience AI-Powered Match Analysis
            </h2>
            <p className="showcase-description">
              Dive deep into match statistics, player performance, and tactical
              analysis with our advanced AI system. Get real-time insights and
              predictions that help you understand the game better.
            </p>
            <div className="showcase-features">
              <div className="showcase-feature-item">
                <div className="feature-icon-small">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="feature-text">
                  Advanced Statistical Analysis
                </span>
              </div>
              <div className="showcase-feature-item">
                <div className="feature-icon-small">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <span className="feature-text">Real-time Predictions</span>
              </div>
              <div className="showcase-feature-item">
                <div className="feature-icon-small">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="feature-text">
                  Instant Performance Insights
                </span>
              </div>
            </div>
          </div>
          <div className="showcase-image-container">
            <div className="image-decoration decoration-1"></div>
            <div className="image-decoration decoration-2"></div>
            <img
              src={aiChatBot2}
              alt="AI Match Analysis Dashboard"
              className="showcase-image"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AIChat;
