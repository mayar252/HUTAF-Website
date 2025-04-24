// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "../components/FixFramerMotion";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuVariants = {
    hidden: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Enhanced hover effects for navigation links
  const linkHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      color: "#3B82F6", // Primary blue color
      textShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)", // Glow effect
      transition: { duration: 0.2 },
    },
  };

  // Define navigation items with paths to the feature-specific pages
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Virtual Referee", path: "/virtual-referee" },
    { name: "AI Coach", path: "/virtual-fan" },
    { name: "AI Chat", path: "/ai-chat" },
    { name: "Analysis", path: "/analysis" },
  ];

  // Helper function to check if a path is active (accounting for the root path)
  const isPathActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path;
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-lg border-b ${
        isScrolled
          ? "bg-white/80 shadow-lg py-3 border-gray-200/50"
          : "bg-white/80 shadow-md py-3 border-gray-200/50"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 right-0 w-64 h-64 bg-blue-500/5 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute -bottom-10 left-1/4 w-56 h-56 bg-blue-500/5 rounded-full hidden lg:block"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -5, 0],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <NavLink
              to="/"
              className="text-3xl md:text-4xl font-bold text-gray-800"
            >
              Hutaf
              <motion.span
                className="text-blue-500"
                animate={{
                  scale: [1, 1.2, 1],
                  transition: { duration: 2, repeat: Infinity },
                }}
              >
                .
              </motion.span>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => {
              const active = isPathActive(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`text-gray-800 font-medium text-lg transition-all ${
                    active ? "text-blue-600" : ""
                  }`}
                >
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    variants={linkHoverVariants}
                    custom={index}
                    className="relative overflow-hidden"
                  >
                    {item.name}
                    <motion.div
                      className="h-0.5 bg-blue-500 absolute bottom-0 left-0"
                      initial={{ width: active ? "100%" : 0 }}
                      animate={{ width: active ? "100%" : 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </NavLink>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:shadow-blue-500/30 border-2 border-blue-500 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.4)",
                backgroundColor: "rgba(239, 246, 255, 1)", // blue-50
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10">Get Started</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-800 focus:outline-none z-50 p-2 rounded-lg bg-white/80 shadow-sm border border-gray-200/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(239, 246, 255, 1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation - Sidebar from Left */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Dark overlay */}
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                className="fixed top-0 left-0 bottom-0 w-[80%] h-[100vh] bg-white shadow-2xl z-[100] overflow-y-auto"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute -top-20 right-0 w-56 h-56 bg-blue-500/5 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                      transition: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-0 w-64 h-64 bg-blue-500/5 rounded-full"
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, -5, 0],
                      transition: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />
                </div>

                {/* Close button */}
                <motion.button
                  className="absolute top-6 right-6 z-50 p-2 bg-gray-100 rounded-full hover:bg-gray-200 shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(239, 246, 255, 1)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className="text-blue-600" />
                </motion.button>

                <div className="flex flex-col h-full pt-24 px-8 relative z-10">
                  <div className="flex flex-col space-y-6">
                    {navItems.map((item, index) => {
                      const active = isPathActive(item.path);
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={`text-xl font-semibold border-b border-gray-100 pb-3 transition-all relative group ${
                            active ? "text-blue-600" : "text-gray-800"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <motion.div
                            variants={menuItemVariants}
                            custom={index}
                            whileHover={{ x: 5, color: "#3B82F6" }}
                            className="flex items-center"
                          >
                            <motion.span
                              className={`mr-2 text-blue-500 absolute -left-4 transition-opacity ${
                                active
                                  ? "opacity-100"
                                  : "opacity-0 group-hover:opacity-100"
                              }`}
                              initial={{ opacity: active ? 1 : 0, x: -5 }}
                              animate={{ opacity: active ? 1 : 0 }}
                              whileHover={{ opacity: 1, x: 0 }}
                            >
                              →
                            </motion.span>
                            {item.name}
                            <motion.div
                              className="h-0.5 bg-blue-500 absolute bottom-0 left-0"
                              initial={{ width: active ? "1/3" : "0" }}
                              animate={{ width: active ? "1/3" : "0" }}
                              whileHover={{ width: "1/3" }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.div>
                        </NavLink>
                      );
                    })}
                  </div>

                  {/* Status indicator */}
                  <motion.div
                    className="mt-12 mb-6 bg-blue-50 rounded-lg p-4 border border-blue-100"
                    variants={menuItemVariants}
                  >
                    <div className="flex items-center mb-2">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full mr-2"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-medium text-blue-800">
                        Available 24/7
                      </span>
                    </div>
                    <p className="text-sm text-blue-600/80">
                      Our AI analysis is always ready to assist with your
                      football data needs
                    </p>
                  </motion.div>

                  <motion.div
                    className="mt-auto mb-8"
                    variants={menuItemVariants}
                  >
                    <motion.button
                      className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 border border-blue-500/30 transition-all"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
