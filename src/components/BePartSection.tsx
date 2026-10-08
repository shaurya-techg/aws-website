'use client';

import { motion } from 'framer-motion';

export default function BePartSection() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Soft background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b10] to-[#0e1017]" />
                {/* Very subtle ambient pastel mist */}
                <div className="ambient-orb w-[500px] h-[500px] bg-[#E09F67]/5 top-1/4 -left-20" style={{ animationDelay: '0s' }} />
                <div className="ambient-orb w-[400px] h-[400px] bg-[#86B398]/4 bottom-1/4 -right-20" style={{ animationDelay: '4s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="text-sm sm:text-base text-[#E09F67] font-medium tracking-[0.2em] uppercase mb-6">
                        Join the Community
                    </p>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-[1.1]">
                        Ready to start{' '}
                        <span className="text-[#E09F67]">
                            building?
                        </span>
                    </h2>
                    
                    <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
                        Join 3500+ students building on the cloud. Get hands-on with AWS, 
                        collaborate on real projects, and kickstart your tech career.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="https://www.meetup.com/aws-cloud-club-at-ggsipu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-4.5 text-base sm:text-lg font-bold text-[#0d0e15] bg-[#E09F67] hover:bg-[#e8aa77] rounded-full transition-all duration-300 hover:scale-102 group shadow-md"
                        >
                            Join Now
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                        <a
                            href="https://chat.whatsapp.com/ETars8R7yGY7x5FwB22Ppg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white/80 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 hover:scale-105"
                        >
                            WhatsApp Group
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
