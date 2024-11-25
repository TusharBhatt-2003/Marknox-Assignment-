import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = ({ projects, sectionBackground }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]); // Set the first project as default
  const sectionRef = useRef(null); // Ref for the section
  const titleRef = useRef(null); // Ref for the title
  const projectCardsRef = useRef([]); // Ref for project cards
  const projectViewRef = useRef(null); // Ref for the selected project view

  useEffect(() => {
    // Animate the section when it enters the viewport
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current, // Trigger animation when section enters viewport
          start: "top 80%", // Animation starts when the top of the section is 80% from the top of the viewport
        },
      },
    );

    // Animate the title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -500, scale: 0 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      },
    );

    // Animate project cards
    gsap.fromTo(
      projectCardsRef.current,
      { opacity: 0, y: 500, scale: 0 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      },
    );
  }, []);

  useEffect(() => {
    if (selectedProject && projectViewRef.current) {
      // Scale up animation for the project view
      gsap.fromTo(
        projectViewRef.current,
        { opacity: 1, scale: 0.1 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
      );
    }
  }, [selectedProject]); // Trigger animation whenever the selected project changes

  const handleProjectSelect = (project) => {
    setSelectedProject(project); // Set the selected project when a title is clicked
  };

  return (
    <div
      ref={sectionRef}
      className="px-4 h-screen bg-black flex gap-10 flex-col justify-center items-center"
    >
      <h2
        ref={titleRef}
        className="text-4xl font-bold py-10 text-center text-white drop-shadow-2xl font-['semibold']"
      >
        Projects
      </h2>
      <div className="flex w-full flex-col-reverse md:flex-row justify-around items-center">
        {/* Project List */}
        <div className="flex flex-wrap mt-10 lg-mt-0 md:flex-col justify-center overflow-scroll items-center h-fit w-[75vw] md:w-fit border-x md:border-y md:border-x-0  gap-2  px-2 md:pl-0 md:pr-0 py-3 my-10 mb-5">
          {projects.map((project, index) => (
            <motion.div
              onClick={() => handleProjectSelect(project)} // Handle project title click
              whileHover={{
                scale: 0.9,
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
              key={index}
              ref={(el) => (projectCardsRef.current[index] = el)} // Add each card to the ref array
              className={`border-2 w-fit project-btn text-xs font-bold font-['semibold'] select-none text-center md:w-full inline-block rounded-lg p-2 shadow hover:border-black cursor-pointer  ${
                selectedProject?.title === project.title
                  ? "bg-white text-black" // Invert colors for selected project
                  : "text-white"
              }`}
            >
              {project.title}
            </motion.div>
          ))}
        </div>

        {/* Selected Project View */}
        {selectedProject && (
          <div
            ref={projectViewRef}
            className="bg-black bg-opacity-50 w-[70vw] md:w-1/3 flex justify-center items-center"
          >
            <div
              className="p-2 rounded-lg h-fit w-[75%]"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <div className="mb-4">
                {/* Check if project.backgroundImage is defined and valid */}
                {typeof selectedProject.backgroundImage === "string" ? (
                  selectedProject.backgroundImage.endsWith(".mp4") ? (
                    <video
                      className="rounded-xl mb-4 h-52 w-full object-cover border-4 border-white"
                      autoPlay
                      loop
                      muted
                    >
                      <source
                        src={selectedProject.backgroundImage}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={selectedProject.backgroundImage}
                      alt={selectedProject.title}
                      className="rounded-xl mb-4 h-52 w-full object-cover border-4 border-white"
                    />
                  )
                ) : (
                  <div className="rounded-md mb-4 h-40 w-full bg-gray-300 flex items-center justify-center text-gray-500">
                    No Media Available
                  </div>
                )}
              </div>
              <p className="text-sm text-white mb-4">
                {selectedProject.description}
              </p>
              <div className="flex space-x-4 mt-4">
                <a
                  href={selectedProject.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 px-2 py-1 rounded-lg hover:bg-white hover:text-black hover:scale-75 transition-all ease-in-out"
                >
                  Live Demo
                </a>
                <a
                  href={selectedProject.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 px-2 py-1 rounded-lg hover:bg-white hover:text-black hover:scale-75 transition-all ease-in-out"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
