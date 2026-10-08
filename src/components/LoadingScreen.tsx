"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Loading from "../svgs/loading";
import Logo from "../../public/new_logo.jpeg";

const taglineWords = ['AWS', 'Student', 'Builder', 'Group'];

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0b10] px-4 relative overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-[#E09F67]/5 blur-[80px]"
          style={{ top: '30%', left: '20%' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-60 h-60 rounded-full bg-[#86B398]/4 blur-[60px]"
          style={{ top: '40%', right: '25%' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
      </div>

      {/* Logo with scale + glow animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10"
      >
        <Image 
          src={Logo.src} 
          alt="AWS Student Builder Group Logo" 
          width={320} 
          height={320} 
          className="w-32 sm:w-40 md:w-48 h-auto rounded-2xl shadow-xl ring-1 ring-white/10" 
        />
        {/* Subtle glow ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ boxShadow: '0 0 0px rgba(224, 159, 103, 0)' }}
          animate={{ boxShadow: '0 0 30px rgba(224, 159, 103, 0.15)' }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Tagline — staggered word reveal */}
      <div className="flex items-center gap-2 sm:gap-3 mt-6 sm:mt-8 relative z-10">
        {taglineWords.map((word, i) => (
          <motion.span
            key={word}
            className="text-lg sm:text-xl md:text-2xl font-bold text-white/90"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Loading arrow + campus text properly stacked with guaranteed spacing */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 mt-8 sm:mt-10 relative z-10">
        <motion.div
          className="w-32 sm:w-40 md:w-48 text-[#E09F67]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Loading />
        </motion.div>

        {/* Campus location strictly below arrow */}
        <motion.p
          className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase font-medium"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          GGSIPU East Delhi Campus
        </motion.p>
      </div>
    </div>
  );
}
