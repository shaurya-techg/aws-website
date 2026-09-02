"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createTeamMember, getTeamMembers, deleteTeamMember } from "@/actions/team-member-actions";
import { toast, Toaster } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string | null;
  linkedin: string | null;
  imageUrl?: string | null;
}

export default function ManageTeamMembers() {
  const router = useRouter();
  const [SW, setSW] = useState<TeamMember[]>([]);
  const [AI, setAI] = useState<TeamMember[]>([]);
  const [CC, setCC] = useState<TeamMember[]>([]);
  const [DE, setDE] = useState<TeamMember[]>([]);
  const [PR, setPR] = useState<TeamMember[]>([]);
  const [SM, setSM] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [visibleDepartments, setVisibleDepartments] = useState<{[key: string]: boolean}>({
    SW: false,
    AI: false,
    CC: false,
    DE: false,
    PR: false,
    SM: false
  });
  const departments = [SW, AI, CC, DE, PR, SM];
  const departmentKeys = ['SW', 'AI', 'CC', 'DE', 'PR', 'SM'];
  const departmentNames = ['Software Development', 'Artificial Intelligence', 'Cloud Computing', 'Design', 'PR & Social Media', 'Sponsors'];

  const toggleDepartment = (deptKey: string) => {
    setVisibleDepartments(prev => ({
      ...prev,
      [deptKey]: !prev[deptKey]
    }));
  };

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
    if (result.SW) {
      setSW(result.SW);
    }
    if (result.AI) {
      setAI(result.AI);
    }
    if (result.DE) {
      setDE(result.DE);
    }
    if (result.CC) {
      setCC(result.CC);
    }
    if (result.PR) {
      setPR(result.PR);
    }
    if (result.SM) {
      setSM(result.SM);
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
        <div className="bg-[#181828] rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
              Manage Team Members
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                {showForm ? "Cancel" : "Add Team Member"}
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
          <div className="bg-[#181828] rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Add New Team Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">Position</label>
                  <select
                    name="position"
                    required
                    className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                  >
                    <option value="">Select Position</option>
                    <option value="Lead">Lead</option>
                    <option value="Co-Lead">Co-Lead</option>
                    <option value="Member">Member</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">LinkedIn URL</label>
                <input
                  name="linkedin"
                  type="url"
                  className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Department</label>
                <select
                  name="department"
                  className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                >                
                  <option value="">Select Department</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Design">Design</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="PR & Social Media">PR & Social Media</option>
                  <option value="Sponsors">Sponsors</option>
                </select>
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Profile Photo</label>
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
              </div>
              <button
                type="submit"
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition-transform text-sm sm:text-base w-full sm:w-auto"
              >
                Add Team Member
              </button>
            </form>
          </div>
        )}
        {departments.map((dept, index) => {
          const deptKey = departmentKeys[index];
          const deptName = departmentNames[index];
          const isVisible = visibleDepartments[deptKey];
          
          return dept.length === 0 ? null : (
            <div key={deptKey} className="bg-[#181828] rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  {deptName} ({dept.length})
                </h2>
                <button
                  onClick={() => toggleDepartment(deptKey)}
                  className="flex items-center gap-2 bg-[#23234a] hover:bg-[#2a2a4a] text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                >
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isVisible ? 'rotate-180' : 'rotate-0'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isVisible ? 'Hide' : 'Show'} Members
                </button>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-250 ease-in-out ${
                  isVisible ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 pt-2">
                  {dept.map((member) => (
                    <div 
                      key={member.id} 
                      className="bg-[#23234a] rounded-lg p-3 sm:p-4 transform transition-all duration-300 hover:scale-105 hover:bg-[#2a2a4a]"
                    >
                      <Image
                        src={member.imageUrl || '/placeholder.jpg'}
                        alt={member.name}
                        width={400}
                        height={200}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg mb-3 sm:mb-4"
                      />
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-2">{member.name}</h4>
                      <p className="text-[#843aed] text-xs sm:text-sm mb-2">{member.position}</p>
                      <div className="flex gap-2 mb-3">
                        {member.linkedin && (
                          <a 
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 text-xs sm:text-sm hover:underline transition-colors"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    <Toaster position="top-center" />
  </div>
  );
}