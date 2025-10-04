'use client';
import Navbar from "@/components/navbar";
import description from "../../public/Description.svg";
import punchline from "../../public/Punchline.svg";
import { Inter } from "next/font/google";
import prductivity from "../../public/productivity.svg";
import StatsSection from "@/components/StatsSection";
import Teams from "@/components/Teams";
import './globals.css';
import Events from "@/components/events";
import ClubLeadership from "@/components/ClubLeadership";
import PhotoGallery from "@/components/PhotoGallery";
import ChatBot from "@/components/ChatBot";
import BePartSection from "@/components/BePartSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import groupPhoto from "../../public/groupPhoto.jpg";
import { g } from "framer-motion/client";
import Mentors from "@/components/Mentors";
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal']
});

export default function Home() {
  return (
    <div 
      className="min-h-screen w-full max-w-full bg-cover pt-20 sm:pt-24 lg:pt-36 py-3 sm:py-4 lg:py-5 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 overflow-x-hidden mx-auto"
    >
      <div className="w-full max-w-screen-2xl mx-auto">
        <motion.div 
          className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 md:space-x-8 lg:space-x-14 mb-12 sm:mb-16 lg:mb-20 mt-4 sm:mt-6 lg:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div 
            className="w-full sm:w-2/5 flex justify-center order-1 sm:order-2 pt-2 sm:pt-4 md:pt-6 px-4 sm:px-6 md:px-8 lg:px-10"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
          >
              <img src={prductivity.src} className="w-full max-w-md sm:max-w-full" alt="Productivity" />
          </motion.div>
        <motion.div 
          className="w-full sm:w-3/5 flex flex-col items-center justify-center py-2 sm:py-4 md:py-6 lg:py-8 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 gap-3 sm:gap-4 md:gap-6 order-2 sm:order-1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", damping: 25 }}
        >
          <motion.img 
            src={punchline.src} 
            className="w-full max-w-lg sm:max-w-full" 
            alt="Punchline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <motion.img 
            src={description.src} 
            className="w-full max-w-lg sm:max-w-full" 
            alt="Description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          />
        </motion.div>
      </motion.div>
      <motion.div 
        className="mt-20 sm:mt-32 lg:mt-40 mb-8 sm:mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <StatsSection />
      </motion.div>
      
      {/* Club Leadership */}
      
      <div className="my-8 sm:my-12 lg:my-16 bg-black w-full">
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-1/2 flex justify-center items-center p-6 sm:p-8 lg:p-10">
          <img src={groupPhoto.src} alt="About Us" className="h-auto rounded-lg shadow-lg mb-6" />
        </div>
        <div className="h-98 md:h-auto md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col text-white justify-around">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-md sm:text-base md:text-xl lg:text-xl leading-relaxed">
            The AWS Cloud Club helps students explore cloud technologies and their real-world applications in areas like security, AI, and business analytics. Through hands-on projects, members gain technical and business expertise, building industry-relevant skills for the future.<br />
            Furthermore, the AWS Cloud Club will give students hands-on experience through projects in the AWS cloud, allowing students to develop both technical and business expertise in the cloud. This club will provide students with industry skills currently in high demand.

          </p>
          </div>
        </div>
      </div>
        <motion.div 
        className="my-8 sm:my-12 lg:my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <ClubLeadership 
          clubLead={{
            name: "John Doe",
            position: "Club President",
            image: "/team/president.jpg",
            linkedin: "https://linkedin.com/in/johndoe"
          }}
          coLeads={[
            {
              name: "Jane Smith",
              position: "Vice President",
              image: "/team/vice-president.jpg",
              linkedin: "https://linkedin.com/in/janesmith"
            },
            {
              name: "Mike Johnson",
              position: "Technical Lead",
              image: "/team/tech-lead.jpg",
              linkedin: "https://linkedin.com/in/mikejohnson"
            },
            {
              name: "Sarah Wilson",
              position: "Events Coordinator",
              image: "/team/events-coordinator.jpg",
              linkedin: "https://linkedin.com/in/sarahwilson"
            }
          ]}
        />
      </motion.div>
      </div>
        
      
      {/* Photo Gallery */}
      <motion.div 
        className="my-8 sm:my-12 lg:my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <PhotoGallery />
      </motion.div>
      
      <motion.div 
        className="my-8 sm:my-12 lg:my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Teams />
      </motion.div>
      <motion.div 
        className="my-8 sm:my-12 lg:my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
      </motion.div>
      <motion.div 
        className="my-8 sm:my-12 lg:my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Events />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Mentors />
      </motion.div>
      
      {/* Be Part Section */}
      <motion.div 
        className="my-8 sm:my-12 lg:my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <BePartSection />
      </motion.div>
      
      {/* Footer */}
      <Footer />
      </div>
      
      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
}
