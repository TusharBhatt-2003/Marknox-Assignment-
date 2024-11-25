import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
const Home = ({ tagline, about, background }) => {
  const initialAnimationRef = useRef(null);
  const btnRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Initial animation on page load for both sections
    gsap.fromTo(
      [initialAnimationRef.current],
      { opacity: 1, y: 0, scale: 0.3 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2,
        ease: "back.out(1.7)",
        stagger: 0.3, // Stagger the animation between the two elements
      },
    );
    gsap.fromTo(
      [btnRef.current],
      { opacity: 1, y: 500, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2,
        ease: "elastic(.5, 0.1)",
        stagger: 0.3, // Stagger the animation between the two elements
      },
    );
    gsap.fromTo(
      [imgRef.current],
      { opacity: 1, y: 0, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2,
        ease: "elastic(.5, 0.1)",
        stagger: 0.3, // Stagger the animation between the two elements
      },
    );
  }, []); // This runs only once, when the component mounts

  return (
    <div className="h-screen bg-white flex flex-col lg:flex-row justify-center border-8 rounded-3xl border-black overflow-hidden ">
      <div
        className="w-full h-screen lg:w-1/2 flex flex-col items-center justify-center"
        ref={initialAnimationRef}
      >
        <div
          className="w-full h-[30vh] md:h-[40vh] lg:hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-bold font-['semibold']">Hey There</h1>
          <h1 className="text-4xl font-bold font-['extrabold']">
            I am, Tushar
          </h1>
          <h1 className="mt-4 text-lg font-['font']">{tagline}</h1>
        </div>
        <motion.div
          ref={btnRef}
          className=" my-10 motion-btn font-[semibold] text-black border-2 border-black rounded-xl px-4 select-none py-4 uppercase hover:text-white hover:border-white"
          whileHover={{
            scale: 1.2,
            transition: {
              type: "spring",
              duration: 0.001,
              ease: "easeOut",
              damping: "5",
            },
          }} // Smooth hover scaling
          whileTap={{
            scale: 0.5,
            transition: { duration: 0.1 },
            damping: "1",
          }}
        >
          <Link to="projects" smooth={true} duration={2000} className="">
            See My Projects
          </Link>
        </motion.div>
      </div>
      <div className="w-1/2 hidden lg:block">
        <div
          ref={imgRef}
          className="md:w-1/2 hidden lg:block h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
      </div>
    </div>
  );
};

export default Home;
