"use client";
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import EventsSection from '@/components/EventsSection'
import { motion, useInView } from 'framer-motion'
import { getUpcomingEvents } from '@/actions/event-actions'
import EVE from "../../../public/EVE.png";
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

const UpcomingEventsSlideshow = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const result = await getUpcomingEvents(5);
        if (result.events) {
          setEvents(result.events);
        }
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [events.length]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 p-6 sm:p-8">
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-purple-500/20 rounded mb-4 w-48 sm:w-64 mx-auto"></div>
              <div className="h-48 sm:h-64 md:h-80 bg-purple-500/10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-[#FCD8FF] to-[#843aed] bg-clip-text text-transparent">
            Upcoming Events
          </span>
        </motion.h2>

        <motion.div
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {events.length === 0 ? (
            // No events state with same structure
            <div className="p-6 sm:p-8 md:p-12 text-center">
              <div className="mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                  <Image src={EVE} alt="No Upcoming Events" width={48} height={48} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mb-2 sm:mb-4">No Upcoming Events</h3>
                <p className="text-white/60 text-base sm:text-lg md:text-xl">
                  We&apos;re brewing something exciting—upcoming events will be announced soon!
                </p>
              </div>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-purple-500/30 rounded-full"></div>
                ))}
              </div>
            </div>
          ) : (
            // Events slideshow
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentSlide * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {events.map((event) => (
                    <div key={event.id} className="w-full flex-shrink-0">
                      <div className="p-6 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                        {/* Event Image */}
                        <div className="order-2 md:order-1">
                          {event.imageUrl ? (
                            <Image
                              src={event.imageUrl}
                              alt={event.title}
                              width={600}
                              height={400}
                              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl"
                            />
                          ) : (
                            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                              <span className="text-4xl sm:text-5xl md:text-6xl">🎉</span>
                            </div>
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="order-1 md:order-2 space-y-3 sm:space-y-4">
                          {event.tag && (
                            <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-[#843aed]/80 to-[#4349ff]/80 text-white text-xs sm:text-sm rounded-full">
                              {event.tag}
                            </span>
                          )}
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                            {event.title}
                          </h3>
                          {event.description && (
                            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
                              {event.description}
                            </p>
                          )}
                          <div className="space-y-1 sm:space-y-2 text-white/70 text-sm sm:text-base">
                            <div className="flex items-center space-x-2">
                              <span>📅</span>
                              <span>{formatDate(event.date)}</span>
                              {event.time && (
                                <>
                                  <span>•</span>
                                  <span>🕒 {event.time}</span>
                                </>
                              )}
                            </div>
                            {event.location && (
                              <div className="flex items-center space-x-2">
                                <span>📍</span>
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          {event.link && (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#843aed] to-[#4349ff] text-white text-sm sm:text-base rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                              Learn More
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Slide indicators */}
              {events.length > 1 && (
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {events.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide
                          ? 'bg-purple-500 scale-110'
                          : 'bg-purple-500/30 hover:bg-purple-500/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Page = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className='mt-20 sm:mt-28 relative min-h-screen'>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#843aed]/20 to-[#4349ff]/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-l from-[#FCD8FF]/15 to-[#843aed]/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-[#4349ff]/10 to-[#FCD8FF]/20 rounded-full blur-3xl opacity-40"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FCD8FF]/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#843aed]/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-[#4349ff]/35 rounded-full animate-pulse"></div>
      </div>

      <div ref={ref} className="relative z-10">
        <motion.div 
              className="text-center mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="inline-block relative"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                  <span className="bg-gradient-to-r from-[#843aed] via-[#4349ff] to-[#843aed] bg-clip-text text-transparent bg-300% animate-gradient">
                    Our AWSome Events
                  </span>
                </h1>
              </motion.div>
              
              <motion.div
                className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#843aed] to-transparent mx-auto"
                initial={{ width: 0 }}
                animate={isInView ? { width: "200px" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Added descriptive text */}
              <motion.div
                className="mt-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                  Celebrating the journey of AWS, where every event is not just a gathering, but a{" "}
                  <span className="bg-gradient-to-r from-[#FCD8FF] to-[#843aed] bg-clip-text text-transparent font-medium">
                    milestone
                  </span>{" "}
                  that reflects our spirit, creativity, and togetherness.
                </p>
              </motion.div>
            </motion.div>
      </div>
        
        {/* Upcoming Events Slideshow */}
        <UpcomingEventsSlideshow />
        
        <EventsSection />
    </div>
  )
}

export default Page