'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string | null;
  linkedin?: string | null;
  department?: string | null;
}

interface MemberCardProps {
  member: TeamMember;
  size?: 'large' | 'medium' | 'normal';
}

const MemberCard: React.FC<MemberCardProps> = ({ 
  member, 
  size = 'normal' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'large':
        return {
          container: 'w-64 h-84 sm:w-72 sm:h-94',
          image: 'h-56 sm:h-64',
          title: 'text-2xl sm:text-3xl',
          position: 'text-lg sm:text-xl'
        };
      case 'medium':
        return {
          container: 'w-48 h-66 sm:w-56 sm:h-76',
          image: 'h-40 sm:h-48',
          title: 'text-xl sm:text-2xl',
          position: 'text-base sm:text-lg'
        };
      default:
        return {
          container: 'w-40 h-56 sm:w-44 sm:h-60',
          image: 'h-32 sm:h-36',
          title: 'text-lg sm:text-xl',
          position: 'text-sm sm:text-base'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <motion.div
      className={`${sizeClasses.container} mx-auto group cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative h-full bg-white/10 backdrop-blur-lg rounded-3xl p-1 border border-white/20 overflow-hidden group-hover:bg-white/20 transition-all duration-300">
        <div className="w-full h-full rounded-3xl bg-[#181828]/90 overflow-hidden">
          {/* Image */}
          <div className={`${sizeClasses.image} overflow-hidden rounded-t-3xl`}>
            <img 
              src={member.imageUrl || '/default-avatar.svg'} 
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
           <div className="absolute inset-0 rounded-3xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
          
          {/* Content */}
          <div className="p-4 text-center">
            <h3 className={`font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent ${sizeClasses.title} mb-2`}>
              {member.name}
            </h3>
            {member.position!="Member" && <p className={`text-white font-medium ${sizeClasses.position} pb-3`}>
              {member.position}
            </p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;