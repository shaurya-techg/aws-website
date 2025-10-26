'use server'

import { prisma } from '@/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function createAlumni(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const session = formData.get('session') as string
    const linkedin = formData.get('linkedin') as string
    const image = formData.get('image') as File

    let imageUrl = null

    // Handle image upload if provided
    if (image && image.size > 0) {
      // Check file size limit (5MB = 5 * 1024 * 1024 bytes)
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (image.size > maxSizeInBytes) {
        return { error: "Image size must be less than 5MB" };
      }

      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'alumni',
            resource_type: 'image',
            max_bytes: maxSizeInBytes, // Set Cloudinary limit to 5MB
            quality: "auto",
            fetch_format: "auto"
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(buffer)
      }) as any

      imageUrl = uploadResponse.secure_url
    }

    const alumni = await prisma.alumni.create({
      data: {
        name,
        role,
        session,
        linkedin: linkedin || null,
        imageUrl,
      },
    })

    return { success: true, alumni }
  } catch (error) {
    console.error('Error creating alumni:', error)
    return { success: false, error: 'Failed to create alumni' }
  }
}

export async function getAlumni() {
  try {
    const alumni = await prisma.alumni.findMany({
      orderBy: { createdAt: 'asc' },
    })

    return { success: true, alumni }
  } catch (error) {
    console.error('Error fetching alumni:', error)
    return { success: false, error: 'Failed to fetch alumni' }
  }
}

export async function deleteAlumni(id: string) {
  try {
    await prisma.alumni.delete({
      where: { id },
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting alumni:', error)
    return { success: false, error: 'Failed to delete alumni' }
  }
}

export async function updateAlumni(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const session = formData.get('session') as string
    const linkedin = formData.get('linkedin') as string
    const image = formData.get('image') as File

    let imageUrl = undefined

    // Handle image upload if provided
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'alumni',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(buffer)
      }) as any

      imageUrl = uploadResponse.secure_url
    }

    const updateData: any = {
      name,
      role,
      session,
      linkedin: linkedin || null,
    }

    if (imageUrl) {
      updateData.imageUrl = imageUrl
    }

    const alumni = await prisma.alumni.update({
      where: { id },
      data: updateData,
    })

    return { success: true, alumni }
  } catch (error) {
    console.error('Error updating alumni:', error)
    return { success: false, error: 'Failed to update alumni' }
  }
}