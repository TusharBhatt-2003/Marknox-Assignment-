import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";

const Contact = ({ contactSection }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const sectionRef = useRef(null); // Ref for the section
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);

    try {
      const result = await emailjs.send(
        "service_0vgr7dj", // Replace with your EmailJS Service ID
        "template_45r7bsi", // Replace with your EmailJS Template ID
        formData,
        "OJPE3wzs60YGavN-E", // Replace with your EmailJS Public Key
      );

      if (result.text === "OK") {
        setResponseMessage(
          "Thank you for your message! I will get back to you soon.",
        );
        setFormData({});
      } else {
        setResponseMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
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

  // GSAP animation
  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 0, scale: 0 }, // Initial state
        { opacity: 1, y: 0, scale: 1, duration: 3, ease: "elastic(1, 0)" }, // Target state
      );
      gsap.fromTo(
        headingRef.current,
        { opacity: 1, y: -500, scale: 0 }, // Initial state
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" }, // Target state
      );
      gsap.fromTo(
        btnRef.current,
        { opacity: 1, y: 500, scale: 0 }, // Initial state
        { opacity: 1, y: 0, scale: 1, duration: 2, ease: "elastic(.5, 0)" }, // Target state
      );
      // Stagger animation for form fields
      gsap.fromTo(
        ".form-field", // Target all form fields with this class
        { opacity: 0, x: 100, scale: 0 }, // Start state
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "bounce(1)",
          stagger: 0.3, // Stagger by 0.2 seconds
          delay: 0.1, // Start after a slight delay
        },
      );
    }
  }, [isVisible]);

  return (
    <div className="py-20 h-screen flex justify-center items-center bg-white font-['font'] overflow-hidden border-8 rounded-3xl border-black">
      <div className="h-[80vh] flex flex-col justify-evenly mx-auto px-4 text-center">
        <h2
          className="text-4xl font-bold mb-6 font-['semibold']"
          ref={headingRef}
        >
          {contactSection.title}
        </h2>
        <p className="mb-6" ref={sectionRef}>
          {contactSection.message}
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {contactSection.formFields.map((field, index) => (
            <div key={index}>
              <label className="block font-['semibold'] form-field text-left mb-2 font-semibold">
                {field.label} :
              </label>
              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  name={field.name}
                  className="w-full form-field border-b border-black outline-none p-2 placeholder:text-zinc-300"
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  placeholder={field.placeholder}
                  type={field.type}
                  name={field.name}
                  className="w-full border-b form-field border-black outline-none p-2 placeholder:text-zinc-300"
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <button
            ref={btnRef}
            type="submit"
            className="bg-black text-white px-4 pb-3 py-2 rounded-lg font-['semibold'] hover:border-black border-2 hover:bg-white hover:text-black transition-colors duration-200 ease-in-out"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : contactSection.submitButton}
          </button>
        </form>
        {responseMessage && (
          <p
            className={`mt-4 ${
              responseMessage.includes("Thank you")
                ? "text-zinc-500"
                : "text-red-500"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
