"use server"

import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function createClubLead(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    const linkedin = formData.get("linkedin") as string;
    const image = formData.get("image") as File;

    let imageUrl = "";

    // Upload image to Cloudinary if provided
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "club-leads",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = (uploadResponse as any).secure_url;
    }

    // Create club lead in database
    const clubLead = await prisma.clubLead.create({
      data: {
        name,
        role,
        title,
        bio,
        linkedin,
        imageUrl,
      },
    });

    return { success: true, clubLead };
  } catch (error) {
    console.error("Error creating club lead:", error);
    return { success: false, error: "Failed to create club lead" };
  }
}

export async function getClubLeads() {
  try {
    const clubLeads = await prisma.clubLead.findMany({
      where: {
        isActive: true
      },
    });

    return { clubLeads };
  } catch (error) {
    console.error("Error fetching club leads:", error);
    return { clubLeads: [] };
  }
}

export async function deleteClubLead(id: string) {
  try {
    await prisma.clubLead.delete({
      where: {
        id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting club lead:", error);
    return { success: false, error: "Failed to delete club lead" };
  }
}

export async function updateClubLead(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    const linkedin = formData.get("linkedin") as string;
    const image = formData.get("image") as File;

    let updateData: any = {
      name,
      role,
      title,
      bio,
      linkedin,
    };

    // Upload new image to Cloudinary if provided
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "club-leads",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      updateData.imageUrl = (uploadResponse as any).secure_url;
    }

    // Update club lead in database
    const clubLead = await prisma.clubLead.update({
      where: { id },
      data: updateData,
    });

    return { success: true, clubLead };
  } catch (error) {
    console.error("Error updating club lead:", error);
    return { success: false, error: "Failed to update club lead" };
  }
}