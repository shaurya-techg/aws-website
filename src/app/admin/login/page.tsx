"use client"
import { SimpleAdminLoginForm } from "@/components/simple-admin-login-form";
import { Toaster } from "sonner";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#180235] to-[#030012]">
      <div className="bg-[#181828] p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent mb-6">
          Admin Login
        </h2>
        <SimpleAdminLoginForm />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
