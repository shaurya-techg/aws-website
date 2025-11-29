'use client';
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  link: string;
  tag?: string | null;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  time,
  location,
  image,
  link,
  tag
}) => {
  return (
    <a href={link} target="_blank">
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="relative max-w-sm rounded-2xl overflow-hidden
                 bg-gradient-to-b from-[#0A001A] via-[#110024] to-[#0A001A]
                 border border-[#6C3DD1]/30 hover:border-[#8B5CF6]/50 
                 shadow-[0_0_20px_rgba(140,82,255,0.2)] hover:shadow-[0_0_30px_rgba(140,82,255,0.4)] 
                 cursor-pointer backdrop-blur-md transition-all duration-100"
      
    >
      {/* Event Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={192}
          className="w-full h-full object-cover transition-transform duration-100 hover:scale-105"
        />
        {/* Tag positioned on top right of image */}
        {tag && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gradient-to-r from-[#843aed] to-[#4349ff] text-white rounded-full shadow-lg backdrop-blur-sm">
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-5 flex flex-col justify-between text-white">
        <h3 className="text-lg sm:text-xl font-bold text-[#A7B4FF] leading-snug mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Event details */}
        <div className="flex flex-col gap-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            {/* Calendar icon (inline SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
                   00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>
              {date} {time}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Location icon (inline SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 
                   1.343-3 3 1.343 3 3 3zm0 0c-4.418 0-8 
                   1.79-8 4v3h16v-3c0-2.21-3.582-4-8-4z"
              />
            </svg>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </motion.div>
    </a>
  );
};

export default EventCard;