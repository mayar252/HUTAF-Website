// components/FeatureCard.jsx
import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>

        <motion.h3
          className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>

        <motion.p className="text-gray-600" whileHover={{ x: 5 }}>
          {description}
        </motion.p>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 bg-primary-200 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default FeatureCard;
