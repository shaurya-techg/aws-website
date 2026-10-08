"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TeamComponent from './teamCompo';
import software from "../../public/Software.svg";
import ai from "../../public/Ai.svg";
import pr from "../../public/PR&Sponsors.svg";
import social from "../../public/SocialMedia.svg";
import des from "../../public/Design.svg";
import cc from "../../public/CloudComputing.svg";

const teams = [
  { path: software.src, name: "Software Development", description: "Build innovative software solutions.", style: "primary" as const, href: "/teams/software_dev" },
  { path: ai.src, name: "AI Development", description: "Dive into the future with AI.", style: "secondary" as const, href: "/teams/ai_dev" },
  { path: cc.src, name: "Cloud Computing", description: "Learn cloud infrastructure & services.", style: "primary" as const, href: "/teams/cloud" },
  { path: des.src, name: "Design", description: "Unleash your creativity in design.", style: "secondary" as const, href: "/teams/design" },
  { path: social.src, name: "Sponsors", description: "Build partnerships & sponsorships.", style: "primary" as const, href: "/teams/social_media" },
  { path: pr.src, name: "PR & Social Media", description: "Build relationships & outreach.", style: "secondary" as const, href: "/teams/pr_sponsors" },
];

const Teams = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 relative">
      {/* Subtle background gradient shift */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
            Our{' '}
            <span className="bg-gradient-to-r from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
              Teams
            </span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#843aed] to-[#4349ff] rounded-full" />
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.15 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <TeamComponent {...team} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
