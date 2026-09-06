'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getClubLeadership } from '@/actions/club-lead-actions';

interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  title?: string | null;
  imageUrl?: string | null;
  linkedin?: string | null;
}

export default function ClubLeadership() {
  const [leads, setLeads] = useState<LeadershipMember[]>([]);
  const [coLeads, setCoLeads] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const { leads, coLeads } = await getClubLeadership();
        setLeads(leads);
        setCoLeads(coLeads);
      } catch (error) {
        console.error('Error fetching leadership data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadership();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }
  const MemberCard = ({ member, isLead = false }: { member: LeadershipMember; isLead?: boolean }) => (
    <div className={`relative group ${isLead ? 'col-span-full mx-auto' : ''}`}>
      <div className={`relative ${
        isLead 
          ? 'w-48 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80' 
          : 'w-32 h-40 sm:w-40 sm:h-48 lg:w-44 lg:h-56'
      } mx-auto`}>
        {/* Gradient Border */}
        <div className={`absolute inset-0 rounded-3xl bg-white p-1 ${
          isLead ? 'group-hover:scale-105' : 'group-hover:scale-110'
        } transition-transform duration-150`}>
          <div className="w-full h-full rounded-3xl bg-gray-900/90 backdrop-blur-sm overflow-hidden">
            <Image 
              src={member.imageUrl || '/default-avatar.svg'} 
              alt={member.name}
              width={300}
              height={400}
              className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-110"
            />
          </div>
        </div>
        
        {/* Social Links Overlay */}
        <div className="absolute inset-0 rounded-3xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
          {member.linkedin && (
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#843aed] transition-colors duration-100"
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
          {member.title || member.role}
        </p>
      </div>
    </div>
  );

  // If no leadership data, don't render the component
  if (leads.length === 0 && coLeads.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 sm:p-8 lg:p-10">
      {/* Section Title */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent mb-4">
          Group Leadership
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#843aed] to-[#4349ff] mx-auto rounded-full"></div>
      </div>

      {/* Group Leads - Bigger photos */}
      {leads.length > 0 && (
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 justify-items-center">
            {leads.map((lead) => (
              <MemberCard key={lead.id} member={lead} isLead={true} />
            ))}
          </div>
        </div>
      )}
      
      {/* Co-Leads - Smaller photos */}
      {coLeads.length > 0 && (
        <div className="flex mb-12 sm:mb-16 lg:mb-20 justify-center ">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-16 lg:gap-24 justify-items-center">
            {coLeads.map((coLead) => (
              <MemberCard key={coLead.id} member={coLead} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
