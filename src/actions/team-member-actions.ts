"use server"

import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

// Types
interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

export async function createTeamMember(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const linkedin = formData.get("linkedin") as string;
    const department = formData.get("department") as string;
    const image = formData.get("image") as File;

    let imageUrl = "";

    // Upload image to Cloudinary if provided
    if (image && image.size > 0) {
      // Check file size limit (5MB = 5 * 1024 * 1024 bytes)
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (image.size > maxSizeInBytes) {
        return { error: "Image size must be less than 5MB" };
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "team-members",
            resource_type: "image",
            max_bytes: maxSizeInBytes, // Set Cloudinary limit to 5MB
            quality: "auto",
            fetch_format: "auto"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = (uploadResponse as CloudinaryResponse).secure_url;
    }

    // Create team member in database
    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        position,
        linkedin,
        department,
        imageUrl,
      },
    });

    return { success: true, teamMember };
  } catch (error) {
    console.error("Error creating team member:", error);
    return { success: false, error: "Failed to create team member" };
  }
}

export async function getTeamMembers() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const SW = teamMembers.filter(member => member.department === "Software Development");
    const AI = teamMembers.filter(member => member.department === "Artificial Intelligence");
    const CC = teamMembers.filter(member => member.department === "Cloud Computing");
    const DE = teamMembers.filter(member => member.department === "Design");
    const PR = teamMembers.filter(member => member.department === "PR & Social Media");
    const SM = teamMembers.filter(member => member.department === "Sponsors");
    return { SW, AI, CC, DE, PR, SM };
  } catch (error) {
    console.error("Error fetching team members:", error);
    return { SW: [], AI: [], CC: [], DE: [], PR: [], SM: [] };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: {
        id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { success: false, error: "Failed to delete team member" };
  }
}

export async function updateTeamMember(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const linkedin = formData.get("linkedin") as string;
    const department = formData.get("department") as string;
    const image = formData.get("image") as File;

    const updateData: {
      name: string;
      position: string;
      linkedin: string;
      department: string;
      imageUrl?: string;
    } = {
      name,
      position,
      linkedin,
      department,
    };

    // Upload new image to Cloudinary if provided
    if (image && image.size > 0) {
      // Check file size limit (5MB = 5 * 1024 * 1024 bytes)
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (image.size > maxSizeInBytes) {
        return { error: "Image size must be less than 5MB" };
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "team-members",
            resource_type: "image",
            max_bytes: maxSizeInBytes, // Set Cloudinary limit to 5MB
            quality: "auto",
            fetch_format: "auto"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      updateData.imageUrl = (uploadResponse as CloudinaryResponse).secure_url;
    }

    // Update team member in database
    const teamMember = await prisma.teamMember.update({
      where: { id },
      data: updateData,
    });

    return { success: true, teamMember };
  } catch (error) {
    console.error("Error updating team member:", error);
    return { success: false, error: "Failed to update team member" };
  }
}