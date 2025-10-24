'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTeamMembersByDepartment } from '@/actions/department-actions';
import MemberCard from '@/components/member';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string | null;
  linkedin?: string | null;
  department?: string | null;
}

export default function SoftwareDevPage() {
  const [leads, setLeads] = useState<TeamMember[]>([]);
  const [coLeads, setCoLeads] = useState<TeamMember[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const result = await getTeamMembersByDepartment('Cloud Computing');
        if (result.success) {
          setLeads(result.leads);
          setCoLeads(result.coLeads);
          setMembers(result.members);
        }
      } catch (error) {
        console.error('Error fetching software development team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#843aed]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 sm:p-12 lg:p-16 mt-16">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent pb-4">
          Cloud Computing Team
        </h1>
        <div className="mt-2 h-1 w-48 bg-gradient-to-r from-transparent via-[#843aed] to-transparent mx-auto" />
      </motion.div>

      {/* All Team Members in Three Side-by-Side Sections */}
      {(leads.length > 0 || coLeads.length > 0 || members.length > 0) && (
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
            {/* Leads Section */}
            <div className="flex-1 flex flex-col items-center space-y-8 xl:pt-4">
              {leads.map((lead) => (
                <MemberCard key={lead.id} member={lead} size="large" />
              ))}
            </div>

            {/* Co-Leads Section */}
            <div className="flex-1 flex flex-col items-center space-y-8 xl:pt-4">
              {coLeads.map((coLead) => (
                <MemberCard key={coLead.id} member={coLead} size="medium" />
              ))}
            </div>

            {/* Members Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 items-center">
              {members.map((member) => (
                <div key={member.id} className="flex justify-center p-4">
                  <MemberCard key={member.id} member={member} size="normal" />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Empty State */}
      {leads.length === 0 && coLeads.length === 0 && members.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-white/60 text-xl">
            No team members found for this department.
          </div>
          <p className="text-white/40 mt-4">
            Team members will appear here once they are added to the system.
          </p>
        </motion.div>
      )}
    </div>
  );
}