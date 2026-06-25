'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound() {
  const router = useRouter()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history?.back()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cockpit relative overflow-hidden px-4">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,230,118,0.08) 0%, transparent 70%)',
          animation: animate ? 'pulse 4s ease-in-out infinite' : 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Number with Animation */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            animate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="text-9xl sm:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-signal to-signal/50 drop-shadow-lg">
            404
          </div>
          <div className="text-titanium/40 text-sm tracking-widest mt-2 uppercase font-semibold">
            Page Not Found
          </div>
        </div>

        {/* Heading */}
        <h1
          className={`text-3xl sm:text-4xl font-bold text-titanium mb-4 transition-all duration-1000 delay-200 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Oops! We Lost This One
        </h1>

        {/* Description */}
        <p
          className={`text-lg text-titanium/60 mb-10 leading-relaxed transition-all duration-1000 delay-300 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-signal/50 text-titanium rounded-lg font-semibold transition-all duration-300 hover:text-signal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Go Back
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-signal hover:bg-signal/90 text-cockpit rounded-lg font-semibold transition-all duration-300 signal-glow"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-signal/50 text-titanium rounded-lg font-semibold transition-all duration-300 hover:text-signal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2H3v18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z"/>
              <polyline points="13 2 13 9 20 9"/>
            </svg>
            Go to Dashboard
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  )
}