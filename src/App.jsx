import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import portfolioData from "./data/const.js";

// Import components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import TechStack from "./components/TechStack.jsx";

function App() {
  const {
    personalInfo,
    projects,
    contactSection,
    backgrounds,
    sectionBackground,
    footerBG,
  } = portfolioData;

  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after content has loaded
    }, 2000); // Adjust this duration as needed

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="font-sans">
      {/* Show loader while loading */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar name={personalInfo.name} />
          <Element name="home">
            <Home
              tagline={personalInfo.tagline}
              about={personalInfo.about}
              background={backgrounds.default}
            />
          </Element>
          <Element name="about">
            <About about={personalInfo.about} />
          </Element>
          <Element>
            <TechStack />
          </Element>
          <Element name="projects">
            <Projects
              projects={projects}
              sectionBackground={sectionBackground}
            />
          </Element>
          <Element name="contact">
            <Contact contactSection={contactSection} />
          </Element>
          <Footer name={personalInfo.name} footerBG={footerBG} />
        </>
      )}
    </div>
  );
}

export default App;
