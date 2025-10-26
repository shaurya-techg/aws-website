'use client';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function BePartSection() {
    return (
        <div className="relative w-full flex flex-col justify-center items-center py-16 sm:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 lg:px-8 min-h-screen">
            {/* Background Image */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/prefooter.svg')`,
                }}
            ></div>
            
            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col justify-center items-center space-y-8 sm:space-y-12">
                <img 
                    src="/bepart.svg" 
                    className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl h-auto" 
                    alt="Be Part of the Community"
                />
                
                {/* Rounded Join Button */}
                <a href="https://chat.whatsapp.com/ETars8R7yGY7x5FwB22Ppg" target="_blank" className="relative inline-block">
                    <button 
                        className="relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 font-bold rounded-full text-base sm:text-lg lg:text-xl hover:scale-105 transition-transform duration-300 border-2 border-transparent text-white"
                        style={{
                            background: 'linear-gradient(#030012, #030012) padding-box, linear-gradient(45deg, #843aed, #4349ff) border-box'
                        }}
                    >
                        <span className="bg-gradient-to-b from-[#843aed] to-[#4349ff] bg-clip-text text-transparent">
                            JOIN CLUB
                        </span>
                    </button>
                </a>
            </div>
        </div>
    );
}
