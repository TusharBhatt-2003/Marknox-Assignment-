import React from "react";
import portfolioData from "../data/const.js";

const Footer = ({ name }) => {
  const { socialMedia } = portfolioData.personalInfo;

  return (
    <footer className="bg-black relative overflow-hidden border-8 border-black text-white pt-16 pb-28 rounded-3xl">
      {/* SVG Background */}
      <div
        className="absolute inset-0 overflow-hidden bg-contain"
        dangerouslySetInnerHTML={{ __html: portfolioData.svg }}
      ></div>
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(1, 1, 1, 1), rgba(0, 0, 0, 0.5))",
        }}
      ></div>
      {/* Content */}
      <div className="relative flex h-full flex-col gap-5 items-center">
        {/* Social Media Links */}
        <div className="flex gap-10 justify-center mb-5">
          {Object.entries(socialMedia).map(([key, { link, icon }]) => {
            if (!link || !icon) return null; // Only render if both link and icon are present

            return (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-90 transition-all ease-in-out"
                aria-label={key}
              >
                <div dangerouslySetInnerHTML={{ __html: icon }}></div>
              </a>
            );
          })}
        </div>
        <p>
          &copy; {new Date().getFullYear()} {name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
