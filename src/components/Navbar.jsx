import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home"); // Default active section
  const sectionRefs = useRef({}); // Object to hold refs for each section
  const navRef = useRef(null); // Ref for the entire navbar
  const indicatorRef = useRef(null); // Ref for the indicator element

  useEffect(() => {
    if (activeSection && sectionRefs.current[activeSection]) {
      const activeElement =
        sectionRefs.current[activeSection].getBoundingClientRect();
      const navElement = navRef.current.getBoundingClientRect();

      // Calculate position and size of the indicator
      const left = activeElement.left - navElement.left;
      const width = activeElement.width;

      // Animate the indicator
      gsap
        .timeline()
        .to(indicatorRef.current, {
          scaleX: 0.8, // Stretch during the slide
          duration: 0.1,
          ease: "elastic.out(0.5, 0.1)",
        })
        .to(indicatorRef.current, {
          x: left, // Slide to the new position
          width: `${width}px`, // Update width
          duration: 0.7,
          ease: "elastic.out(0.5, 0.1)",
        })
        .to(indicatorRef.current, {
          scaleX: 1, // Reset to normal after slide
          duration: 1,
          ease: "elastic.out(1, 0.1)",
        });
    }
  }, [activeSection]);

  return (
    <nav
      ref={navRef}
      className="bg-black border-2 border-white overflow-hidden flex items-center justify-center h-16 text-white z-50 fixed bottom-0 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-3xl shadow-md md:top-0 mb-2 mt-5"
    >
      <div className="relative w-full">
        {/* Sliding white background indicator */}
        <motion.div
          whileHover={{
            scale: 0.9,
            transition: {
              type: "spring",
              duration: 0.001,
              ease: "easeOut",
              damping: 1,
            },
          }} // Smooth hover scaling
          whileTap={{
            scale: 1.5,
            transition: { duration: 0.1 },
          }} // Subtle shrink on tap
          ref={indicatorRef}
          className="absolute hover:bg-white/50 top-0 -left-3 h-full bg-white rounded-xl z-0"
          style={{ width: "0", transform: "scaleX(1)" }}
        ></motion.div>

        <ul className="flex items-center justify-between md:space-x-5 relative z-10">
          {["home", "about", "projects", "contact"].map((section) => (
            <motion.li
              key={section}
              ref={(el) => (sectionRefs.current[section] = el)} // Assign refs dynamically
              className={`py-2 cursor-pointer relative z-10 ${
                activeSection === section ? "text-black" : "text-white"
              }`}
              whileHover={{
                scale: 0.9,
                transition: {
                  type: "spring",
                  duration: 0.001,
                  ease: "easeOut",
                  damping: 1,
                },
              }} // Smooth hover scaling
              whileTap={{
                scale: 1.5,
                transition: { duration: 0.1 },
                damping: 1,
              }} // Subtle shrink on tap
            >
              <Link
                to={section}
                smooth={true}
                duration={1500}
                className="font-[semibold] a text-sm md:text-base px-3 py-4 uppercase"
                onClick={() => setActiveSection(section)} // Update active section
              >
                {section}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
