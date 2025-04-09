// App.jsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import StatsSection from "./components/StatsSection";
import PopularCourses from "./components/PopularCourses";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import FeatureCardsSection from "./components/FeatureCardsSection";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <HeroSection />
        <StatsSection />
        <FeatureCardsSection />
        <WhyChooseUs />
        <PopularCourses />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
