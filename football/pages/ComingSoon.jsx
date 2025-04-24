import React from "react";
import { motion } from "framer-motion";

const ComingSoon = ({ feature }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
      className="bg-gradient-to-r from-gray-900 to-gray-950"
    >
      {/* Animated background elements */}
      <motion.div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "var(--color-purple)",
          filter: "blur(80px)",
          opacity: 0.1,
          top: "-20%",
          right: "-10%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "var(--color-indigo)",
          filter: "blur(80px)",
          opacity: 0.1,
          bottom: "-20%",
          left: "-10%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            background: "var(--color-light-purple)",
            borderRadius: "50%",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: 0.3,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 20 : -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div style={{ textAlign: "center", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            style={{
              color: "var(--color-text-purple)",
              fontSize: "1.2rem",
              marginBottom: "1rem",
              fontWeight: 500,
            }}
          >
            {feature}
          </div>
        </motion.div>

        <motion.h1
          style={{
            fontSize: "clamp(2rem, 10vw, 5rem)",
            fontWeight: "bold",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text"
        >
          Coming Soon
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          style={{
            height: "4px",
            width: "100px",
            background: "var(--color-light-purple)",
            margin: "0 auto",
            borderRadius: "2px",
          }}
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: "easeOut",
          }}
        />

        {/* Pulsing dot animation */}
        <motion.div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--color-light-purple)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
