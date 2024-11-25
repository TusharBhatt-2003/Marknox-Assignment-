import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import portfolioData from "../data/const";

const TechStack = () => {
  const iconsRef = useRef(); // Reference to the icons container
  const animationRef = useRef(); // Reference to the GSAP animation instance
  // Handlers for pausing and resuming the animation
  const handleMouseEnter = () => {
    animationRef.current?.pause();
  };

  const handleMouseLeave = () => {
    animationRef.current?.resume();
  };
  useEffect(() => {
    if (!iconsRef.current) return;

    const container = iconsRef.current;
    const icons = [...container.children];

    // Duplicate the icons to create loop
    icons.forEach((icon) => {
      const clone = icon.cloneNode(true);
      container.appendChild(clone);
    });

    // Animate the container
    animationRef.current = gsap.to(container, {
      xPercent: -50, // Move by half the width (original + duplicated)
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    return () => {
      animationRef.current.kill(); // Clean up the animation on unmount
    };
  }, []);

  return (
    <div className="grid bg-white place-content-center border-8 rounded-t-xl border-black h-[30vh] overflow-hidden">
      <h1 className="font-['semibold'] text-4xl text-center mb-2">
        Tech Stack
      </h1>
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          ref={iconsRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex space-x-10"
        >
          {portfolioData.resume.skills
            .filter((tech) => tech.icon !== "")
            .map((tech, index) => (
              <div
                key={index}
                className="flex justify-center items-center"
                aria-label={tech.name}
              >
                <div dangerouslySetInnerHTML={{ __html: tech.icon }} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
