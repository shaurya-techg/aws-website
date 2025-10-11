"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEvent, getEvents, deleteEvent } from "@/actions/event-actions";
import { toast, Toaster } from "sonner";

export default function ManageEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    
    fetchEvents();
  }, [router]);

  const fetchEvents = async () => {
    const result = await getEvents();
    if (result.events) {
      setEvents(result.events);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await createEvent(formData);
    if (result.success) {
      toast.success("Event created successfully!");
      setShowForm(false);
      fetchEvents();
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "Failed to create event");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const result = await deleteEvent(id);
      if (result.success) {
        toast.success("Event deleted successfully!");
        fetchEvents();
      } else {
        toast.error("Failed to delete event");
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
        <div className="bg-[#181828] rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
              Manage Events
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                {showForm ? "Cancel" : "Add Event"}
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
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">Date</label>
                  <input
                    name="date"
                    type="datetime-local"
                    required
                    className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">Location</label>
                  <input
                    name="location"
                    type="text"
                    className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Event Link (Optional)</label>
                <input
                  name="link"
                  type="url"
                  placeholder="https://example.com/event-registration"
                  className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Event Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full p-2 sm:p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed] text-sm sm:text-base file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-[#843aed] file:text-white file:cursor-pointer"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition-transform text-sm sm:text-base w-full sm:w-auto"
              >
                Create Event
              </button>
            </form>
          </div>
        )}

        <div className="bg-[#181828] rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">All Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-400 text-sm sm:text-base">No events found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-[#23234a] rounded-lg p-3 sm:p-4">
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-36 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
                    />
                  )}
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">{event.description}</p>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </p>
                  {event.location && (
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">📍 {event.location}</p>
                  )}
                  {event.link && (
                    <div className="mb-3">
                      <a 
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#843aed] hover:bg-[#7c35d9] text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors"
                      >
                        🔗 Event Link
                      </a>
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors w-full sm:w-auto"
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