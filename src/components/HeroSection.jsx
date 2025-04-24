import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import refreeImage from "../assets/reffree-removebg.png";
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Used for decorative elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut",
    },
  };

  // Used for decorative blobs
  const blobAnimation = {
    scale: [1, 1.05, 1],
    rotate: [0, 5, 0],
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: "easeInOut",
    },
  };

  // Used for glowing effect
  const pulseAnimation = {
    opacity: [0.7, 1, 0.7],
    scale: [1, 1.03, 1],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-20  border-b-[1px] border/20 border-blue-950 min-h-[100vh] flex items-end overflow-hidden bg-gradient-to-r from-gray-900 to-gray-950"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15, ...blobAnimation }}
          className="absolute w-[35rem] h-[35rem] rounded-full bg-blue-500 -top-10 -right-16 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1, ...blobAnimation }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute w-[30rem] h-[30rem] rounded-full bg-blue-400 top-32 -left-20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05, ...pulseAnimation }}
          className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 to-transparent"
        />

        {/* Decorative particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-${Math.floor(Math.random() * 3) + 2} h-${
                Math.floor(Math.random() * 3) + 2
              } rounded-full bg-blue-${
                Math.floor(Math.random() * 3) * 100 + 400
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.4,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() > 0.5 ? 10 : -10, 0],
                scale: [1, 1.2, 1],
                transition: {
                  repeat: Infinity,
                  duration: 3 + Math.random() * 5,
                  delay: Math.random() * 2,
                },
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2  gap-12 h-[90vh] items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Hero Image/Illustration */}
          <motion.div
            className="relative h-full flex items-end justify-center lg:justify-end"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-full md:w-full lg:w-full mx-auto max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {/* Position the image at the bottom but ensure it's fully visible */}
              <div className="relative" style={{ marginBottom: "0" }}>
                <img
                  src={refreeImage}
                  alt="Football Analysis"
                  className="w-full h-auto object-contain z-10 relative scale-125"
                  style={{
                    mixBlendMode: "lighten",
                    transformOrigin: "bottom center",
                    paddingBottom: "0rem", // Add padding to ensure bottom is visible
                  }}
                />

                {/* Adjust the glow effect position */}
                <motion.div
                  className="absolute bottom-10 left-0 right-0 -z-10 w-full mx-auto h-full bg-purple-600/30 blur-3xl rounded-full"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Adjust stats card position */}
                <motion.div
                  className="absolute bottom-40 right-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-sm font-semibold text-blue-600">
                    Match accuracy
                  </div>
                  <div className="text-2xl font-bold text-gray-900">98.5%</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
          >
            <motion.div
              className="mb-2 inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-medium text-sm inline-block">
                Advanced Sports Analytics
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              variants={itemVariants}
            >
              <span className="text-blue-600 relative inline-block">
                AI-Powered
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1.5 bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>{" "}
              Football Analysis
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Experience the future of football with Hutaf's advanced AI
              computer vision. Real-time analysis, intelligent predictions, and
              interactive features that transform how you watch and engage with
              the beautiful game.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.button
                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 border-2 border-blue-500 hover:bg-blue-700 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold shadow-lg shadow-blue-400/20 border-2 border-blue-400 hover:bg-blue-50 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(96, 165, 250, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {["Real-time Analysis", "Match Insights", "Player Tracking"].map(
                (feature, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-blue-100/60 text-blue-600 text-sm rounded-lg border border-blue-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(219, 234, 254, 0.9)",
                    }}
                  >
                    {feature}
                  </motion.span>
                )
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
