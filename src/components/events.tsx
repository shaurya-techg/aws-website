'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getLatestEvents } from '@/actions/event-actions';

interface EventSlide {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  time: string | null;
  location: string | null;
  link: string | null;
  imageUrl: string | null;
  tag: string | null;
}

export default function Events() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState<EventSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events } = await getLatestEvents(4);
        // Map the database result to ensure all fields are present
        const eventsWithTag = events.map(event => ({
          ...event,
          tag: event.tag || null,
          time: event.time || null
        }));
        setEvents(eventsWithTag);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (events.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [events.length]);

  // Function to check if event has ended
  const isEventEnded = (eventDate: Date) => {
    if (!isClient) return false; // Prevent hydration mismatch
    return new Date() > new Date(eventDate);
  };

  // Function to format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  // Conditional rendering after all hooks
  if (loading) {
    return (
      <div className="w-full py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">No Events Available</h2>
        <p className="text-gray-400">Check back later for upcoming events!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      
      {/* Single Event Display - Increased Size */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-lg border border-purple-400/20 shadow-2xl">
        
        {/* Event Content */}
        <div className="p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Event Image */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none h-80 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20 shadow-xl">
                {events[currentSlide]?.imageUrl ? (
                  <Image 
                    src={events[currentSlide].imageUrl} 
                    alt={events[currentSlide].title}
                    width={600}
                    height={480}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-9xl mb-6">🎉</div>
                      <span className="text-2xl font-medium">Event Image</span>
                      <p className="text-lg text-gray-500 mt-3">Coming Soon</p>
                    </div>
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  {isEventEnded(events[currentSlide]?.date) ? (
                    <div className="px-5 py-3 bg-gray-500/90 backdrop-blur-md rounded-full text-white text-base font-bold border border-gray-400/50 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span>ENDED</span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-5 py-3 bg-green-500/90 backdrop-blur-md rounded-full text-white text-base font-bold border border-green-400/50 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                        <span>UPCOMING</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Event Details */}
            <div className="order-1 lg:order-2 flex flex-col justify-between h-full text-center lg:text-left">
              
              {/* Top Content */}
              <div className="space-y-2 sm:space-y-4">
                {/* Title */}
                <div className="flex flex-col items-center lg:items-start">
                  {/* Tag */}
                  {events[currentSlide]?.tag && (
                    <div className="mb-2">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#843aed] to-[#4349ff] text-white text-lg font-medium rounded-full">
                        {events[currentSlide].tag}
                      </span>
                    </div>
                  )}
                  
                  <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight mb-2 sm:mb-4">
                    {events[currentSlide]?.title}
                  </h2>
                  <div className="h-1.5 w-20 sm:w-24 lg:w-28 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </div>
                
                {/* Event Info */}
                <div className="space-y-4 sm:space-y-6 lg:space-x-6 flex flex-col lg:flex-row items-center lg:items-start">
                  <div className="flex items-center text-purple-300">
                    <svg className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 mr-3 sm:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-base sm:text-lg lg:text-xl font-medium">
                      {events[currentSlide] ? formatDate(events[currentSlide].date) : ''}
                      {events[currentSlide]?.time && (
                        <span className="text-blue-300 ml-2">• {events[currentSlide].time}</span>
                      )}
                    </span>
                  </div>
                  
                  {events[currentSlide]?.location && (
                    <div className="flex items-center text-blue-300">
                      <svg className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 mr-3 sm:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="text-base sm:text-lg lg:text-xl font-medium">
                        {events[currentSlide].location}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                {events[currentSlide]?.description && (
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 sm:p-4 border border-slate-600/30 max-w-2xl mx-auto lg:mx-0">
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {events[currentSlide].description}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action Button - Always at bottom */}
              <div className="mt-6 flex items-center justify-center lg:justify-start">
                {events[currentSlide]?.link ? (
                  <a 
                    href={events[currentSlide].link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 group text-base sm:text-lg"
                  >
                    <span>View Event Details</span>
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <div className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 group text-base sm:text-lg"
                  >
                    <span>View Event Details</span>
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-6 flex items-center">
          <button
            onClick={prevSlide}
            disabled={events.length <= 1}
            className="p-4 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-6 flex items-center">
          <button
            onClick={nextSlide}
            disabled={events.length <= 1}
            className="p-4 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
      </div>
      
      {/* Dot Indicators - Outside the box */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-3">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-150 ${
                index === currentSlide 
                  ? 'w-10 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full' 
                  : 'w-4 h-4 bg-gray-500 hover:bg-gray-400 rounded-full'
              }`}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
}
