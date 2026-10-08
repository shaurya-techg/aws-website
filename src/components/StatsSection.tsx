'use client'

import { useState, useEffect, useRef } from 'react'

interface StatCounterProps {
  end: number
  label: string
  suffix?: string
  duration?: number
}

function StatCounter({ end, label, suffix = '', duration = 1000 }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={countRef} className="flex items-center gap-3 px-8 sm:px-12 whitespace-nowrap">
      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E09F67]">
        {count}{suffix}
      </span>
      <span className="text-sm sm:text-base text-slate-400 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

const stats = [
  { end: 3500, label: 'Community Members', suffix: '+' },
  { end: 250, label: 'Active Members', suffix: '+' },
  { end: 20, label: 'Events Hosted', suffix: '+' },
  { end: 15, label: 'Workshops Conducted', suffix: '+' },
  { end: 500, label: 'Students Mentored', suffix: '+' },
]

export default function StatsSection() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-white/[0.01]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0b10] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0b10] to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling marquee */}
      <div className="flex py-6 sm:py-8 marquee-track">
        {/* First copy */}
        <div className="flex shrink-0 items-center marquee-scroll">
          {stats.map((stat, i) => (
            <div key={`a-${i}`} className="flex items-center">
              <StatCounter {...stat} />
              <span className="text-white/10 text-2xl mx-2">•</span>
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center marquee-scroll" aria-hidden>
          {stats.map((stat, i) => (
            <div key={`b-${i}`} className="flex items-center">
              <StatCounter {...stat} />
              <span className="text-white/10 text-2xl mx-2">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
