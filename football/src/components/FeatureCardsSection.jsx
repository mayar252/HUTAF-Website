import React from "react";
import { motion } from "../components/FixFramerMotion";
import { Link } from "react-router-dom";
const FeatureCardsSection = () => {
  // Feature card data
  const features = [
    {
      id: "virtual-referee",
      title: "Virtual Referee",
      image: "/images/virtual-referee.jpg", // Replace with actual image path
      description:
        "Advanced AI-powered match analysis that acts as your virtual referee, providing real-time decisions and insights.",
      keyFeatures: [
        "Real-time offside detection",
        "Penalty decision analysis",
        "Referee accuracy metrics",
        "Video assistant technology",
      ],
      link: "/virtual-referee",
      color: "from-blue-400 to-indigo-600",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: "virtual-fan",
      title: "Virtual Fan",
      image: "/images/virtual-fan.jpg", // Replace with actual image path
      description:
        "Experience matches from anywhere as if you were there with our immersive fan experience technology.",
      keyFeatures: [
        "360° stadium views",
        "Crowd atmosphere audio",
        "Multi-angle replays",
        "Live stats integration",
      ],
      link: "/virtual-fan",
      color: "from-green-400 to-blue-500",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
{
  id: "Guess-the-winner",
  title: "Guess The Winner",
  image: "/images/guess-the-winner.jpg", // Replace with actual image path
  link: "/guess-the-winner",
  description:
    "Predict the winner of live football matches and stand a chance to win exciting prizes! Compete with other fans and show off your football instincts.",
  keyFeatures: [
    "Live match prediction",
    "Win prizes for correct guesses",
    "Leaderboard of top predictors",
    "Interactive football fan experience",
  ],
      color: "from-purple-400 to-indigo-500",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      id: "analysis-games",
      link: "/analysis",
      title: "Analysis & Games",
      image: "/images/analysis-games.jpg", // Replace with actual image path
      description:
        "In-depth match analysis tools and interactive games designed for both professionals and younger fans.",
      keyFeatures: [
        "Score predictions",
        "Player performance metrics",
        "Interactive learning games",
        "Child-friendly interfaces",
      ],
      color: "from-orange-400 to-pink-500",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -15,
      scale: 1.02,
      boxShadow: "0 30px 60px -12px rgba(59, 130, 246, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Random floating animations for background elements
  const floatingAnimation = (delay = 0) => ({
    y: [0, -15, 0],
    x: [0, 5, 0],
    transition: {
      delay,
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  });

  // Pulse animation for the glow effect
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="py-24  bg-gradient-to-r from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated background glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[500px] rounded-full blur-[150px] bg-blue-300/20 mix-blend-multiply"
          animate={pulseAnimation}
        />

        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl"
          animate={floatingAnimation(0)}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
          animate={floatingAnimation(1)}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-40 h-40 bg-indigo-300/10 rounded-full blur-2xl"
          animate={floatingAnimation(0.5)}
        />

        {/* Small floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/50 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() > 0.5 ? 10 : -10, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1],
              transition: {
                repeat: Infinity,
                duration: 4 + Math.random() * 6,
                delay: Math.random() * 2,
              },
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <span className="bg-blue-100 text-blue-600 text-sm font-medium px-6 py-2.5 rounded-full inline-block mb-5 relative z-10">
              Premium Features
            </span>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-md"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200 mb-6"
          >
            Revolutionary Football{" "}
            <span className="text-blue-600 relative">
              Experience
              <motion.div
                className="absolute -bottom-2 left-0 h-1.5 w-full bg-blue-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our cutting-edge tools that transform how you experience,
            analyze, and enjoy football matches like never before.
          </motion.p>
        </div>

        {/* Feature cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100/80 backdrop-blur-sm group"
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              {/* Card image */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent z-10" />
                <motion.div
                  className="w-full h-full bg-gray-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Placeholder for actual image - replace with img tag using feature.image */}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${feature.color} flex items-center justify-center relative`}
                  >
                    <div className="absolute top-4 left-4 text-white/90 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                      {feature.icon}
                    </div>
                    <span className="text-white text-xl font-bold">
                      {feature.title}
                    </span>

                    {/* Floating 3D elements */}
                    <motion.div
                      className="absolute right-0 bottom-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mb-8"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0],
                        transition: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    />
                    <motion.div
                      className="absolute right-6 bottom-6 w-3 h-3 bg-white/30 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                        transition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    />
                  </div>
                </motion.div>

                {/* Feature badge */}
                <motion.div
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-blue-600 z-20 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                >
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
                    New
                  </span>
                </motion.div>
              </div>

              {/* Card content */}
              <div className="p-6 md:p-7">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </motion.div>
                <motion.p
                  className="text-gray-600 mb-5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {feature.description}
                </motion.p>

                {/* Key features list */}
                <div className="mb-6">
                  <motion.h4
                    className="text-sm font-semibold text-gray-900 mb-3 flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    Key Features
                  </motion.h4>
                  <ul className="space-y-2">
                    {feature.keyFeatures.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="text-sm text-gray-600 flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 + idx * 0.1 }}
                      >
                        <svg
                          className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link to={feature.link}>
                  <motion.button
                    className="w-full py-3.5 px-4 bg-white text-blue-600 font-medium rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors flex items-center justify-center group relative overflow-hidden"
                    whileHover={{
                      boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.25)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-xl relative overflow-hidden group"
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 30px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center">
              Explore All Features
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </motion.button>

          {/* Number of active users */}
          <motion.div
            className="mt-8 text-gray-600 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex -space-x-2 mr-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br ${
                    [
                      "from-blue-400 to-blue-500",
                      "from-green-400 to-blue-400",
                      "from-purple-400 to-indigo-400",
                      "from-orange-400 to-pink-400",
                    ][i]
                  }`}
                />
              ))}
            </div>
            <span>Join 10,000+ active users</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCardsSection;
