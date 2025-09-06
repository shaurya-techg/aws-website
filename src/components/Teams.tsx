import React from 'react';
import TeamComponent from './teamCompo';
import software from "../../public/Software.svg";
import ai from "../../public/Ai.svg";
import pr from "../../public/PR&Sponsors.svg";
import social from "../../public/SocialMedia.svg";
import des from "../../public/Design.svg";
import cc from "../../public/CloudComputing.svg";

const Teams = () => {
  return (
    <div className="mt-8 sm:mt-12 lg:mt-16 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg relative">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent font-bold text-center mb-8 sm:mb-10 lg:mb-12">
        Teams
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" style={{
        background: 'transparent'
      }}>
        {/* Top-left corner border */}
        <div className="absolute top-0 left-0 w-1/3 sm:w-1/2 h-0.5 sm:h-1 rounded-tl-lg" style={{
          backgroundColor: '#4677FF'
        }}></div>
        <div className="absolute top-0 left-0 w-0.5 sm:w-1 h-1/3 sm:h-1/2 rounded-tl-lg" style={{
          backgroundColor: '#4677FF'
        }}></div>
        
        {/* Bottom-right corner border */}
        <div className="absolute bottom-0 right-0 w-1/3 sm:w-1/2 h-0.5 sm:h-1 rounded-br-lg" style={{
          backgroundColor: '#B346F5'
        }}></div>
        <div className="absolute bottom-0 right-0 w-0.5 sm:w-1 h-1/3 sm:h-1/2 rounded-br-lg" style={{
          backgroundColor: '#B346F5'
        }}></div>
        <TeamComponent path={software.src} name="Software Development" description="Explore the world of AI and machine learning." style="primary" href="/teams/software_dev" />
        <TeamComponent path={ai.src} name="AI Development" description="Dive into the future of technology with AI." style="secondary" href="/teams/ai_dev" />
        <TeamComponent path={cc.src} name="Cloud Computing" description="Learn about cloud infrastructure and services." style="primary" href="/teams/cloud" />
        <TeamComponent path={des.src} name="Design" description="Unleash your creativity in design and UX." style="secondary" href="/teams/design" />
        <TeamComponent path={social.src} name="Social Media" description="Manage our online presence and community." style="primary" href="/teams/social_media" />
        <TeamComponent path={pr.src} name="PR & Sponsors" description="Build relationships and secure sponsorships." style="secondary" href="/teams/pr_sponsors" />
      </div>
    </div>
  );
};

export default Teams;
