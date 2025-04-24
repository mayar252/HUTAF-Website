// components/FeaturesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Eye, Users, Ghost, BarChart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Virtual Referee",
      arabicTitle: "الحكم الافتراضي",
      description:
        "AI-powered referee assistance that analyzes plays in real-time, detecting fouls and making accurate calls with computer vision technology.",
      icon: <Eye size={28} />,
    },
    {
      title: "Virtual Fan",
      arabicTitle: "المشجع الافتراضي",
      description:
        "Create a personalized AI fan experience that analyzes your team preferences and provides tailored insights and commentary during games.",
      icon: <Users size={28} />,
    },
    {
      title: "Guess The Winner",
      arabicTitle: "توقع الفائز",
      description:
        "Experience matches from any perspective in the stadium with virtual viewing positions, giving you the best seat in the house every time.",
      icon: <Ghost size={28} />,
    },
    {
      title: "Analytics, Predictions & Interactive Games",
      arabicTitle: "تحليلات وتنبؤ بالنتايج وألعاب تفاعليه بين المشجعين",
      description:
        "Deep statistical analysis, predictive modeling for match outcomes, and interactive games that connect fans worldwide.",
      icon: <BarChart size={28} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="features"
      className="section bg-gradient-to-b from-gray-50 to-primary-50 relative overflow-hidden"
    >
      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-primary-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-secondary-200 rounded-full opacity-20 blur-3xl" />
      </motion.div>

      <div className="container relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            variants={titleVariants}
          >
            Revolutionizing Football Analysis
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600"
            variants={titleVariants}
          >
            Our AI-powered tools bring new dimensions to how you experience,
            analyze, and enjoy football matches.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              title={feature.title}
              arabicTitle={feature.arabicTitle}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
