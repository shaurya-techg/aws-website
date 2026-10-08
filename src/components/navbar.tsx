'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/new_logo.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/events', label: 'EVENTS' },
  { href: '/teams', label: 'TEAM' },
  { href: '/alumni', label: 'ALUMNI' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);
            
            if (currentScrollY < 50) {
                setShowNavbar(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNavbar(false);
                setIsMenuOpen(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(currentScrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMounted]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // The home page uses the new AWS CloudStation Console layout
    if (pathname === '/') {
        return null;
    }

    return (
    <>
      {/* ─── Floating Pill Navbar ─── */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 transition-all duration-300 ${
        !isMounted || showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <nav className={`navbar-glass w-full max-w-5xl mt-3 sm:mt-4 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-full transition-all duration-300 ${
          scrolled ? 'navbar-glass-scrolled' : ''
        }`}>
          <div className="w-full flex justify-between items-center">
            {/* Left — Logo */}
            <a href='/admin/dashboard' className="flex-shrink-0">
              <div className='flex items-center gap-2 sm:gap-3'>
                <Image src={Logo.src} alt="AWS Student Builder Group Logo" width={48} height={48} className="h-9 sm:h-10 lg:h-11 w-auto object-contain rounded-lg"/>
                <div className='flex flex-col'>
                  <p className="font-bold text-sm sm:text-base text-white leading-tight">GGSIPU</p>
                  <p className="text-xs text-[#FF9900] font-semibold leading-tight">EAST DELHI</p>
                </div>
              </div>
            </a>
            
            {/* Center — Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link-pill"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right — Desktop CTA */}
            <a 
              href="https://www.meetup.com/aws-cloud-club-at-ggsipu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden lg:flex nav-cta-button"
            >
              JOIN GROUP
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <motion.div
                  className="w-full h-[2px] bg-white rounded-full origin-center"
                  animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="w-full h-[2px] bg-white rounded-full"
                  animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.div
                  className="w-full h-[2px] bg-white rounded-full origin-center"
                  animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* ─── Full-Screen Mobile Overlay ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#030012]/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <div className="relative h-full flex flex-col items-center justify-center gap-6 sm:gap-8 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-4"
              >
                <a
                  href="https://www.meetup.com/aws-cloud-club-at-ggsipu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-cta-button text-lg px-10 py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  JOIN GROUP
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
    )
}