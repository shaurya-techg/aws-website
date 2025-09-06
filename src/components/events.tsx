'use client';
import left from '../../public/Left.svg'
import right from '../../public/Right.svg'
import React, { useState, useEffect } from 'react';
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal']
});

interface EventSlide {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  category: string;
}

export default function Events() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: EventSlide[] = [
    {
      id: 1,
      title: "AWS Cloud Fundamentals Workshop",
      description: "Join us for an intensive hands-on workshop covering AWS Cloud basics, EC2, S3, and Lambda functions. Perfect for beginners!",
      date: "March 15, 2025",
      location: "GGSIPU Campus, Room 301",
      image: "/events/aws-workshop.jpg",
      category: "Workshop"
    },
    {
      id: 2,
      title: "AI/ML with AWS SageMaker",
      description: "Explore machine learning capabilities with AWS SageMaker. Build, train, and deploy ML models in the cloud.",
      date: "March 22, 2025",
      location: "Virtual Event",
      image: "/events/ai-ml-event.jpg",
      category: "Seminar"
    },
    {
      id: 3,
      title: "Cloud Security Best Practices",
      description: "Learn about AWS security services, IAM, encryption, and compliance. Essential for cloud professionals.",
      date: "March 29, 2025",
      location: "GGSIPU Auditorium",
      image: "/events/security-event.jpg",
      category: "Conference"
    },
    {
      id: 4,
      title: "DevOps with AWS Pipeline",
      description: "Master CI/CD pipelines using AWS CodeCommit, CodeBuild, and CodeDeploy. Build automated deployment workflows.",
      date: "April 5, 2025",
      location: "Tech Lab, GGSIPU",
      image: "/events/devops-event.jpg",
      category: "Bootcamp"
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="py-8 sm:py-12 md:py-14 lg:py-16 px-3 sm:px-6 md:px-8 lg:px-10">
      <div className="mb-8 sm:mb-12 md:mb-14 lg:mb-16">
        <h1 className={`text-4xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold text-center bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent ${inter.className}`}>
            Events
        </h1>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Slideshow Container */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm border-2 border-white/30">
          
          {/* Slides */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className="w-full flex-shrink-0">
                <div className="flex flex-col lg:flex-row items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 h-48 sm:h-60 md:h-72 lg:h-full bg-gradient-to-br from-[#8504DE] to-[#4677FF] flex items-center justify-center">
                    <div className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold opacity-50 text-center px-2">
                      {slide.category}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="mb-3 sm:mb-4">
                      <span className="inline-block px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs sm:text-sm font-semibold rounded-full">
                        {slide.category}
                      </span>
                    </div>
                    
                    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#FCD8FF] mb-3 sm:mb-4 leading-tight ${inter.className}`}>
                      {slide.title}
                    </h2>
                    
                    <p className={`text-white text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 ${inter.className}`}>
                      {slide.description}
                    </p>
                    
                    <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                      <div className="flex items-center text-white text-sm sm:text-base">
                        <span className="font-semibold mr-2">📅 Date:</span>
                        <span>{slide.date}</span>
                      </div>
                      <div className="flex items-center text-white text-sm sm:text-base">
                        <span className="font-semibold mr-2">📍 Location:</span>
                        <span>{slide.location}</span>
                      </div>
                    </div>
                    
                    <div className="relative inline-block">
                      <button 
                        className="relative px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-full text-sm sm:text-base hover:scale-105 transition-all duration-300 border-2 border-transparent text-white bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm"
                        style={{
                          background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 0.9)) padding-box, linear-gradient(45deg, #843aed, #4349ff) border-box'
                        }}
                      >
                        <span className="bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
                          Register Now
                        </span>
                      </button>
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
          {slides.map((_, index) => (
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
