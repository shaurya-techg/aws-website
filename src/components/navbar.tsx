'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '../../public/Logo.svg';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 50) {
                setShowNavbar(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNavbar(false); // scrolling down
            } else {
                setShowNavbar(true); // scrolling up
            }
            setLastScrollY(currentScrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMounted]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
    <div className={`w-full px-10 sm:px-20 lg:px-30 fixed top-0 left-0 z-50 bg-[#030012]/95 backdrop-blur-sm transition-all duration-300 ${!isMounted || showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="w-full flex justify-between items-center py-2 sm:py-3 lg:py-4">
            {/* Left side - Logo */}
           
            <a href='/admin/dashboard'>
                <div className='flex items-center'>
                    <img src={Logo.src} alt="Logo" className="h-12 sm:h-14 lg:h-15 px-1 sm:px-1.5"/>
                    <div className='flex flex-col justify-center items-center text-sm sm:text-lg lg:text-xl p-1 sm:p-2'>
                        <p className="font-bold text-lg sm:text-2xl text-white">GGSIPU</p>
                        <p className="text-sm sm:text-base text-[#9C6CFE] font-semibold">EAST DELHI</p>
                    </div>
               </div>
            </a>
            
            {/* Desktop Navigation - Hidden on md screens and below */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 text-white font-semibold py-4 lg:py-6 space-x-8 xl:space-x-16">
                <Link href='/' className="cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300 text-sm xl:text-base">HOME</Link>
                <a href='/events' className="cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300 text-sm xl:text-base">EVENTS</a>
                <a href='/teams' className="cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300 text-sm xl:text-base">TEAM</a>
                <a href='/alumni' className="cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300 text-sm xl:text-base">ALUMNI</a>
            </div>

            {/* Mobile/Tablet Menu Button - Visible on md screens and below */}
            <div className="lg:hidden flex items-center">
                <button
                    onClick={toggleMenu}
                    className="text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
                >
                    <div className="space-y-1">
                        <div className={`w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                        <div className={`w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                    </div>
                </button>
            </div>
            
            {/* Desktop Join Button - Hidden on md screens and below */}
            <a href="https://chat.whatsapp.com/ETars8R7yGY7x5FwB22Ppg" target="_blank" rel="noopener noreferrer" className="hidden lg:block px-3 lg:px-4 py-2 lg:py-3 bg-transparent border-2 bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent font-semibold rounded-full text-sm xl:text-base hover:bg-gradient-to-b hover:from-[#843aed]/10 hover:to-[#4349ff]/10 transition-all duration-300" style={{
                borderImage: 'linear-gradient(to top right, #843aed, #4349ff) 1',
            }}>
                JOIN CLUB
            </a>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-[#030012] backdrop-blur-sm border-t text-center border-white/20 transition-all duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
            <div className="flex flex-col space-y-3 sm:space-y-4 p-4 sm:p-6">
                <Link href="/" className="text-white font-semibold cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300 py-2 border-b border-white/10 text-sm sm:text-base">HOME</Link>
                <a href="/events" className="text-white font-semibold cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300 py-2 border-b border-white/10 text-sm sm:text-base">EVENTS</a>
                <a href="/teams" className="text-white font-semibold cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300 py-2 border-b border-white/10 text-sm sm:text-base">TEAM</a>
                <a href="/alumni" className="text-white font-semibold cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300 py-2 border-b border-white/10 text-sm sm:text-base">ALUMNI</a>
                
                {/* Mobile Join Button */}
                <div className="pt-3 sm:pt-4">
                    <a href="https://chat.whatsapp.com/ETars8R7yGY7x5FwB22Ppg" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 sm:py-3 bg-transparent border-2 bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent font-semibold rounded-full w-full text-sm sm:text-base hover:bg-gradient-to-b hover:from-[#843aed]/10 hover:to-[#4349ff]/10 transition-all duration-300" style={{
                        borderImage: 'linear-gradient(to top right, #843aed, #4349ff) 1',
                    }}>
                        JOIN CLUB
                    </a>
                </div>
            </div>
        </div>
    </div>
    )
}