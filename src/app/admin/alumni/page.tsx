"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createAlumni, getAlumni, deleteAlumni, updateAlumni } from "@/actions/alumni-actions";
import { toast, Toaster } from "sonner";

interface Alumni {
  id: string;
  name: string;
  role: string;
  session: string;
  linkedin?: string | null;
  imageUrl?: string | null;
}

export default function ManageAlumni() {
  const router = useRouter();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    
    fetchAlumni();
  }, [router]);

  const fetchAlumni = async () => {
    const result = await getAlumni();
    if (result.alumni) {
      setAlumni(result.alumni);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    let result;
    if (editingAlumni) {
      result = await updateAlumni(editingAlumni.id, formData);
    } else {
      result = await createAlumni(formData);
    }

    if (result.success) {
      toast.success(`Alumni ${editingAlumni ? 'updated' : 'created'} successfully!`);
      setShowForm(false);
      setEditingAlumni(null);
      fetchAlumni();
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || `Failed to ${editingAlumni ? 'update' : 'create'} alumni`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this alumni?")) {
      const result = await deleteAlumni(id);
      if (result.success) {
        toast.success("Alumni deleted successfully!");
        fetchAlumni();
      } else {
        toast.error("Failed to delete alumni");
      }
    }
  };

  const handleEdit = (alumniMember: Alumni) => {
    setEditingAlumni(alumniMember);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingAlumni(null);
    setShowForm(false);
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#181828] rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
              Manage Alumni
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  if (editingAlumni) handleCancelEdit();
                }}
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                {showForm ? "Cancel" : "Add Alumni"}
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-[#181828] rounded-xl p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
              {editingAlumni ? 'Edit Alumni' : 'Add New Alumni'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={editingAlumni?.name || ''}
                    className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">Role/Position</label>
                  <input
                    name="role"
                    type="text"
                    required
                    defaultValue={editingAlumni?.role || ''}
                    placeholder="e.g., Former Lead, Co-Lead, Technical Lead"
                    className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">Session</label>
                  <input
                    name="session"
                    type="text"
                    required
                    defaultValue={editingAlumni?.session || ''}
                    placeholder="e.g., 2020-2024, 2019-2023"
                    className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">LinkedIn URL (Optional)</label>
                  <input
                    name="linkedin"
                    type="url"
                    defaultValue={editingAlumni?.linkedin || ''}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Profile Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 1024 * 1024) { // 1MB limit
                      toast.warning("Image size should be less than 1MB. Please choose a smaller image.");
                      e.target.value = '';
                    }
                  }}
                  className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                />
                <p className="text-gray-400 text-xs mt-1">Maximum file size: 1MB</p>
                {editingAlumni?.imageUrl && (
                  <p className="text-gray-400 text-xs mt-1">Current image will be kept if no new image is uploaded</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform text-sm sm:text-base"
              >
                {editingAlumni ? 'Update Alumni' : 'Add Alumni'}
              </button>
            </form>
          </div>
        )}

        <div className="bg-[#181828] rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">All Alumni</h2>
          {alumni.length === 0 ? (
            <p className="text-gray-400 text-sm sm:text-base">No alumni found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {alumni.map((alumniMember) => (
                <div key={alumniMember.id} className="bg-[#23234a] rounded-lg p-3 sm:p-4">
                  {alumniMember.imageUrl && (
                    <Image
                      src={alumniMember.imageUrl}
                      alt={alumniMember.name}
                      width={400}
                      height={200}
                      className="w-full h-36 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
                    />
                  )}
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{alumniMember.name}</h3>
                  <p className="text-[#843aed] text-xs sm:text-sm mb-2">{alumniMember.role}</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3">Session: {alumniMember.session}</p>
                  
                  {alumniMember.linkedin && (
                    <div className="mb-3">
                      <a 
                        href={alumniMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors"
                      >
                        🔗 LinkedIn
                      </a>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleEdit(alumniMember)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(alumniMember.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}