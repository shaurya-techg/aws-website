"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [isClient, setIsClient] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, [isClient]);

  // Generate deterministic positions using a simple seeded function
  const getSeededPosition = (seed: number, width: number, height: number) => {
    const x = ((seed * 9301 + 49297) % 233280) / 233280;
    const y = ((seed * 7817 + 25173) % 233280) / 233280;
    return {
      x: x * width,
      y: y * height
    };
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Animated Background Particles */}
      {isClient && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: backgroundY, opacity: opacityTransform }}
        >
          {[...Array(20)].map((_, i) => {
            const initialPos = getSeededPosition(i, windowSize.width, windowSize.height);
            const animatePos = getSeededPosition(i + 100, windowSize.width, windowSize.height);
            const duration = 10 + (i % 10); // Deterministic duration between 10-19
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-[#843aed] to-[#4349ff] rounded-full"
                initial={{ 
                  x: initialPos.x, 
                  y: initialPos.y,
                  scale: 0
                }}
                animate={{ 
                  x: animatePos.x,
                  y: animatePos.y,
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: duration, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            );
          })}
        </motion.div>
      )}

      {/* Geometric Background Patterns */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern id="hexPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,1 18,6 18,14 10,19 2,14 2,6" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" className="text-white"/>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
