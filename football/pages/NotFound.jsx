import React from "react";
import { Link } from "react-router-dom";
import { motion } from "../components/FixFramerMotion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-9xl font-bold text-blue-600">404</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              We couldn't find the page you were looking for. It might have been
              moved, deleted, or never existed.
            </p>
          </motion.div>

          <div className="relative">
            {/* Football field illustration */}
            <div className="w-full max-w-md mx-auto h-64 bg-green-600 rounded-xl border-2 border-white mb-8 overflow-hidden relative">
              {/* Field lines */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white -translate-y-1/2"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>

              {/* Goal boxes */}
              <div className="absolute top-0 left-1/2 w-32 h-12 border-b-2 border-l-2 border-r-2 border-white -translate-x-1/2"></div>
              <div className="absolute bottom-0 left-1/2 w-32 h-12 border-t-2 border-l-2 border-r-2 border-white -translate-x-1/2"></div>

              {/* Ball */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                animate={{
                  x: [0, 50, 100, -100, -50, 0],
                  y: [0, 20, 0, 20, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* 404 sign */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-lg font-bold border-2 border-white">
                404
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>

            <Link
              to="/virtual-referee"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg border-2 border-blue-500 hover:bg-blue-50 transition-colors"
            >
              Explore Features
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
