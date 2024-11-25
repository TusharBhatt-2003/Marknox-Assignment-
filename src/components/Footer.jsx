import React from "react";
import portfolioData from "../data/const.js";

const Footer = ({ name, footerBG }) => {
  const { socialMedia } = portfolioData.personalInfo;

  return (
    <footer className="bg-white">
      <div
        className=" h-[50vh] text-white pt-16 pb-28 rounded-t-3xl "
        style={{
          backgroundImage: `url(${footerBG})`, // Background image for the whole section
          backgroundSize: "cover",
          backgroundPosition: "",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex h-full flex-col justify-evenly items-center">
          {/* Social Media Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-center mb-5">
            {Object.entries(socialMedia).map(([key, { link, icon }]) => {
              // Only render if both link and icon are present
              if (!link || !icon) return null;

              return (
                <a
                  key={key}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-90 transition-all ease-in-out"
                  aria-label={key}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: icon }}
                    className=""
                  ></div>
                </a>
              );
            })}
          </div>
          <p>
            &copy; {new Date().getFullYear()} {name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;