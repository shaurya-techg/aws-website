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
    <div className="min-h-screen bg-gradient-to-b from-[#180235] to-[#030012] pt-20 sm:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#181828] rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-300 mt-2 text-sm sm:text-base">Welcome, Admin!</p>
            </div>
            <button
              onClick={handleSignOut}
              className="border-[1px] border-red-500 text-red-500 px-4 py-2 rounded-md transition-colors text-sm sm:text-base hover:bg-red-500 hover:text-white self-start sm:self-auto"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div 
            className="bg-[#181828] rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/events")}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Manage Events</h3>
            <p className="text-gray-400 text-sm sm:text-base">Add, edit, or remove events</p>
          </div>
          <div 
            className="bg-[#181828] rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/teams")}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Manage Team Members</h3>
            <p className="text-gray-400 text-sm sm:text-base">Update team member information</p>
          </div>
          <div 
            className="bg-[#181828] rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/club-leads")}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Manage Club Leaders</h3>
            <p className="text-gray-400 text-sm sm:text-base">Add and manage club leads & co-leads</p>
          </div>
          <div 
            className="bg-[#181828] rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/alumni")}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Manage Alumni</h3>
            <p className="text-gray-400 text-sm sm:text-base">Add and manage club alumni</p>
          </div>
        </div>
      </div>
    </div>
  );
}