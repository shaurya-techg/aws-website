'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import groupPhoto from '../../public/groupPhoto.jpg';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function AboutSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
            About{' '}
            <span className="text-[#E09F67]">
              Us
            </span>
          </h2>
          <div className="h-1 w-16 bg-[#E09F67] rounded-full" />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 auto-rows-auto">
          
          {/* Card 1 — Group Photo (spans 2 cols on lg) */}
          <motion.div
            className="lg:col-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden group min-h-[300px] sm:min-h-[400px]"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={groupPhoto.src}
              alt="AWS Student Builder Group"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-white/80 text-sm sm:text-base font-medium mb-1">EST. 2023</p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                Building the future of cloud at GGSIPU
              </p>
            </div>
          </motion.div>

          {/* Card 2 — Mission */}
          <motion.div
            className="bento-card p-6 sm:p-8 flex flex-col justify-between"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E09F67]/15 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#E09F67]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                To help students explore cloud technologies and their real-world applications in security, AI, and business analytics through hands-on projects.
              </p>
            </div>
          </motion.div>

          {/* Card 3 — Vision */}
          <motion.div
            className="bento-card p-6 sm:p-8 flex flex-col justify-between"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#86B398]/15 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#86B398]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Develop both technical and business expertise in the cloud, providing students with industry skills currently in high demand.
              </p>
            </div>
          </motion.div>

          {/* Card 4 — What you get (spans 2 cols on md, 1 on lg) */}
          <motion.div
            className="md:col-span-2 lg:col-span-1 bento-card p-6 sm:p-8"
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#90BEDE]/15 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[#90BEDE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-white text-lg sm:text-xl font-bold mb-3">What You Get</h3>
            <div className="flex flex-wrap gap-2">
              {['Hands-on Projects', 'AWS Certifications', 'Mentorship', 'Networking', 'Workshops', 'Community'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
