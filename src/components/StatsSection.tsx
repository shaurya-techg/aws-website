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
        if (entry.isIntersecting && entry.intersectionRatio >= 1) {
          setIsVisible(true)
        }
      },
      { threshold: 1.0 } // Component must be 100% visible
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const startCount = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOut * (end - startCount) + startCount)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end) // Ensure we end at the exact target
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={countRef} className="flex-1 min-w-0">
      <div className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
        {count}{suffix}
      </div>
      <div className="text-sm sm:text-lg lg:text-xl mt-1 lg:mt-2">{label}</div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <div className='px-4 sm:px-8 lg:px-24'>
      <div className="relative rounded-2xl lg:rounded-4xl p-1.5 lg:p-2" style={{
        background: 'linear-gradient(to right, #481860, #3250C6)'
      }}>
        <div className="flex flex-col sm:flex-row rounded-2xl lg:rounded-4xl text-white w-full bg-black items-center justify-between text-center py-6 sm:py-4 px-4 sm:px-8 lg:px-12 gap-6 sm:gap-4 lg:gap-0">
          <StatCounter end={250} label="MEMBERS" suffix="+" />
          <StatCounter end={20} label="AWARDS" suffix="+" />
          <StatCounter end={80} label="EVENTS" suffix="+" />
          <StatCounter end={1} label="BRANCH" />
        </div>
      </div>
    </div>
  )
}
