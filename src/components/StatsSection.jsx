import { motion } from "framer-motion";
import metaverse from "../assets/semirealistic-digital-painting-man-accessing-metaverse-development.jpg";

const StatsSection = () => {
  const stats = [
    { value: "500+", label: "Matches Analyzed", icon: "📊" },
    { value: "50+", label: "Teams", icon: "🏆" },
    { value: "150+", label: "Players Tracked", icon: "👥" },
    { value: "150+", label: "Active Users", icon: "👨‍💻" },
  ];

  // Used for decorative blobs
  const blobAnimation = {
    scale: [1, 1.05, 1],
    rotate: [0, 3, 0],
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative py-24 overflow-hidden  bg-gradient-to-r from-gray-900 to-gray-950">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-blue-200/40 blur-3xl"
          animate={blobAnimation}
        />

        {/* <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" /> */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-2xl"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white mb-8"
            >
              <span className="text-sm font-medium">
                1000+ matches analyzed today
              </span>
              <motion.button
                whileHover={{ scale: 1.05, x: 3 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 inline-flex items-center text-sm font-medium text-white hover:text-blue-200"
              >
                Join now
                <svg
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-gray-200 mb-6"
            >
              Transform Your{" "}
              <span className="text-blue-600 relative">
                Football Analysis
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1.5 bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </span>{" "}
              with AI
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-300 mb-8"
            >
              Speed up your match analysis with our advanced AI tools. Get
              instant insights, player tracking, and tactical analysis for a
              seamless, professional experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 mb-12"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 border-2 border-blue-500 hover:bg-blue-700 transition-all"
              >
                Get started now
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(31, 41, 55, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-xl bg-white text-blue-600 font-medium shadow-lg shadow-gray-200 border-2 border-blue-200 hover:bg-blue-50 transition-all"
              >
                Learn more
              </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 },
                  }}
                  className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-blue-100 text-center"
                >
                  <div className="text-blue-500 text-2xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative z-10"
          >
            <div className="relative">
              {/* Image Card with Glass Effect */}
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm p-1.5 shadow-2xl border border-white/50"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={metaverse}
                  alt="AI Analysis"
                  className="w-full h-auto rounded-xl shadow-inner"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/30 rounded-full z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full z-0"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -45, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating Stats Card */}
              <motion.div
                className="absolute -bottom-6 -left-6 md:left-auto md:-right-6 bg-white rounded-lg shadow-xl p-4 z-20"
                initial={{ opacity: 0, y: 20, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="text-sm font-semibold text-blue-600 mb-1">
                  Success Rate
                </div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-gray-900 mr-2">
                    98.7%
                  </div>
                  <div className="text-green-500 text-xs font-semibold flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    12.5%
                  </div>
                </div>
              </motion.div>

              {/* Tech Label */}
              <motion.div
                className="absolute top-4 right-4 bg-blue-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                AI POWERED
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
