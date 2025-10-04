"use client";

import { motion } from "framer-motion";
import Loading from "../svgs/loading";
import Logo from "../../public/Logo.svg";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black px-4">
      {/* Your Logo */}
      <img src={Logo.src} alt="Logo" className="w-48 sm:w-64 md:w-80 h-auto -mb-8 sm:-mb-12 md:-mb-16" />

      {/* Amazon-style loading animation */}
      <motion.div
        className="w-40 h-20 sm:w-52 sm:h-26 md:w-64 md:h-32 -mt-2 sm:-mt-4 md:-mt-6"
        style={{ color: '#432679' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <Loading />
      </motion.div>
    </div>
  );
}
