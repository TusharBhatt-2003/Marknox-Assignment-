import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioData from "../data/const";

gsap.registerPlugin(ScrollTrigger);

const About = ({ about, sectionBackground }) => {
  const sectionRef = useRef(null); // Reference to the whole section
  const headingRef = useRef(null); // Reference to the heading
  const textRef = useRef(null); // Reference to the paragraph
  const pictureRef = useRef(null); // Reference to the picture
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  useEffect(() => {
    // Intersection Observer to track visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }, // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Run animations only when section becomes visible
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: -500, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(.1, 0.1)",
          },
        );
      }
      if (pictureRef.current) {
        gsap.fromTo(
          pictureRef.current,
          { opacity: 0, x: 0, scale: 0.5 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(2, 0.5)",
          },
        );
      }
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 500, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(.5, 0.5)",
          },
        );
      }
    }
  }, [isVisible]); // Re-run animations when the section becomes visible

  return (
    <div
      ref={sectionRef} // Attach the ref to the section
      className="h-screen bg-white flex flex-col justify-evenly items-center py-20 overflow-hidden border-8 rounded-3xl border-black"
    >
      <h2
        ref={headingRef} // Attach ref to heading
        className="text-4xl font-bold mb-6 font-['semibold']"
      >
        About Me
      </h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex md:w-1/2 md:h-full justify-center items-center">
          <img
            ref={pictureRef} // Attach ref to image
            alt="Profile Picture"
            src={portfolioData.personalInfo.profile}
            className="w-1/2 rounded-3xl"
          />
        </div>
        <div className="flex bg-slate-500 md:w-1/2 items-start">
          <p
            ref={textRef} // Attach ref to paragraph
            className="md:w-[90%] lg:w-[70%] text-left font-['font'] p-5"
          >
            {about}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
