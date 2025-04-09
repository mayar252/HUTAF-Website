import { motion } from "framer-motion";
// Import the images
import dadsfa from "../assets/ai-referee-with-futuristic-helmet-holds-soccer-ball_856795-83087-removebg-preview.png";
import aiRefereeHelmet from "../assets/WhatsApp-Image-2024-07-24-at-15.46.22_149ae724-1024x585.jpg";
import aiImage from "../assets/ai.jpg";
import refereeImage from "../assets/dha-ai-sports-blog.png";

const PopularCourses = () => {
  const categories = [
    "BUSINESS",
    "DESIGN",
    "DEVELOPMENT",
    "MANAGEMENT",
    "TECHNOLOGY",
    "PHOTO",
  ];

  const courses = [
    {
      title: "Master Web Design",
      image: aiRefereeHelmet, // Use the imported image
      stats: {
        likes: "4.2k",
        views: "15.6k",
        duration: "6h 30min",
      },
    },
    {
      title: "Web Development",
      image: aiImage, // Use the imported image
      stats: {
        likes: "3.8k",
        views: "12.3k",
        duration: "8h 15min",
      },
    },
    {
      title: "Master App Design",
      image: refereeImage, // Use the imported image
      stats: {
        likes: "3.9k",
        views: "14.2k",
        duration: "7h 45min",
      },
    },
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
    <section className="relative py-24 overflow-hidden bg-gradient-to-r from-gray-900 to-gray-950">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-25 right-0 w-[20rem] h-[20rem] rounded-full bg-blue-200/10 blur-3xl"
          animate={blobAnimation}
        />
        <motion.div
          className="absolute bottom-25 left-0 w-[25rem] h-[25rem] rounded-full bg-blue-300/10 blur-3xl"
          animate={{
            ...blobAnimation,
            rotate: [0, -3, 0],
          }}
        />
        {/* <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" /> */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { value: "30,000+", label: "Matches Analyzed", icon: "🏟️" },
            { value: "200,000+", label: "Players", icon: "👥" },
            { value: "6,000+", label: "Expert Analysis", icon: "📊" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 text-center"
            >
              <motion.div
                className="text-3xl text-blue-500 mb-3"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: { duration: 2, repeat: Infinity },
                }}
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Popular Courses Section */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
              Advanced Tools
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-200 mb-6"
          >
            Our Popular{" "}
            <span className="text-blue-600 relative inline-block">
              Analysis Tools
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
            className="max-w-3xl mx-auto text-gray-300 text-lg mb-10"
          >
            Explore our comprehensive suite of football analysis tools designed
            to provide insights, track performance, and enhance your team's
            strategic advantage.
          </motion.p>

          {/* Categories */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + 0.05 * index }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(219, 234, 254, 0.9)",
                  color: "#2563eb",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 bg-white shadow-sm border border-blue-100 hover:border-blue-300 transition-all"
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-blue-100"
            >
              <div className="relative h-56 overflow-hidden">
                {/* Overlay for image */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent z-10" />

                <motion.img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Badge */}
                <motion.div
                  className="absolute top-4 left-4 z-20 bg-blue-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + 0.1 * index, duration: 0.6 }}
                >
                  FEATURED
                </motion.div>

                {/* Price tag */}
                <motion.div
                  className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + 0.1 * index, duration: 0.6 }}
                >
                  <div className="text-sm font-bold text-blue-600">Premium</div>
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h3>

                <div className="flex items-center mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 text-xs font-bold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="ml-2 text-sm text-gray-500">+12 users</div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {course.stats.views}
                  </div>
                  <div className="flex items-center gap-2 text-rose-500">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    {course.stats.likes}
                  </div>
                  <div className="flex items-center gap-2 text-amber-500">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {course.stats.duration}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 border border-blue-500 hover:bg-blue-700 transition-all"
                >
                  Explore Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(96, 165, 250, 0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl bg-white text-blue-600 font-medium shadow-lg border-2 border-blue-200 hover:bg-blue-50 transition-all"
          >
            View All Tools
            <span className="ml-2">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCourses;
