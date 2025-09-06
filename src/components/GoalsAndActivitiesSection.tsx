import React from 'react';
import { Inter } from "next/font/google";
import ga1 from "../../public/GA1.svg";
import ga2 from "../../public/GA2.svg";
import ga3 from "../../public/GA3.svg";
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal']
});

interface GoalItem {
  title: string;
  description: string;
  image: string;
}

const GoalsAndActivitiesSection = () => {
  const goals: GoalItem[] = [
    {
      title: "Practical AWS Skills",
      description: "Access exclusive resources, credits, and guidance from AWS.",
      image: ga1.src
    },
    {
      title: "Career Growth",
      description: "Build your network and prepare for your professional future.",
      image: ga2.src
    },
    {
      title: "Direct AWS Support",
      description: "Gain hands-on experience with AWS through workshops and projects.",
      image: ga3.src
    }
  ];

  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-30 px-3 sm:px-6 md:px-8 lg:px-10">
      <div className="mb-16 sm:mb-24 md:mb-28 lg:mb-36">
        <h1 className={`text-3xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold text-center bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent ${inter.className}`}>
          Goals and Activities
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-7xl mx-auto px-2 sm:px-4">
        {goals.map((goal, index) => (
          <div 
            key={index}
            className="relative flex flex-col items-center text-center space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-8 md:px-12 lg:px-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20 pt-16 sm:pt-20 md:pt-24 border-2 border-white rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm hover:bg-gradient-to-br hover:from-[#090EDB]/20 hover:to-[#DA24BB]/20 transition-all duration-300 min-w-0"
          >
            {/* Overlapping image positioned outside the border */}
            <div className="absolute -top-12 sm:-top-16 md:-top-20 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 rounded-full bg-gradient-to-br from-[#8504DE] to-[#4677FF] flex items-center justify-center">
              <img src={goal.image} alt={goal.title} className="w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 object-contain" />
            </div>
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#FCD8FF] ${inter.className} mt-3 sm:mt-4 md:mt-6 leading-tight text-center px-1 sm:px-2`} style={{lineHeight: '1.2'}}>
              {goal.title}
            </h2>
            <p className={`text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed ${inter.className} px-1 sm:px-2 text-center`}>
              {goal.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsAndActivitiesSection;
