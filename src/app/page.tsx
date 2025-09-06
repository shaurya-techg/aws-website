
import Navbar from "@/components/navbar";
import Image from "next/image";
import hero from "../../public/homePage.svg";
import description from "../../public/Description.svg";
import punchline from "../../public/Punchline.svg";
import { Inter } from "next/font/google";
import prductivity from "../../public/productivity.svg";
import StatsSection from "@/components/StatsSection";
import Teams from "@/components/Teams";
import GoalsAndActivitiesSection from "@/components/GoalsAndActivitiesSection";
import './globals.css';
import Events from "@/components/events";
import FAQ from "@/components/FAQ";
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal']
});

export default function Home() {
  return (
    <div 
      className="min-h-screen w-full bg-cover py-5 px-12"
      style={{
        backgroundImage: `url(${hero.src})`
      }}
    >
      <Navbar />
      <div className="flex flex-col sm:flex-row items-center space-y-8 sm:space-y-0 sm:space-x-14 mb-20">
        <div className="w-full sm:w-2/5 flex justify-center order-1 sm:order-2">
            <Image 
              src={prductivity} 
              className="w-full" 
              alt="Productivity" 
              priority

            />
        </div>
        <div className="w-full sm:w-3/5 flex flex-col items-center justify-center py-[10%] px-4 sm:px-8 gap-6 order-2 sm:order-1">
          <Image 
            src={punchline} 
            className="w-full" 
            alt="Punchline" 
            priority
            width={800}
            height={200}
          />
          <Image 
            src={description} 
            className="w-full" 
            alt="Description" 
            priority
            width={800}
            height={200}
          />
          <div className="relative rounded-full py-4 px-3" style={{
              background: 'linear-gradient(to top right, #090EDB, #DA24BB)',
          }}>
            <button className="px-4 text-white font-semibold rounded-full w-full h-full ">
              JOIN CLUB
            </button>
          </div>
        </div>
      </div>
      <StatsSection />
      <div className="flex flex-col justify-center items-center py-16 mt-10 px-10">
        <h1 className={`text-4xl sm:text-6xl lg:text-8xl font-bold text-center bg-gradient-to-b from-[#090EDB] to-[#DA24BB] bg-clip-text text-transparent ${inter.className}`}>
          AWS Cloud Club GGSIPU
        </h1>
        <div className="px-28">
          <h2 className={`text-xl sm:text-2xl lg:text-4xl xl:text-6xl font-semibold text-white text-center ${inter.className} my-10 leading-relaxed`}>
            Manages online presence, content and community engagement
          </h2>
        </div>
        <div className="px-10">
          <p className="text-4xl text-white leading-relaxed">
            The goal of this club is to teach students about the AWS Cloud and its various use cases, including those related to security, AI, business analytics, business transformation, etc. We will teach students about the benefits of the cloud and how it accelerates business.
          </p><br />

          <p className="text-4xl text-white leading-relaxed">
            Furthermore, the AWS Cloud Club will give students hands-on experience through projects in the AWS cloud, allowing students to develop both technical and business expertise in the cloud. This club will provide students with industry skills currently in high demand.
          </p>
        </div>
      </div>
      <Teams />
      <GoalsAndActivitiesSection />
      <Events />
      <FAQ />
    </div>
  );
}
