'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { getClubLeadership } from '@/actions/club-lead-actions';

interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  title?: string | null;
  imageUrl?: string | null;
  linkedin?: string | null;
}

interface Mentor {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  designation?: string;
}

const mentors: Mentor[] = [
  {
    name: "Dr. Manoj Kumar",
    title: "Mentor",
    image: "/MrManoj.svg",
    linkedin: "",
    designation: "Assistant Professor (USAR-GGSIPU EDC)"
  },
  {
    name: "Dr. Rahul Johari",
    title: "Mentor",
    image: "/MrRahuJohari.svg",
    linkedin: "",
    designation: "Associate Professor (USAR-GGSIPU EDC)"
  }
];

function PersonCard({ 
  name, 
  title, 
  imageUrl, 
  linkedin, 
  isFeatured = false 
}: { 
  name: string; 
  title: string; 
  imageUrl: string; 
  linkedin?: string | null; 
  isFeatured?: boolean 
}) {
  return (
    <div className={`group relative ${isFeatured ? 'w-full' : ''}`}>
      <div className={`relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.05] ${
        isFeatured ? 'flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8' : 'p-4 sm:p-5'
      }`}>
        {/* Image */}
        <div className={`overflow-hidden ${
          isFeatured 
            ? 'w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shrink-0' 
            : 'w-full aspect-square rounded-xl mb-4'
        }`}>
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Info */}
        <div className={isFeatured ? 'text-left' : 'text-center'}>
          <h3 className={`font-bold text-white ${isFeatured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>
            {name}
          </h3>
          <p className={`text-gray-400 font-medium mt-1 ${isFeatured ? 'text-base' : 'text-sm'}`}>
            {title}
          </p>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#843aed] hover:text-[#FF9900] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PeopleSection() {
  const [leads, setLeads] = useState<LeadershipMember[]>([]);
  const [coLeads, setCoLeads] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

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

  return (
    <section ref={ref} className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
            Our{' '}
            <span className="bg-gradient-to-r from-[#843aed] to-[#FF9900] bg-clip-text text-transparent">
              People
            </span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#843aed] to-[#FF9900] rounded-full" />
        </motion.div>

        {/* Mentors — Featured Cards */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-6">Faculty Mentors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {mentors.map((mentor, i) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <PersonCard
                  name={mentor.name}
                  title={mentor.designation || mentor.title}
                  imageUrl={mentor.image}
                  linkedin={mentor.linkedin}
                  isFeatured
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Club Leadership */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#843aed]"></div>
          </div>
        ) : (
          <>
            {/* Leads */}
            {leads.length > 0 && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-6">Group Leadership</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {leads.map((lead, i) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    >
                      <PersonCard
                        name={lead.name}
                        title={lead.title || lead.role}
                        imageUrl={lead.imageUrl || '/default-avatar.svg'}
                        linkedin={lead.linkedin}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Co-Leads */}
            {coLeads.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-6">Co-Leads</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {coLeads.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    >
                      <PersonCard
                        name={member.name}
                        title={member.title || member.role}
                        imageUrl={member.imageUrl || '/default-avatar.svg'}
                        linkedin={member.linkedin}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
