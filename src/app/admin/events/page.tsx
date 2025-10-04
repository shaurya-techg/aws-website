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
    <div className="min-h-screen bg-gradient-to-b from-[#180235] to-[#030012] pt-32 ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#181828] rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
              Manage Events
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-b from-[#843aed] to-[#4349ff] text-white px-4 py-2 rounded-lg transition-colors"
              >
                {showForm ? "Cancel" : "Add Event"}
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
            <h2 className="text-xl font-semibold text-white mb-4">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Date</label>
                  <input
                    name="date"
                    type="datetime-local"
                    required
                    className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Location</label>
                  <input
                    name="location"
                    type="text"
                    className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white mb-2">Event Link (Optional)</label>
                <input
                  name="link"
                  type="url"
                  placeholder="https://example.com/event-registration"
                  className="w-full p-3 rounded bg-[#23234a] text-white focus:outline-none focus:ring-2 focus:ring-[#843aed]"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Event Image</label>
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
                Create Event
              </button>
            </form>
          </div>
        )}

        <div className="bg-[#181828] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">All Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-400">No events found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-[#23234a] rounded-lg p-4">
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                  <p className="text-gray-300 text-sm mb-2">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </p>
                  {event.location && (
                    <p className="text-gray-300 text-sm mb-2">📍 {event.location}</p>
                  )}
                  {event.link && (
                    <div className="mb-3">
                      <a 
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#843aed] hover:bg-[#7c35d9] text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        🔗 Event Link
                      </a>
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(event.id)}
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