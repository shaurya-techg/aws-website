"use client";
import React, { useRef } from 'react'
import EventsSection from '@/components/EventsSection'
import { motion, useInView } from 'framer-motion'

const page = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className='mt-20 sm:mt-28 relative min-h-screen'>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#843aed]/20 to-[#4349ff]/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-l from-[#FCD8FF]/15 to-[#843aed]/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-[#4349ff]/10 to-[#FCD8FF]/20 rounded-full blur-3xl opacity-40"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FCD8FF]/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#843aed]/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-[#4349ff]/35 rounded-full animate-pulse"></div>
      </div>

      <div ref={ref} className="relative z-10">
        <motion.div 
              className="text-center mb-16 sm:mb-24 px-4 sm:px-6 lg:px-8"
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
                    Our AWSome Events
                  </span>
                </h1>
              </motion.div>
              
              <motion.div
                className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#843aed] to-transparent mx-auto"
                initial={{ width: 0 }}
                animate={isInView ? { width: "200px" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Added descriptive text */}
              <motion.div
                className="mt-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                  Celebrating the journey of AWS, where every event is not just a gathering, but a{" "}
                  <span className="bg-gradient-to-r from-[#FCD8FF] to-[#843aed] bg-clip-text text-transparent font-medium">
                    milestone
                  </span>{" "}
                  that reflects our spirit, creativity, and togetherness.
                </p>
              </motion.div>
            </motion.div>
      </div>
        <EventsSection />
    </div>
  )
}

export default page