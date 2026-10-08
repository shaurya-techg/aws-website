'use client';
import Link from "next/link";
import Image from "next/image";
import logo from '../../public/new_logo.jpeg';

export default function Footer() {
    return (
        <footer className="w-full bg-[#030012] border-t border-white/5 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo + Copyright */}
                    <div className="flex items-center gap-3">
                        <Image src={logo.src} alt="AWS Student Builder Group Logo" width={40} height={40} className="w-8 h-auto rounded-lg" />
                        <div className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} AWS Student Builder Group · GGSIPU EDC
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
                        <a href="/events" className="hover:text-white transition-colors duration-200">Events</a>
                        <a href="/teams" className="hover:text-white transition-colors duration-200">Teams</a>
                        <a href="/alumni" className="hover:text-white transition-colors duration-200">Alumni</a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        <a href="https://www.linkedin.com/company/aws-cloud-clubs-at-ggsipu/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-gray-500 transition-all duration-200 social-linkedin">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/awscloudclubggsipu/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-gray-500 transition-all duration-200 social-instagram">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="https://www.meetup.com/aws-cloud-club-at-ggsipu/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-gray-500 transition-all duration-200 social-meetup">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-11.925-12.118-13.851-15.98-5.365-2.827-3.78-6.432-4.182-8.725-1.471-2.293 2.71-1.311 6.34 1.299 8.537-.181.932-.181 1.934 0 2.866-2.61 2.197-3.592 5.827-1.299 8.537 2.293 2.711 5.898 2.309 8.725-1.471C11.882 25.924 24 24.1 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrfScpwRBXTTqxpgmtRJbZhqwcsBqSpzqkpFtvbHGQBdrhsmjsQpPVwZlrgGPcRwwQJLrg" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-gray-500 transition-all duration-200 social-email">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.877.732-1.636 1.636-1.636h.105c.264 0 .515.081.72.233L12 10.28l9.539-6.226a1.636 1.636 0 0 1 .72-.233h.105c.904 0 1.636.732 1.636 1.636z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
