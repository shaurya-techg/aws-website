"use server"

import { prisma } from "@/lib/prisma";

export async function getTeamMembersByDepartment(department: string) {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        department,
        isActive: true
      },
      orderBy: [
        {
          // Order by position to get leads first, then co-leads, then members
          position: 'asc'
        },
        {
          createdAt: 'asc'
        }
      ]
    });

    // Separate members by their roles
    const leads = teamMembers.filter(member => 
      member.position.toLowerCase().includes('lead') && 
      !member.position.toLowerCase().includes('co-lead')
    );
    
    const coLeads = teamMembers.filter(member => 
      member.position.toLowerCase().includes('co-lead')
    );
    
    const members = teamMembers.filter(member => 
      !member.position.toLowerCase().includes('lead')
    );

    return { 
      success: true, 
      leads, 
      coLeads, 
      members, 
      allMembers: teamMembers 
    };
  } catch (error) {
    console.error("Error fetching team members by department:", error);
    return { 
      success: false, 
      leads: [], 
      coLeads: [], 
      members: [], 
      allMembers: [] 
    };
  }
}