'use client';
import Image from "next/image";
import description from "../../public/Description.svg";
import punchline from "../../public/Punchline.svg";
import { Inter } from "next/font/google";
import StatsSection from "@/components/StatsSection";
import Teams from "@/components/Teams";
import './globals.css';
import Events from "@/components/events";
import ClubLeadership from "@/components/ClubLeadership";
import ChatBot from "@/components/ChatBot";
import BePartSection from "@/components/BePartSection";
import { motion } from "framer-motion";
import groupPhoto from "../../public/groupPhoto.jpg";
import Mentors from "@/components/Mentors";
import dynamic from "next/dynamic";

const Logo3D = dynamic(() => import("@/components/Logo3D"), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal']
});

export default function Home() {
  return (
    <div 
      className="min-h-screen w-full max-w-full bg-cover pt-20 sm:pt-24 lg:pt-36 py-3 sm:py-4 lg:py-5 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 overflow-x-hidden mx-auto relative z-[2]"
    >
      <div className="w-full max-w-screen-2xl mx-auto">

        {/* ─── Hero Section with Aurora Background ─── */}
        <div className="relative">
          {/* Aurora blobs */}
          <div className="aurora-blob w-64 h-64 bg-purple-600/20 top-0 -left-20" style={{ animationDelay: '0s' }} />
          <div className="aurora-blob w-48 h-48 bg-indigo-500/15 top-20 right-10" style={{ animationDelay: '3s' }} />
          <div className="aurora-blob w-56 h-56 bg-violet-500/10 -bottom-10 left-1/3" style={{ animationDelay: '5s' }} />

          <motion.div 
            className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 md:space-x-8 lg:space-x-14 mb-12 sm:mb-16 lg:mb-20 mt-4 sm:mt-6 lg:mt-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* ─── 3D Logo (replaces static Image) ─── */}
            <motion.div 
              className="w-full sm:w-2/5 flex justify-center order-1 sm:order-2 pt-2 sm:pt-4 md:pt-6 px-4 sm:px-6 md:px-8 lg:px-10"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <div className="w-64 sm:w-72 md:w-80 lg:w-96 aspect-square">
                <Logo3D />
              </div>
            </motion.div>

          <motion.div 
            className="w-full sm:w-3/5 flex flex-col items-center justify-center py-2 sm:py-4 md:py-6 lg:py-8 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 gap-3 sm:gap-4 md:gap-6 order-2 sm:order-1"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2, type: "spring", damping: 25 }}
          >
            <motion.img 
              src={punchline.src} 
              className="w-full max-w-lg sm:max-w-full" 
              alt="Punchline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.03, filter: "drop-shadow(0 0 20px rgba(132,58,237,0.4))" }}
            />
            <motion.img 
              src={description.src} 
              className="w-full max-w-lg sm:max-w-full" 
              alt="Description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.02, filter: "drop-shadow(0 0 15px rgba(67,73,255,0.3))" }}
            />
          </motion.div>
        </motion.div>
        </div>

        {/* ─── Stats Section with hover glow ─── */}
        <motion.div 
          className="mt-20 sm:mt-32 lg:mt-40 mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <StatsSection />
        </motion.div>
      
        {/* Group Leadership */}
        <motion.div 
          className="my-8 sm:my-12 lg:my-16 bg-black w-full"
          whileHover={{ boxShadow: "0 0 40px rgba(132,58,237,0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row ">
            <motion.div 
              className="md:w-1/2 flex justify-center items-center p-6 sm:p-8 lg:p-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={groupPhoto.src} alt="About Us" width={600} height={400} className="h-auto rounded-lg shadow-lg mb-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(132,58,237,0.3)]" />
            </motion.div>
            <div className="h-98 md:h-auto md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col text-white justify-around">
              <div>
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent shimmer-text"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                About Us
              </motion.h1>
              <p className="text-md sm:text-base md:text-xl lg:text-xl leading-relaxed">
                The AWS Student Builder Group helps students explore cloud technologies and their real-world applications in areas like security, AI, and business analytics. Through hands-on projects, members gain technical and business expertise, building industry-relevant skills for the future.<br />
                Furthermore, the AWS Student Builder Group will give students hands-on experience through projects in the AWS cloud, allowing students to develop both technical and business expertise in the cloud. This group will provide students with industry skills currently in high demand.
              </p>
              </div>
            </div>
          </div>
          <motion.div 
            className="my-10 mt-16 lg:mt-10 sm:my-12 lg:my-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ClubLeadership />
          </motion.div>
        </motion.div>
        
        {/* ─── Teams with hover ─── */}
        <motion.div 
          className="my-8 sm:my-12 lg:my-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Teams />
        </motion.div>

        <motion.div 
          className="my-8 sm:my-12 lg:my-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
        </motion.div>

        {/* ─── Latest Events with shimmer heading ─── */}
        <motion.div 
          className="my-8 sm:my-12 lg:my-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="py-8 sm:py-12 md:py-14 lg:py-16 px-3 sm:px-6 md:px-8 lg:px-10">
            <div className="mb-8 sm:mb-12 md:mb-14 lg:mb-16">
              <motion.h1 
                className={`text-3xl py-2 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent shimmer-text ${inter.className}`}
                whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 25px rgba(132,58,237,0.5))" }}
                transition={{ duration: 0.3 }}
              >
                  Latest Events
              </motion.h1>
            </div>
            <Events />
          </div>
        </motion.div>

        {/* ─── Mentors ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Mentors />
        </motion.div>
      
        {/* Be Part Section */}
        <motion.div 
          className="my-8 sm:my-12 lg:my-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <BePartSection />
        </motion.div>
      
      </div>
      
      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
}
