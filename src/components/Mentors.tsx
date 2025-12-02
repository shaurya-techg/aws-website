import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Mentor {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  designation?: string; // <-- added
}

const mentors: Mentor[] = [
  {
    name: "Dr. Manoj Kumar",
    title: "Mentor",
    image: "/MrManoj.svg",
    linkedin: "",
    designation: "Assistant Professor (USAR-GGSIPU EDC)" // <-- added
  },
  {
    name: "Dr. Rahul Johari",
    title: "Mentor",
    image: "/MrRahuJohari.svg",
    linkedin: "",
    designation: "Associate Professor (USAR-GGSIPU EDC)" // <-- added
  }
];

export default function Mentors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="w-full border-y-[1px] border-gray-300 max-w-7xl mx-auto my-8 sm:my-12 lg:my-16 p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#180235] to-[#030012] rounded-lg"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent mb-12">
        Our Mentors
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20 justify-center items-start">
        {mentors.map((mentor, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center rounded-xl p-6 sm:p-8 shadow-md w-full max-w-md mx-auto hover:scale-105 transition-transform duration-150"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.9, y: 40 }
            }
            transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
          >
            <div className="w-full aspect-square mb-6 overflow-hidden">
              <Image
                src={mentor.image}
                alt={mentor.name}
                width={300}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col items-center bg-gradient-to-b from-[#8444E8] to-[#4349FF] p-4 rounded-lg transition-all duration-150">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 text-center">
                {mentor.name}
              </h3>

              {/* NEW: Designation text */}
              {mentor.designation && (
                <p className="text-white text-sm sm:text-base opacity-80 text-center mb-2">
                  {mentor.designation}
                </p>
              )}

              {mentor.linkedin && (
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#843aed] hover:text-[#4349ff] transition-colors duration-100 mt-1"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
