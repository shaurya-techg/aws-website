"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#180235] to-[#030012]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#180235] to-[#030012] pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#181828] rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <button
              onClick={handleSignOut}
              className="border-[1px] border-red-500 text-red-500 px-4 py-2 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>
          <p className="text-gray-300 mt-2">Welcome, Admin!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            className="bg-[#181828] rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/events")}
          >
            <h3 className="text-xl font-semibold text-white mb-2">Manage Events</h3>
            <p className="text-gray-400">Add, edit, or remove events</p>
          </div>
          <div 
            className="bg-[#181828] rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/teams")}
          >
            <h3 className="text-xl font-semibold text-white mb-2">Manage Team Members</h3>
            <p className="text-gray-400">Update team member information</p>
          </div>
          <div 
            className="bg-[#181828] rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/club-leads")}
          >
            <h3 className="text-xl font-semibold text-white mb-2">Manage Club Leaders</h3>
            <p className="text-gray-400">Add and manage club leads & co-leads</p>
          </div>
        </div>
      </div>
    </div>
  );
}