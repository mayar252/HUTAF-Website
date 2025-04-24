import { motion } from "framer-motion";
import businessWoman from "../assets/ai-match-1.jpeg";
import efficiency from "../assets/ai-match-4.jpeg";
import virtualFan from "../assets/ai-match-3.jpeg";

const WhyChooseUs = () => {
  // Animation for floating elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut",
    },
  };

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
    <section className="relative py-24 overflow-hidden bg-gradient-to-r from-gray-900 to-gray-950">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 right-0 w-[40rem] h-[40rem] rounded-full  blur-3xl"
          animate={blobAnimation}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full  blur-3xl"
          animate={{
            ...blobAnimation,
            rotate: [0, -3, 0],
          }}
        />
        {/* <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" /> */}
      </div>

      {/* Main Title Section */}
      <div className="container mx-auto px-4 mb-20 text-center relative z-10">
        <motion.div
          className="inline-block mb-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
            Why Choose Us
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-200"
        >
          Why Should Organizations Use Our{" "}
          <span className="text-blue-600 relative inline-block">
            Football Analysis?
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-1.5 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-gray-300 text-lg"
        >
          As a football organization or team, you understand the importance of
          thorough analysis to ensure optimal performance and strategy. Here are
          a few reasons why it can be beneficial to have our advanced AI
          analysis system.
        </motion.p>
      </div>

      {/* Objectivity Section */}
      <div className="container mx-auto px-4 mb-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative mx-auto max-w-md">
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-5 -left-5 w-24 h-24 bg-blue-400/20 rounded-full z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                  transition: { duration: 6, repeat: Infinity },
                }}
              />
              <motion.div
                className="absolute -bottom-5 -right-5 w-32 h-32 bg-blue-500/20 rounded-full z-0"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -45, 0],
                  transition: { duration: 8, repeat: Infinity },
                }}
              />

              {/* Image with glass effect */}
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm p-1.5 shadow-2xl border border-white/50 z-10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                animate={floatingAnimation}
              >
                <img
                  src={virtualFan}
                  alt="Business professional"
                  className="rounded-xl w-full max-w-md mx-auto"
                />

                {/* Badge */}
                <motion.div
                  className="absolute top-4 left-4 bg-blue-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  OBJECTIVE ANALYSIS
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <motion.div
              className="inline-block mb-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 font-medium text-sm">
                01. Objective Analysis
              </span>
            </motion.div>

            <motion.h3
              className="text-3xl font-bold mb-4 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Objectivity
            </motion.h3>

            <motion.p
              className="text-gray-300 mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              When analysis is conducted by AI, there is no risk of bias or
              subjective interpretation. By leveraging our AI system, you can
              ensure that the analysis is conducted with complete objectivity
              and impartiality.
            </motion.p>

            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                "Build trust with players and coaches",
                "Prevent disputes over performance",
                "Consistent evaluation metrics",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-blue-500 mr-3 mt-1">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-300">{item}</div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              className="mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 border border-blue-500 hover:bg-blue-700 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Learn about Objectivity
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="container mx-auto px-4 mb-24 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <motion.div
              className="inline-block mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 font-medium text-sm">
                02. Specialized Knowledge
              </span>
            </motion.div>

            <motion.h3
              className="text-3xl font-bold mb-4 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Expertise
            </motion.h3>

            <motion.p
              className="text-gray-300 mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our AI system brings specialized expertise in football analysis,
              covering a range of skills and knowledge, including player
              movement analysis, tactical patterns, and performance metrics.
            </motion.p>

            <motion.div
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="text-blue-500 text-xl">📈</div>
                <div className="text-lg font-semibold text-gray-900">
                  Data-Driven Insights
                </div>
              </div>
              <p className="text-gray-700">
                Our system analyzes thousands of data points per match to
                provide insights that would take human analysts weeks to
                compile.
              </p>
            </motion.div>

            <motion.button
              className="px-6 py-3 rounded-xl bg-white text-blue-600 font-medium shadow-lg shadow-gray-200 border-2 border-blue-200 hover:bg-blue-50 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(96, 165, 250, 0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore Our Expertise
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative mx-auto max-w-md">
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-5 -right-5 w-28 h-28 bg-blue-400/20 rounded-full z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -30, 0],
                  transition: { duration: 7, repeat: Infinity },
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full z-0"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 30, 0],
                  transition: { duration: 8, repeat: Infinity },
                }}
              />

              {/* Image with glass effect */}
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm p-1.5 shadow-2xl border border-white/50 z-10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                animate={{
                  ...floatingAnimation,
                  y: [0, -10, 0],
                }}
              >
                <img
                  src={businessWoman}
                  alt="Expertise illustration"
                  className="rounded-xl w-full max-w-md mx-auto"
                />

                {/* Stats floating on the image */}
                <motion.div
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-sm font-semibold text-blue-600">
                    Advanced metrics
                  </div>
                  <div className="text-2xl font-bold text-gray-900">250+</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Efficiency Section */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative mx-auto max-w-md">
              {/* Decorative elements */}
              <motion.div
                className="absolute top-1/4 -left-6 w-20 h-20 bg-blue-400/20 rounded-full z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, -10, 0],
                  transition: { duration: 5, repeat: Infinity },
                }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-6 w-20 h-20 bg-blue-500/20 rounded-full z-0"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, 10, 0],
                  transition: { duration: 6, repeat: Infinity },
                }}
              />

              {/* Image with glass effect */}
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm p-1.5 shadow-2xl border border-white/50 z-10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                animate={floatingAnimation}
              >
                <img
                  src={efficiency}
                  alt="Efficiency illustration"
                  className="rounded-xl w-full max-w-md mx-auto"
                />

                {/* Team members floating on the image */}
                <div className="absolute right-3 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col gap-3">
                    {[0, 1, 2, 3].map((_, index) => (
                      <motion.div
                        key={index}
                        className="w-10 h-10 rounded-full bg-white shadow-lg border-2 border-blue-100 overflow-hidden"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                          {index + 1}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <motion.div
              className="inline-block mb-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 font-medium text-sm">
                03. Time-Saving
              </span>
            </motion.div>

            <motion.h3
              className="text-3xl font-bold mb-4 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Efficiency
            </motion.h3>

            <motion.p
              className="text-gray-300 mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Analysis can be a time-consuming process, particularly if you rely
              solely on human analysts. By bringing in our AI system, you can
              ensure that the analysis is completed efficiently and effectively,
              without putting undue strain on your internal resources.
            </motion.p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Time Saved", value: "80%", icon: "⏱️" },
                { label: "Analysis Speed", value: "Real-time", icon: "⚡" },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border border-blue-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-blue-500 text-xl mb-1">
                    {metric.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-500">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 border border-blue-500 hover:bg-blue-700 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
              </motion.button>
              <a
                href="#"
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Learn more →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
