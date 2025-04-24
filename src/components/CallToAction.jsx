import React from "react";
import { Link } from "react-router-dom";
import { motion } from "./FixFramerMotion";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the Future of Football Technology
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Revolutionize how you engage with football through our
              cutting-edge AI-powered solutions. Get started today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/virtual-referee"
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-50 transition-colors inline-block"
                >
                  Request a Demo
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/virtual-fan"
                  className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-colors inline-block"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-200">Professional Teams</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">500K+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
