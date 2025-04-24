import { motion } from "framer-motion";

const FeatureSectionTwo = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-primary-100 to-primary-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Player Performance Tracking
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor and analyze individual player performance with our
            comprehensive tracking system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* First Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/src/assets/ai.jpg"
                alt="Player Statistics"
                className="w-full h-auto"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 bg-secondary-200 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Second Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/src/assets/ai-referee-with-futuristic-helmet-holds-soccer-ball_856795-83087-removebg-preview.png"
                alt="Performance Metrics"
                className="w-full h-auto"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-secondary-900/50 to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-200 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Explore Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSectionTwo;
