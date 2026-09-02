"use client";
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TeamComponent from '@/components/teamCompo';
import software from "../../../public/Software.svg";
import ai from "../../../public/Ai.svg";
import pr from "../../../public/PR&Sponsors.svg";
import social from "../../../public/SocialMedia.svg";
import des from "../../../public/Design.svg";
import cc from "../../../public/CloudComputing.svg";

export default function TeamsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const teams = [
    { 
      component: <TeamComponent path={software.src} name="Software Development" description="Building innovative software solutions" style="primary" href="/teams/software_dev" />, 
      delay: 0.2
    },
    { 
      component: <TeamComponent path={ai.src} name="AI Development" description="Pioneering artificial intelligence" style="secondary" href="/teams/ai_dev" />, 
      delay: 0.4
    },
    { 
      component: <TeamComponent path={cc.src} name="Cloud Computing" description="Mastering cloud technologies" style="primary" href="/teams/cloud" />, 
      delay: 0.6
    },
    { 
      component: <TeamComponent path={des.src} name="Design" description="Creating beautiful experiences" style="secondary" href="/teams/design" />, 
      delay: 0.8
    },
    { 
      component: <TeamComponent path={social.src} name="Sponsors" description="Securing sponsorships and building partnerships." style="primary" href="/teams/social_media" />, 
      delay: 1.0
    },
    { 
      component: <TeamComponent path={pr.src} name="PR & Social Media" description="Building partnerships" style="secondary" href="/teams/pr_sponsors" />, 
      delay: 1.2
    }
  ];

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
      {/* Hero Section with Sliding Animation */}
      <motion.div 
        className="text-center mb-16 sm:mb-24"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="inline-block relative"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
            <span className="bg-gradient-to-r from-[#843aed] via-[#4349ff] to-[#843aed] bg-clip-text text-transparent bg-300% animate-gradient">
              Our Teams
            </span>
          </h1>
        </motion.div>
        
        <motion.div
          className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#843aed] to-transparent mx-auto"
          initial={{ width: 0 }}
          animate={isInView ? { width: "200px" } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Responsive Teams Grid */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-7xl mx-auto">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ 
                opacity: 0, 
                rotateY: -90,
                z: -100
              }}
              animate={isInView ? { 
                opacity: 1, 
                rotateY: 0,
                z: 0
              } : { 
                opacity: 0, 
                rotateY: -90,
                z: -100
              }}
              transition={{ 
                duration: 0.8, 
                delay: team.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 }
              }}
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Glowing Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#843aed]/20 to-[#4349ff]/20 rounded-2xl blur-xl"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: team.delay + 0.2 }}
              />
              
              {/* Team Component with Enhanced Styling */}
              <div className="relative z-10 transform transition-all duration-300 hover:translate-y-[-10px]">
                {team.component}
              </div>
              
              {/* Floating Accent Elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-[#843aed] to-[#4349ff] rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: team.delay
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="inline-flex items-center space-x-4 text-gray-400"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent to-[#843aed] w-16"
            initial={{ width: 0 }}
            animate={isInView ? { width: "4rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          />
          <span className="text-sm font-medium">Join Our Community</span>
          <motion.div 
            className="h-px bg-gradient-to-l from-transparent to-[#4349ff] w-16"
            initial={{ width: 0 }}
            animate={isInView ? { width: "4rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};