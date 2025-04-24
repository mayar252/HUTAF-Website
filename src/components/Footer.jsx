// components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Animation for footer links
  const linkHoverVariants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      color: "#3B82F6",
      transition: { duration: 0.2 },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 md:py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-800/5 rounded-full translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-blue-800/5 rounded-full -translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -10, 0],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Small floating particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-blue-500/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() > 0.5 ? 10 : -10, 0],
              opacity: [0.3, 0.6, 0.3],
              transition: {
                repeat: Infinity,
                duration: 5 + Math.random() * 5,
                delay: Math.random() * 2,
              },
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Branding Column */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                Hutaf
                <motion.span
                  className="text-blue-500 ml-0.5"
                  animate={{
                    scale: [1, 1.2, 1],
                    transition: { duration: 2, repeat: Infinity },
                  }}
                >
                  .
                </motion.span>
              </h3>
            </motion.div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Revolutionizing football analysis with AI and computer vision
              technology.
            </p>

            <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <div className="flex items-center mb-3">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full mr-2"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-gray-300">
                  Always online
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Our AI-powered analysis is available 24/7. Get instant insights
                whenever you need them.
              </p>
            </div>
          </motion.div>

          {/* Features Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="relative">
              <h4 className="text-lg font-semibold mb-5 inline-block">
                Features
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-blue-500/70 w-1/2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </h4>
            </div>
            <ul className="space-y-3 mt-4">
              {["Virtual Referee", "AI Coach", "AI Chat", "Analysis"].map(
                (feature, index) => (
                  <motion.li
                    key={index}
                    variants={linkHoverVariants}
                    initial="initial"
                    whileHover="hover"
                    className="transform transition-transform"
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                    >
                      <motion.span
                        className="mr-2 text-blue-500/0"
                        variants={{
                          initial: { opacity: 0, x: -5 },
                          hover: { opacity: 1, x: 0 },
                        }}
                      >
                        →
                      </motion.span>
                      {feature}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="relative">
              <h4 className="text-lg font-semibold mb-5 inline-block">
                Contact
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-blue-500/70 w-1/2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />
              </h4>
            </div>
            <ul className="space-y-4 mt-4 text-gray-400">
              <motion.li
                variants={linkHoverVariants}
                initial="initial"
                whileHover="hover"
                className="flex items-center"
              >
                <span className="bg-gray-800 rounded-full p-2 mr-3">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                info@hutaf.com
              </motion.li>
              <motion.li
                variants={linkHoverVariants}
                initial="initial"
                whileHover="hover"
                className="flex items-center"
              >
                <span className="bg-gray-800 rounded-full p-2 mr-3">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                +1 (123) 456-7890
              </motion.li>
              <li className="mt-5 mb-2">
                <span className="font-medium text-white">Follow Us</span>
              </li>
              <li className="flex space-x-3">
                {[
                  {
                    icon: "twitter",
                    color:
                      "bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white",
                  },
                  {
                    icon: "facebook",
                    color:
                      "bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white",
                  },
                  {
                    icon: "instagram",
                    color:
                      "bg-pink-500/10 text-pink-400 hover:bg-pink-500 hover:text-white",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`${social.color} p-3 rounded-full transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {social.icon === "twitter" && (
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      )}
                      {social.icon === "facebook" && (
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      )}
                      {social.icon === "instagram" && (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      )}
                    </svg>
                  </motion.a>
                ))}
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter subscription */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-8 border-t border-b border-gray-800/50 mb-8"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h4 className="text-lg font-semibold mb-1 text-white">
                  Stay updated
                </h4>
                <p className="text-gray-400 text-sm">
                  Get the latest updates and news
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright footer */}
        <motion.div
          className="text-center pt-6"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Hutaf. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
