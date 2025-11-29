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

const Teams = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <div ref={ref} className="mt-8 sm:mt-12 lg:mt-16 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg relative overflow-hidden">
    {/* Animated top-left border: half width and half height */}
    <motion.div
      className="absolute top-0 left-0 h-1 bg-[#4677FF] rounded-tl-lg"
      initial={{ width: 0 }}
      animate={isInView ? { width: '50%' } : { width: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
      style={{zIndex: 20}}
    />
    <motion.div
      className="absolute top-0 left-0 w-1 bg-[#4677FF] rounded-tl-lg"
      initial={{ height: 0 }}
      animate={isInView ? { height: '50%' } : { height: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
      style={{zIndex: 20}}
    />
    {/* Animated bottom-right border: half width and half height */}
    <motion.div
      className="absolute bottom-0 right-0 h-1 bg-[#B346F5] rounded-br-lg"
      initial={{ width: 0 }}
      animate={isInView ? { width: '50%' } : { width: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
      style={{zIndex: 20}}
    />
    <motion.div
      className="absolute bottom-0 right-0 w-1 bg-[#B346F5] rounded-br-lg"
      initial={{ height: 0 }}
      animate={isInView ? { height: '50%' } : { height: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
      style={{zIndex: 20}}
    />
      {/* Animated background line that expands */}
      <motion.div 
        className="absolute inset-0 rounded-lg"
        initial={{ scaleX: 0, height: "2px", top: "50%" }}
        animate={isInView ? { 
          scaleX: 1,
          height: "100%", 
          top: "0%" 
        } : { scaleX: 0, height: "2px", top: "50%" }}
        transition={{ 
          duration: 0.7, 
          ease: "easeInOut",
          scaleX: { duration: 0.3 },
          height: { duration: 0.4, delay: 0.2 },
          top: { duration: 0.4, delay: 0.2 }
        }}
        style={{ transformOrigin: "center" }}
      />
      
      {/* Content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="relative z-10"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent font-bold text-center mb-8 sm:mb-10 lg:mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Teams
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" 
          style={{ background: 'transparent' }}
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >        
        {/* Team Components with staggered animation */}
        {[
          { component: <TeamComponent path={software.src} name="Software Development" description="Learn how to build innovative software solutions." style="primary" href="/teams/software_dev" />, delay: 1.6 },
          { component: <TeamComponent path={ai.src} name="AI Development" description="Dive into the future of technology with AI." style="secondary" href="/teams/ai_dev" />, delay: 1.7 },
          { component: <TeamComponent path={cc.src} name="Cloud Computing" description="Learn about cloud infrastructure and services." style="primary" href="/teams/cloud" />, delay: 1.8 },
          { component: <TeamComponent path={des.src} name="Design" description="Unleash your creativity in design and UX." style="secondary" href="/teams/design" />, delay: 1.9 },
          { component: <TeamComponent path={social.src} name="Social Media" description="Manage our online presence and community." style="primary" href="/teams/social_media" />, delay: 2.0 },
          { component: <TeamComponent path={pr.src} name="PR & Sponsors" description="Build relationships and secure sponsorships." style="secondary" href="/teams/pr_sponsors" />, delay: 2.1 }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.3, delay: item.delay, type: "spring", stiffness: 100 }}
          >
            {item.component}
          </motion.div>
        ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Teams;
