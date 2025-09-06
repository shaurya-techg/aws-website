'use client';
import React, { useState } from 'react';
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal']
});

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "What is AWS Cloud Club?",
      answer: "AWS Cloud Club GGSIPU is a student organization focused on teaching AWS Cloud technologies, providing hands-on experience, and preparing students for cloud computing careers."
    },
    {
      id: 2,
      question: "How can I join the club?",
      answer: "You can join by attending our events, filling out the membership form, or contacting us through our social media channels. We welcome students from all technical backgrounds."
    },
    {
      id: 3,
      question: "Do I need prior AWS experience?",
      answer: "No prior AWS experience is required! We offer workshops and training sessions for beginners as well as advanced topics for experienced members."
    },
    {
      id: 4,
      question: "What events do you organize?",
      answer: "We organize workshops, seminars, hackathons, certification preparation sessions, industry talks, and hands-on project sessions throughout the academic year."
    },
    {
      id: 5,
      question: "Are there any membership fees?",
      answer: "No, membership is completely free! We believe in making cloud education accessible to all students interested in learning AWS technologies."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="py-16 px-10">
      <div className="mb-16">
        <h1 className={`text-4xl sm:text-6xl lg:text-8xl font-bold text-center bg-gradient-to-b from-[#090EDB] to-[#DA24BB] bg-clip-text text-transparent ${inter.className}`}>
          FAQ's
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Table Structure */}
        <div className=" backdrop-blur-sm border-2 border-white/10 overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={faq.id}>
              {/* Table Row */}
              <div className="grid grid-cols-12 items-center py-4 px-6 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-all duration-300">
                {/* Column 1: Question Number */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <span className={`text-white text-xl ${inter.className}`}>
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Column 2: Question */}
                <div className="col-span-10 px-4">
                  <h3 className={`text-xl text-white ${inter.className}`}>
                    {faq.question}
                  </h3>
                </div>

                {/* Column 3: Plus Sign */}
                <div className="col-span-1 flex items-center justify-center">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                      openFAQ === faq.id ? 'rotate-45' : ''
                    }`}
                  >
                    <span className="text-white font-semibold text-3xl">+</span>
                  </button>
                </div>
              </div>

              {/* Expandable Answer Row */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openFAQ === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-4 bg-white/5">
                  <div className="grid grid-cols-12">
                    <div className="col-span-1"></div>
                    <div className="col-span-11 px-4">
                      <p className={`text-white text-base leading-relaxed ${inter.className}`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
