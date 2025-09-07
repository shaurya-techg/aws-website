
'use client';
import Navbar from "@/components/navbar";
import description from "../../public/Description.svg";
import punchline from "../../public/Punchline.svg";
import { Inter } from "next/font/google";
import prductivity from "../../public/productivity.svg";
import StatsSection from "@/components/StatsSection";
import Teams from "@/components/Teams";
import GoalsAndActivitiesSection from "@/components/GoalsAndActivitiesSection";
import './globals.css';
import Events from "@/components/events";
import ClubLeadership from "@/components/ClubLeadership";
import PhotoGallery from "@/components/PhotoGallery";
import ChatBot from "@/components/ChatBot";
import BePartSection from "@/components/BePartSection";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal']
});

export default function Home() {
  return (
    <div 
      className="min-h-screen w-full max-w-full bg-cover py-3 sm:py-4 lg:py-5 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 overflow-x-hidden mx-auto"
    >
      <div className="w-full max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Navbar />
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 md:space-x-8 lg:space-x-14 mb-12 sm:mb-16 lg:mb-20 mt-4 sm:mt-6 lg:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div 
            className="w-full sm:w-2/5 flex justify-center order-1 sm:order-2 pt-6 sm:pt-8 px-6 sm:px-4 md:px-6 lg:px-8 xl:px-14"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
          >
              <img src={prductivity.src} className="w-full max-w-md sm:max-w-full" alt="Productivity" />
          </motion.div>
        <motion.div 
          className="w-full sm:w-3/5 flex flex-col items-center justify-center py-6 sm:py-8 md:py-[10%] lg:py-[14%] px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 gap-3 sm:gap-4 md:gap-6 order-2 sm:order-1"
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
        className="my-8 sm:my-12 lg:my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <StatsSection />
      </motion.div>
      
      {/* Club Leadership */}
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
      
      <motion.div 
        className="flex flex-col justify-center items-center py-6 sm:py-8 md:py-12 lg:py-16 mt-6 sm:mt-8 lg:mt-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div 
          className="absolute inset-0 opacity-10 rounded-xl sm:rounded-2xl lg:rounded-3xl"
          style={{
            background: 'radial-gradient(circle, white 0%, rgba(128,128,128,0.8) 50%, black 100%)'
          }}
        ></div>
        <motion.h1 
          className={`relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-center bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent ${inter.className} mb-4 sm:mb-6 lg:mb-8`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          AWS Cloud Club GGSIPU
        </motion.h1>
        <motion.div 
          className="px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-28 relative z-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-semibold text-white text-center ${inter.className} my-4 sm:my-6 md:my-8 lg:my-10 leading-relaxed`}>
            Manages online presence, content and community engagement
          </h2>
        </motion.div>
        <motion.div 
          className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white leading-relaxed text-center sm:text-left mb-3 sm:mb-4 md:mb-6">
            The goal of this club is to teach students about the AWS Cloud and its various use cases, including those related to security, AI, business analytics, business transformation, etc. We will teach students about the benefits of the cloud and how it accelerates business.
          </p>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white leading-relaxed text-center sm:text-left">
            Furthermore, the AWS Cloud Club will give students hands-on experience through projects in the AWS cloud, allowing students to develop both technical and business expertise in the cloud. This club will provide students with industry skills currently in high demand.
          </p>
        </motion.div>
      </motion.div>
      
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
        <GoalsAndActivitiesSection />
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
