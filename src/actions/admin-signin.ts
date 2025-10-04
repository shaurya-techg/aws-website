"use server"

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

const ADMIN_EMAIL = "admin@awscc.com"; // Change this to your admin email

export async function signInAdminAction(formData: FormData) {
    const email = String(formData.get("email"));
    if (!email) return { error: "Please enter your email" };

    const password = String(formData.get("password"));
    if (!password) return { error: "Please enter your password" };

    // Check if email is the admin email
    if (email !== ADMIN_EMAIL) {
        return { error: "Unauthorized access" };
    }

    try {
        await auth.api.signInEmail({
            headers: await headers(),
            body: {
                email,
                password,
            },
        });
        return { error: null };
    } catch (error) {
        if (error instanceof APIError) {
            return { error: error.message || "Invalid credentials" };
        }
        return { error: "Sign in failed" };
    }
}