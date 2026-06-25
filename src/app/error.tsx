'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cockpit relative overflow-hidden px-4">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glow with error tint */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(239,68,68,0.06) 0%, transparent 70%)',
          animation: animate ? 'pulse-error 4s ease-in-out infinite' : 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Error Icon */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            animate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500/30 rounded-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
          </div>
          <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-500/50 drop-shadow-lg">
            Oops!
          </div>
        </div>

        {/* Heading */}
        <h1
          className={`text-3xl sm:text-4xl font-bold text-titanium mb-4 transition-all duration-1000 delay-200 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Something Went Wrong
        </h1>

        {/* Description */}
        <p
          className={`text-lg text-titanium/60 mb-6 leading-relaxed transition-all duration-1000 delay-300 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          We encountered an unexpected error. Our team has been notified and we're working on a fix.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div
            className={`mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-lg text-left transition-all duration-1000 delay-300 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-xs font-mono text-red-500/80 break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-signal hover:bg-signal/90 text-cockpit rounded-lg font-semibold transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-signal/50 text-titanium rounded-lg font-semibold transition-all duration-300 hover:text-signal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Digest for support */}
        {error.digest && (
          <p
            className={`text-xs text-titanium/40 mt-8 transition-all duration-1000 delay-700 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Error ID: <code className="font-mono">{error.digest}</code>
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-error {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}
