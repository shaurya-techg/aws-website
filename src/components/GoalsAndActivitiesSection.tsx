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
    <div className="py-30 px-10">
      <div className="mb-36">
        <h1 className={`text-4xl sm:text-6xl lg:text-8xl font-bold text-center bg-gradient-to-b from-[#DA24BB] to-[#090EDB] bg-clip-text text-transparent ${inter.className}`}>
          Goals and Activities
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-8xl mx-auto px-4">
        {goals.map((goal, index) => (
          <div 
            key={index}
            className="relative flex flex-col items-center text-center space-y-6 px-16 pb-20 pt-24 border-2 border-white rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm hover:bg-gradient-to-br hover:from-[#090EDB]/20 hover:to-[#DA24BB]/20 transition-all duration-300 min-w-0"
          >
            {/* Overlapping image positioned outside the border */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-[#8504DE] to-[#4677FF] flex items-center justify-center">
              <img src={goal.image} alt={goal.title} className="w-32 h-32 object-contain" />
            </div>
            <h2 className={`text-6xl font-bold text-[#FCD8FF] ${inter.className} mt-6 leading-tight`} style={{lineHeight: '1.3'}}>
              {goal.title}
            </h2>
            <p className={`text-white text-xl leading-relaxed ${inter.className} px-2`}>
              {goal.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsAndActivitiesSection;
