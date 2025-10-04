'use client';
import React from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
}

export default function PhotoGallery() {
  const photos: Photo[] = [
    {
      id: 1,
      src: "/gallery/aws-workshop-1.jpg",
      alt: "AWS Workshop Session 1",
      size: "large"
    },
    {
      id: 2,
      src: "/gallery/team-meeting-1.jpg",
      alt: "Team Meeting",
      size: "small"
    },
    {
      id: 3,
      src: "/gallery/cloud-presentation.jpg",
      alt: "Cloud Presentation",
      size: "medium"
    },
    {
      id: 4,
      src: "/gallery/aws-certification.jpg",
      alt: "AWS Certification Event",
      size: "small"
    },
    {
      id: 5,
      src: "/gallery/hackathon-2024.jpg",
      alt: "AWS Hackathon 2024",
      size: "large"
    },
    {
      id: 6,
      src: "/gallery/guest-speaker.jpg",
      alt: "Guest Speaker Session",
      size: "medium"
    },
    {
      id: 7,
      src: "/gallery/team-building.jpg",
      alt: "Team Building Activity",
      size: "small"
    },
    {
      id: 8,
      src: "/gallery/aws-summit.jpg",
      alt: "AWS Summit Participation",
      size: "medium"
    }
  ];

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2';
      case 'medium':
        return 'col-span-1 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2';
      case 'small':
        return 'col-span-1 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent mb-6 sm:mb-8 lg:mb-12">
        Our Journey
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px]">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`${getSizeClasses(photo.size)} relative group overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300`}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#843aed]/20 to-[#4349ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl"></div>
            
            {/* Photo Container */}
            <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              
              {/* Photo Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-2 lg:p-3 bg-gradient-to-t from-black/90 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs sm:text-sm font-semibold leading-tight truncate">
                  {photo.alt}
                </p>
              </div>
            </div>

            {/* Hover Border Glow */}
            <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{
                   background: 'linear-gradient(transparent, transparent) padding-box, linear-gradient(45deg, #843aed, #4349ff) border-box',
                   border: '1px solid transparent'
                 }}>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Photos Button */}
      <div className="flex justify-center mt-6 sm:mt-8 lg:mt-12">
        <div className="relative inline-block">
          <button 
            className="relative px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 font-semibold rounded-full text-xs sm:text-sm lg:text-base hover:scale-105 transition-all duration-300 border-2 border-transparent text-white"
            style={{
              background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 0.9)) padding-box, linear-gradient(45deg, #843aed, #4349ff) border-box'
            }}
          >
            <span className="bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
              View All Photos
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
