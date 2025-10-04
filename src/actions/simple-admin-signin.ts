"use server"

import { Client } from 'pg';

export async function simpleAdminSignIn(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    // Get admin credentials from environment variables
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // Check if environment variables are set
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        return { error: "Admin credentials not configured" };
    }

    // Check if it's the admin email and password
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return { success: true };
    } else {
        return { error: "Invalid credentials" };
    }
}