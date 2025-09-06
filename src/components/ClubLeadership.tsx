'use client';
import React from 'react';

interface LeadershipMember {
  name: string;
  position: string;
  image: string;
  linkedin?: string;
}

interface ClubLeadershipProps {
  clubLead: LeadershipMember;
  coLeads: LeadershipMember[];
}

export default function ClubLeadership({ clubLead, coLeads }: ClubLeadershipProps) {
  const MemberCard = ({ member, isLead = false }: { member: LeadershipMember; isLead?: boolean }) => (
    <div className={`relative group ${isLead ? 'col-span-full mx-auto' : ''}`}>
      <div className={`relative ${
        isLead 
          ? 'w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64' 
          : 'w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44'
      } mx-auto`}>
        {/* Gradient Border */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-[#843aed] to-[#4349ff] p-1 ${
          isLead ? 'group-hover:scale-105' : 'group-hover:scale-110'
        } transition-transform duration-300`}>
          <div className="w-full h-full rounded-full bg-gray-900/90 backdrop-blur-sm overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
        
        {/* Social Links Overlay */}
        <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {member.linkedin && (
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#843aed] transition-colors duration-200"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
      
      {/* Member Info */}
      <div className="text-center mt-4 space-y-1">
        <h3 className={`font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent ${
          isLead ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl lg:text-2xl'
        }`}>
          {member.name}
        </h3>
        <p className={`text-white font-semibold ${
          isLead ? 'text-base sm:text-lg lg:text-xl' : 'text-sm sm:text-base lg:text-lg'
        }`}>
          {member.position}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6 sm:p-8 lg:p-10">
      {/* Club Lead - Centered at top */}
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <MemberCard member={clubLead} isLead={true} />
      </div>
      
      {/* Co-Leads - Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
        {coLeads.slice(0, 3).map((coLead, index) => (
          <MemberCard key={index} member={coLead} />
        ))}
      </div>
    </div>
  );
}
