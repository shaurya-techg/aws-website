'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cyclingWords = ['Build', 'Deploy', 'Scale', 'Innovate'];

export default function HeroTypography() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
      {/* Main Heading */}
      <div className="overflow-hidden">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          AWS Student
          <br />
          Builder Group
        </motion.h1>
      </div>

      {/* Cycling tagline */}
      <motion.div
        className="flex items-center justify-center gap-3 sm:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/60">
          Learn.
        </span>
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/60">
          Create.
        </span>
        {/* Fixed container — uses min-width instead of fixed height to prevent clipping */}
        <div className="relative min-w-[140px] sm:min-w-[180px] md:min-w-[220px] lg:min-w-[280px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={cyclingWords[currentWordIndex]}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold hero-gradient-text inline-block"
              initial={{ y: 30, opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -30, opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {cyclingWords[currentWordIndex]}.
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        Empowering students at GGSIPU East Delhi Campus to explore cloud
        technologies, build real-world projects, and develop industry-ready skills.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <a
          href="https://www.meetup.com/aws-cloud-club-at-ggsipu"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta-primary group"
        >
          Join the Community
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a href="/events" className="hero-cta-secondary">
          View Events
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-gray-500"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
