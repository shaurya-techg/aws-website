'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface Alumni {
  id: string;
  name: string;
  role: string;
  session: string;
  imageUrl?: string;
  linkedin?: string;
}

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isClient) {
      fetchAlumni();
    }
  }, [isClient]);

  const fetchAlumni = async () => {
    try {
      console.log('Fetching alumni...');
      const response = await fetch('/api/alumni');
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('API result:', result);
      if (result.alumni) {
        setAlumni(result.alumni);
        console.log('Alumni set:', result.alumni.length, 'items');
      } else {
        console.log('No alumni in result');
      }
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setLoading(false);
      console.log('Loading set to false');
    }
  };
  console.log('Rendering alumni page, alumni count:', alumni.length);
  
  return (
    <div className="min-h-screen">
      <div ref={ref} className="max-w-7xl mx-auto px-4 py-20 sm:py-28">
        {/* Hero Section with Sliding Animation */}
        {isClient ? (
          <motion.div 
            className="text-center mb-16 sm:mb-24"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-block relative"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                <span className="bg-gradient-to-r from-[#843aed] via-[#4349ff] to-[#843aed] bg-clip-text text-transparent bg-300% animate-gradient">
                  Our Alumni
                </span>
              </h1>
            </motion.div>
            
            <motion.div
              className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#843aed] to-transparent mx-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: "200px" } : { width: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.div>
        ) : (
          <div className="text-center mb-16 sm:mb-24">
            <div className="inline-block relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                <span className="bg-gradient-to-r from-[#843aed] via-[#4349ff] to-[#843aed] bg-clip-text text-transparent bg-300% animate-gradient">
                  Our Alumni
                </span>
              </h1>
            </div>
            <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#843aed] to-transparent mx-auto w-[200px]" />
          </div>
        )}

        {/* Alumni Grid */}
        {loading ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-[#843aed] border-r-[#4349ff]"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-b-[#843aed]/30 border-l-[#4349ff]/30"></div>
            </div>
            <p className="mt-6 text-white text-lg font-medium">Loading Alumni...</p>
          </motion.div>
        ) : isClient ? (
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
              {alumni.map((alumniMember, index) => (
                <motion.div
                  key={alumniMember.id}
                  className="group backdrop-blur-sm rounded-xl lg:rounded-2xl pb-3 sm:pb-4 lg:pb-6 border-2 border-white/40 hover:border-[#843aed]/50 transition-all duration-300 hover:transform hover:scale-105"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  {/* Profile Image */}
                  <div className="relative mb-2 sm:mb-3 lg:mb-4">
                    {alumniMember.imageUrl ? (
                      <Image
                        src={alumniMember.imageUrl}
                        alt={alumniMember.name}
                        width={400}
                        height={250}
                        className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-t-lg lg:rounded-t-xl border-2 border-transparent group-hover:border-[#843aed]/30 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-[#843aed]/20 to-[#4349ff]/20 rounded-lg lg:rounded-xl flex items-center justify-center border-2 border-transparent group-hover:border-[#843aed]/30 transition-all duration-150">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-[#843aed] to-[#4349ff] rounded-full flex items-center justify-center">
                          <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">
                            {alumniMember.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Alumni Info */}
                  <div className="text-center space-y-1 sm:space-y-2">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white group-hover:text-[#843aed] transition-colors duration-300 leading-tight">
                      {alumniMember.name}
                    </h3>
                    <p className="text-[#843aed] font-semibold text-xs sm:text-sm leading-tight">
                      {alumniMember.role}
                    </p>
                    <p className="text-white font-bold text-xs sm:text-sm leading-tight">
                      {alumniMember.session}
                    </p>
                  </div>

                  {/* LinkedIn Link */}
                  {alumniMember.linkedin && (
                    <div className="mt-3 sm:mt-3 lg:mt-4 text-center">
                      <a
                        href={alumniMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-[#843aed] to-[#4349ff] text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-2 rounded-md lg:rounded-lg text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-300 min-w-[60px] sm:min-w-[80px]"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
              {alumni.map((alumniMember, index) => (
                <motion.div
                  key={alumniMember.id}
                  className="group backdrop-blur-sm rounded-xl lg:rounded-2xl pb-3 sm:pb-4 lg:pb-6 border-2 border-white/40 hover:border-[#843aed]/50 transition-all duration-300 hover:transform hover:scale-105"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  {/* Profile Image */}
                  <div className="relative mb-2 sm:mb-3 lg:mb-4">
                    {alumniMember.imageUrl ? (
                      <Image
                        src={alumniMember.imageUrl}
                        alt={alumniMember.name}
                        width={400}
                        height={250}
                        className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-t-lg lg:rounded-t-xl border-2 border-transparent group-hover:border-[#843aed]/30 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-40 sm:h-48 lg:h-56 bg-gradient-to-br from-[#843aed]/20 to-[#4349ff]/20 rounded-lg lg:rounded-xl flex items-center justify-center border-2 border-transparent group-hover:border-[#843aed]/30 transition-all duration-300">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-[#843aed] to-[#4349ff] rounded-full flex items-center justify-center">
                          <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">
                            {alumniMember.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Alumni Info */}
                  <div className="text-center space-y-1 sm:space-y-2">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white group-hover:text-[#843aed] transition-colors duration-300 leading-tight">
                      {alumniMember.name}
                    </h3>
                    <p className="text-[#843aed] font-semibold text-xs sm:text-sm leading-tight">
                      {alumniMember.role}
                    </p>
                    <p className="text-white font-bold text-xs sm:text-sm leading-tight">
                      {alumniMember.session}
                    </p>
                  </div>

                  {/* LinkedIn Link */}
                  {alumniMember.linkedin && (
                    <div className="mt-3 sm:mt-3 lg:mt-4 text-center">
                      <a
                        href={alumniMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-[#843aed] to-[#4349ff] text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-2 rounded-md lg:rounded-lg text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-300 min-w-[60px] sm:min-w-[80px]"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}