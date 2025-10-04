"use client"
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInAdminAction } from "@/actions/admin-signin";

export const AdminLoginForm = () => {
    const [isPending, setIsPending] = React.useState(false);
    const router = useRouter();

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setIsPending(true);
        const formData = new FormData(evt.currentTarget as HTMLFormElement);
        const { error } = await signInAdminAction(formData);
        
        if (error) {
            toast.error(error);
            setIsPending(false);
        } else {
            router.push("/admin/dashboard");
            toast.success("Admin login successful!");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                    Admin Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                    placeholder="admin@awscc.com"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                    placeholder="Enter your password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
            >
                {isPending ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
};