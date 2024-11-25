import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loader = () => {
  const lettersRef = useRef([]); // Reference for each letter

  useEffect(() => {
    if (lettersRef.current.length > 0) {
      // GSAP animation
      gsap.fromTo(
        lettersRef.current,
        { x: 200, opacity: 1, scale: 0 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2, // Delay between each animation
          ease: "elastic(2, 1)",
          repeat: -1, // Loop the animation
          yoyo: true, // Reverse animation on repeat
        },
      );
    }
  }, []);

  const letters = ["T", "U", "S", "H", "A", "R"]; // Array of characters

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50">
      <div className="flex space-x-2 text-white text-6xl font-['extrabold'] font-bold">
        {letters.map((letter, index) => (
          <span
            key={index}
            ref={(el) => (lettersRef.current[index] = el)} // Save reference
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
