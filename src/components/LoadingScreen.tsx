"use client";

import { motion } from "framer-motion";
import Loading from "../svgs/loading";
import Logo from "../../public/Logo.svg";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      {/* Your Logo */}
      <img src={Logo.src} alt="Logo" className="w-80 h-auto -mb-32" />

      {/* Amazon-style loading animation */}
      <motion.div
        className="w-96 h-48"
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
