import { motion } from "framer-motion";

const CreativeAnalysisSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary-300/20 -top-48 -left-48"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-secondary-300/20 -bottom-32 -right-32"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-primary-400/20 top-1/2 left-1/2"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-primary-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Advanced Football Analysis
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the future of football analysis with our cutting-edge
              technology. Get real-time insights, player tracking, and tactical
              analysis that transform how you understand the beautiful game.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
              >
                Learn More
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
              >
                Try Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image with Creative Elements */}
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
                src="/src/assets/ai.jpg"
                alt="Football Analysis"
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

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-primary-300 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-300 rounded-full opacity-20"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -45, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CreativeAnalysisSection;
