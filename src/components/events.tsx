'use client';
import left from '../../public/Left.svg'
import right from '../../public/Right.svg'
import React, { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import { getLatestEvents } from '@/actions/event-actions';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal']
});

interface EventSlide {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  location: string | null;
  link: string | null;
  imageUrl: string | null;
}

export default function Events() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState<EventSlide[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events } = await getLatestEvents(4);
        setEvents(events);
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
    <div className="py-8 sm:py-12 md:py-14 lg:py-16 px-3 sm:px-6 md:px-8 lg:px-10">
      <div className="mb-8 sm:mb-12 md:mb-14 lg:mb-16">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent ${inter.className}`}>
            Events
        </h1>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Main Slideshow Container */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm border-2 border-white/30">
          
          {/* Slides */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {events.map((event, index) => (
              <div key={event.id} className="w-full flex-shrink-0">
                <div className="flex flex-col lg:flex-row items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 h-48 sm:h-60 md:h-72 lg:h-full bg-gradient-to-br from-[#8504DE] to-[#4677FF] flex items-center justify-center overflow-hidden">
                    {event.imageUrl ? (
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold opacity-50 text-center px-2">
                        Event
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="mb-3 sm:mb-4">
                      <span className={`inline-block px-2 sm:px-3 py-1 backdrop-blur-sm border text-xs sm:text-sm font-semibold rounded-full ${
                        isEventEnded(event.date) 
                          ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                          : 'bg-green-500/20 border-green-500/30 text-green-300'
                      }`}>
                        {isEventEnded(event.date) ? 'Event Ended' : 'Upcoming Event'}
                      </span>
                    </div>
                    
                    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#FCD8FF] mb-3 sm:mb-4 leading-tight ${inter.className}`}>
                      {event.title}
                    </h2>
                    
                    <p className={`text-white text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 ${inter.className}`}>
                      {event.description || 'No description available'}
                    </p>
                    
                    <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                      <div className="flex items-center text-white text-sm sm:text-base">
                        <span className="font-semibold mr-2">📅 Date:</span>
                        <span>{formatDate(event.date)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-white text-sm sm:text-base">
                          <span className="font-semibold mr-2">📍 Location:</span>
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="relative inline-block">
                      {isEventEnded(event.date) ? (
                        <button 
                          className="relative px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-full text-sm sm:text-base border-2 border-red-500/30 text-red-300 bg-red-500/10 cursor-not-allowed"
                          disabled
                        >
                          Event Ended
                        </button>
                      ) : (
                        <button 
                          className="relative px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-full text-sm sm:text-base hover:scale-105 transition-all duration-300 border-2 border-transparent text-white bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm"
                          style={{
                            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 0.9)) padding-box, linear-gradient(45deg, #843aed, #4349ff) border-box'
                          }}
                          onClick={() => event.link && window.open(event.link, '_blank')}
                        >
                          <span className="bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
                            Learn More
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Responsive positioning */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 sm:-translate-x-12 lg:-translate-x-16 hover:bg-white/30 text-white p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all duration-300 z-10"
        >
          <img src={right.src} alt="Previous" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 sm:translate-x-12 lg:translate-x-16 hover:bg-white/30 text-white p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all duration-300 z-10"
        >
          <img src={left.src} alt="Next" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8 lg:mt-10">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative ${
                index === currentSlide 
                  ? 'p-0.5 sm:p-1 rounded-full bg-gradient-to-r from-[#090EDB] to-[#DA24BB]' 
                  : ''
              }`}
            >
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/60 hover:bg-white/80'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
