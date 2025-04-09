import React from "react";
import { Link } from "react-router-dom";
import { motion } from "../components/FixFramerMotion";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import FeatureCardsSection from "../components/FeatureCardsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import PopularCourses from "../components/PopularCourses";
import CallToAction from "../components/CallToAction";

const Home = () => {
  // Feature cards for the main technologies
  const featuredTech = [
    {
      title: "Virtual Referee",
      description:
        "Advanced AI-powered match analysis that acts as your virtual referee, providing real-time decisions and insights.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      link: "/virtual-referee",
    },
    {
      title: "Virtual Fan",
      description:
        "Revolutionary technology that transforms how fans experience football matches from anywhere in the world.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      link: "/virtual-fan",
    },
    {
      title: "Guess The Winner",
      description:
        "Think you can predict the outcome of the match? Guess the winner before the final whistle and win exciting prizes! Compete with fans and show off your football knowledge.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      link: "/ghost-seats",
    },
    {
      title: "Analysis & Prediction",
      description:
        "Advanced AI-powered football analysis and prediction tools for unprecedented insights into match outcomes.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      link: "/analysis",
    },
  ];

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
    <>
      <HeroSection />
      <StatsSection />

      {/* Featured Technologies Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-950">
        {/* <motion.div
          className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-blue-300/30 blur-3xl"
          animate={{
            ...blobAnimation,
            rotate: [0, -3, 0],
          }}
        /> */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-6">
              Our Football Technologies
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Revolutionary solutions that are changing how football is
              officiated, watched, and analyzed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTech.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col h-full"
              >
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center text-blue-600 mb-5">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-700 mb-6 flex-grow">
                  {tech.description}
                </p>
                <Link
                  to={tech.link}
                  className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Learn more
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureCardsSection />
      <WhyChooseUs />
      <PopularCourses />
      <CallToAction />
    </>
  );
};

export default Home;
