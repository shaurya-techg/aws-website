"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTeamMember, getTeamMembers, deleteTeamMember } from "@/actions/team-member-actions";
import { toast, Toaster } from "sonner";

export default function ManageTeamMembers() {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    
    fetchTeamMembers();
  }, [router]);

  const fetchTeamMembers = async () => {
    const result = await getTeamMembers();
    if (result.teamMembers) {
      setTeamMembers(result.teamMembers);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await createTeamMember(formData);
    if (result.success) {
      toast.success("Team member created successfully!");
      setShowForm(false);
      fetchTeamMembers();
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "Failed to create team member");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      const result = await deleteTeamMember(id);
      if (result.success) {
        toast.success("Team member deleted successfully!");
        fetchTeamMembers();
      } else {
        toast.error("Failed to delete team member");
      }
    }
  };

  // Filter team members by department
  const filteredMembers = selectedDepartment === "all" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  // Get unique departments for filter dropdown
  const departments = ["all", ...new Set(teamMembers.map(member => member.department).filter(Boolean))];

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
              Manage Team Members
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-4 py-2 rounded-lg transition-colors"
              >
                {showForm ? "Cancel" : "Add Team Member"}
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
          
          {/* Department Filter */}
          <div className="flex items-center gap-4">
            <label className="text-white font-medium">Filter by Department:</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-[#23234a] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843aed]"
            >
              <option value="all">All Departments</option>
              {departments.filter(dept => dept !== "all").map((dept) => (
                <option key={dept} value={dept}>
                  {dept || "No Department"}
                </option>
              ))}
            </select>
            <span className="text-gray-400 text-sm">
              ({filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''})
            </span>
          </div>
        </div>

        {showForm && (
          <div className="bg-[#181828] rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Team Member</h2>
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
                  <label className="block text-white mb-2">Position/Role</label>
                  <input
                    name="position"
                    type="text"
                    required
                    className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                  />
                </div>
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
                <label className="block text-white mb-2">Department</label>
                <select
                  name="department"
                  className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Software Development</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Artificial Intelligence</option>
                  <option value="Sales">Cloud Computing</option>
                  <option value="HR">PR & Sponsorship</option>
                  <option value="Finance">Social Media</option>
                </select>
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
                Add Team Member
              </button>
            </form>
          </div>
        )}

        <div className="bg-[#181828] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {selectedDepartment === "all" ? "All Team Members" : `${selectedDepartment} Department`}
          </h2>
          {filteredMembers.length === 0 ? (
            <p className="text-gray-400">
              {selectedDepartment === "all" ? "No team members found." : `No members found in ${selectedDepartment} department.`}
            </p>
          ) : selectedDepartment === "all" ? (
            // Group by department when showing all
            <div className="space-y-8">
              {departments.filter(dept => dept !== "all").map((department) => {
                const deptMembers = teamMembers.filter(member => member.department === department);
                if (deptMembers.length === 0) return null;
                
                return (
                  <div key={department || "no-dept"} className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#843aed] border-b border-[#843aed] pb-2">
                      {department || "No Department"} ({deptMembers.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {deptMembers.map((member) => (
                        <div key={member.id} className="bg-[#23234a] rounded-lg p-4">
                          {member.imageUrl && (
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                          )}
                          <h4 className="text-lg font-semibold text-white mb-2">{member.name}</h4>
                          <p className="text-[#843aed] text-sm mb-2">{member.position}</p>
                          <div className="flex gap-2 mb-3">
                            {member.linkedin && (
                              <a 
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 text-sm hover:underline"
                              >
                                LinkedIn
                              </a>
                            )}
                          </div>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Show filtered members for specific department
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-[#23234a] rounded-lg p-4">
                  {member.imageUrl && (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-[#843aed] text-sm mb-2">{member.position}</p>
                  <div className="flex gap-2 mb-3">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
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