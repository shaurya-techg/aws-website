"use client";
import React, { useEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPastEvents } from "@/actions/event-actions";
import { motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  date: Date;
  time: string | null;
  location: string | null;
  link: string | null;
  tag: string | null;
}

const EventsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getPastEvents(50); // Get latest 50 past events
        if (result.events) {
          // Map the database result to ensure all fields are present
          const eventsWithTag = result.events.map((event: Event) => ({
            ...event,
            tag: event.tag || null,
            time: event.time || null
          }));
          setEvents(eventsWithTag);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && lineRef.current) {
      // Create GSAP timeline animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Start when section top hits bottom of viewport
          end: "bottom center", // End when section bottom hits center of viewport
          scrub: 1, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          onUpdate: (self) => {
            // Optional: Add debug logging
            console.log('GSAP Progress:', self.progress.toFixed(2));
          }
        }
      });

      // Animate the line height from 0% to 100% based on scroll progress
      tl.fromTo(lineRef.current, 
        { 
          height: "0%",
          transformOrigin: "top"
        },
        { 
          height: "100%",
          ease: "none" // Linear animation for direct scroll correlation
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Helper function to format database events for EventCard component
  const formatEventForCard = (event: Event) => {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: '2-digit' 
    });
    
    return {
      title: event.title,
      description: event.description || "No description available",
      date: formattedDate,
      time: event.time || "TBD", // Use the actual time field from database
      location: event.location || "Location TBD",
      image: event.imageUrl || "/images/default-event.jpg",
      link: event.link || "#",
      tag: event.tag || undefined
    };
  };

  return (
    <div ref={sectionRef} className="relative py-16 sm:pb-20 lg:pb-28 bg-transparent">
      <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-[#FCD8FF] to-[#843aed] bg-clip-text text-transparent">
            Past Events
          </span>
        </motion.h2>
      <div className="relative mt-16 flex flex-col items-center">
        {/* Vertical timeline line - background */}
        <div className="absolute left-8 sm:left-12 lg:left-1/2 transform lg:-translate-x-1/2 w-[3px] bg-gradient-to-b from-transparent via-[#FCD8FF]/10 to-transparent top-0 bottom-0 rounded-full"></div>
        
        {/* Vertical timeline line - animated */}
        <div 
          ref={lineRef}
          className="absolute left-8 sm:left-12 lg:left-1/2 transform lg:-translate-x-1/2 w-[3px] bg-gradient-to-b from-[#FCD8FF]/80 via-[#FCD8FF]/60 to-[#FCD8FF]/20 top-0 rounded-full shadow-[0_0_16px_#FCD8FF]/50"
          style={{
            height: "0%",
            transformOrigin: "top"
          }}
        />

        {/* Event cards */}
        <div className="relative w-full max-w-6xl mx-auto flex flex-col gap-28 sm:gap-32">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCD8FF]"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#FCD8FF]/70 text-lg">No events available at the moment.</p>
            </div>
          ) : (
            events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) {
                    gsap.fromTo(el, 
                      { 
                        opacity: 0, 
                        y: 50 
                      },
                      {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: 0.3,
                        ease: "power2.out",
                        scrollTrigger: {
                          trigger: el,
                          start: "top 80%",
                          end: "top 50%",
                          toggleActions: "play none none reverse"
                        }
                      }
                    );
                  }
                }}
                className={`relative flex flex-row items-center ${
                  isLeft
                    ? "lg:justify-center lg:pr-[50%]"
                    : "lg:justify-center lg:pl-[50%]"
                }`}
              >
                {/* Event content */}
                <div
                  className={`w-full ml-16 sm:ml-20 lg:ml-0 lg:w-[65%] z-10`}
                >
                  <EventCard {...formatEventForCard(event)} />
                </div>

                {/* Timeline dot for past events */}
                <div className={`absolute left-[32px] sm:left-[48px] lg:left-1/2 transform -translate-x-1/2 lg:-translate-x-1/2 rounded-full w-5 h-5 border-4 border-[#1E1E1E] z-20 bg-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.5)]`}></div>

              </div>
            );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
