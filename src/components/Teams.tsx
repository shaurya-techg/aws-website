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
    <div className="mt-16 max-w-6xl mx-auto p-8 rounded-lg relative">
      <h1 className="text-4xl sm:text-6xl lg:text-8xl text-white bg-clip-text font-bold text-center mb-12">
        Teams
      </h1>
      <div className="grid grid-cols-3 grid-rows-2 gap-8" style={{
        background: 'transparent'
      }}>
        {/* Top-left corner border */}
        <div className="absolute top-0 left-0 w-1/2 h-1 rounded-tl-lg" style={{
          backgroundColor: '#090EDB'
        }}></div>
        <div className="absolute top-0 left-0 w-1 h-1/2 rounded-tl-lg" style={{
          backgroundColor: '#090EDB'
        }}></div>
        
        {/* Bottom-right corner border */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1 rounded-br-lg" style={{
          backgroundColor: '#DA24BB'
        }}></div>
        <div className="absolute bottom-0 right-0 w-1 h-1/2 rounded-br-lg" style={{
          backgroundColor: '#DA24BB'
        }}></div>
        <TeamComponent path={software.src} name="Software Development" description="Explore the world of AI and machine learning." style="primary" />
        <TeamComponent path={ai.src} name="AI Development" description="Dive into the future of technology with AI." style="secondary" />
        <TeamComponent path={cc.src} name="Cloud Computing" description="Learn about cloud infrastructure and services." style="primary" />
        <TeamComponent path={des.src} name="Design" description="Unleash your creativity in design and UX." style="secondary" />
        <TeamComponent path={social.src} name="Social Media" description="Manage our online presence and community." style="primary" />
        <TeamComponent path={pr.src} name="PR & Sponsors" description="Build relationships and secure sponsorships." style="secondary" />
      </div>
    </div>
  );
};

export default Teams;
