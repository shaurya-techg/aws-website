"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClubLead, getClubLeads, deleteClubLead } from "@/actions/club-lead-actions";
import { toast, Toaster } from "sonner";

export default function ManageClubLeads() {
  const router = useRouter();
  const [clubLeads, setClubLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    
    fetchClubLeads();
  }, [router]);

  const fetchClubLeads = async () => {
    const result = await getClubLeads();
    if (result.clubLeads) {
      setClubLeads(result.clubLeads);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await createClubLead(formData);
    if (result.success) {
      toast.success("Club lead created successfully!");
      setShowForm(false);
      fetchClubLeads();
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "Failed to create club lead");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this club lead?")) {
      const result = await deleteClubLead(id);
      if (result.success) {
        toast.success("Club lead deleted successfully!");
        fetchClubLeads();
      } else {
        toast.error("Failed to delete club lead");
      }
    }
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#181828] rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
              Manage Club Leaders
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-4 py-2 rounded-lg transition-colors"
              >
                {showForm ? "Cancel" : "Add Club Leader"}
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-[#181828] rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Club Leader</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Role</label>
                  <select
                    name="role"
                    required
                    className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                  >
                    <option value="">Select Role</option>
                    <option value="Lead">Lead</option>
                    <option value="Co-Lead">Co-Lead</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <label className="block text-white mb-2">Title (Optional)</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="e.g., President, Vice President"
                    className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white mb-2">Bio/Description</label>
                <textarea
                  name="bio"
                  rows={3}
                  className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                />
              </div>
              <div>
                <label className="block text-white mb-2">LinkedIn URL</label>
                <input
                  name="linkedin"
                  type="url"
                  className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Profile Photo</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform"
              >
                Add Club Leader
              </button>
            </form>
          </div>
        )}

        <div className="bg-[#181828] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Club Leaders</h2>
          {clubLeads.length === 0 ? (
            <p className="text-gray-400">No club leaders found.</p>
          ) : (
            <div className="space-y-6">
              {/* Group by role */}
              {["Lead", "Co-Lead"].map((role) => {
                const roleLeads = clubLeads.filter(lead => lead.role === role);
                if (roleLeads.length === 0) return null;
                
                return (
                  <div key={role} className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#843aed] border-b border-[#843aed] pb-2">
                      {role}s ({roleLeads.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {roleLeads.map((lead) => (
                        <div key={lead.id} className="bg-[#23234a] rounded-lg p-4">
                          {lead.imageUrl && (
                            <img
                              src={lead.imageUrl}
                              alt={lead.name}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                          )}
                          <h4 className="text-lg font-semibold text-white mb-1">{lead.name}</h4>
                          {lead.title && (
                            <p className="text-[#843aed] text-sm mb-2">{lead.title}</p>
                          )}
                          <p className="text-gray-400 text-sm mb-2">Role: {lead.role}</p>
                          {lead.year && (
                            <p className="text-gray-400 text-sm mb-2">Year: {lead.year}</p>
                          )}
                          {lead.bio && (
                            <p className="text-gray-400 text-sm mb-3">{lead.bio}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {lead.email && (
                              <a 
                                href={`mailto:${lead.email}`}
                                className="text-blue-400 text-sm hover:underline"
                              >
                                Email
                              </a>
                            )}
                            {lead.phone && (
                              <a 
                                href={`tel:${lead.phone}`}
                                className="text-green-400 text-sm hover:underline"
                              >
                                Phone
                              </a>
                            )}
                            {lead.linkedin && (
                              <a 
                                href={lead.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 text-sm hover:underline"
                              >
                                LinkedIn
                              </a>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs bg-[#843aed] text-white px-2 py-1 rounded">
                              Priority: {lead.priority}
                            </span>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}