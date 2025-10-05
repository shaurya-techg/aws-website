"use server"

import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function createEvent(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as File;

    let imageUrl = "";

    // Upload image to Cloudinary if provided
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "events",
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

    // Create event in database
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        link,
        imageUrl,
      },
    });

    return { success: true, event };
  } catch (error) {
    console.error("Error creating event:", error);
    return { error: "Failed to create event" };
  }
}

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });
    return { events };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { error: "Failed to fetch events" };
  }
}

export async function getLatestEvents(limit: number = 4) {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "desc" },
      take: limit,
    });
    return { events };
  } catch (error) {
    console.error("Error fetching latest events:", error);
    return { events: [] };
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { error: "Failed to delete event" };
  }
}