'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

const HeroSection: React.FC = () => {
  const t = useTranslations('home.hero')
  const [liveCount, setLiveCount] = useState(4312)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((c) => c + Math.floor(Math.random() * 3))
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={heroRef} className="min-h-screen pt-24 pb-16 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex items-center gap-2 mb-8 reveal visible">
        <span className="w-2 h-2 rounded-full bg-signal ping-dot" />
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          Live — {liveCount.toLocaleString()} patients recovered today
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight tracking-tight max-w-5xl mb-6 reveal visible">
        <span className="text-titanium">{t('title')}</span>
      </h1>

      <p className="text-lg md:text-xl text-titanium/60 text-center max-w-2xl mb-12 font-medium leading-relaxed reveal visible reveal-delay-1">
        {t('description')}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 reveal visible reveal-delay-2">
        <a
          href="#lead-form"
          className="bg-signal text-cockpit font-bold px-8 py-4 rounded-xl text-base signal-glow hover:bg-signal/90 transition-all duration-200 active:scale-95"
        >
          {t('cta')} →
        </a>
        <button className="flex items-center gap-2 text-titanium/60 hover:text-titanium text-sm font-medium transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-signal">
            <path d="M8 5v14l11-7z"/>
          </svg>
          {t('demo')}
        </button>
      </div>

      <div className="w-full max-w-5xl reveal visible reveal-delay-3">
        <div className="carbon-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-signal/70" />
              <span className="font-mono text-xs text-titanium/30 ml-3">recover.sequence — abandoned_appointment.flow</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal ping-dot" />
              <span className="font-mono text-xs text-signal">RUNNING</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1.5 rounded-lg border border-signal/30 bg-signal/10 font-mono text-xs text-signal">
              TRIGGER: appointment.abandoned
            </div>
            <svg width="20" height="12" viewBox="0 0 20 12">
              <path d="M0 6 H18 M14 2 L18 6 L14 10" stroke="rgba(0,230,118,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
            <span className="font-mono text-xs text-titanium/40">EHR event detected</span>
          </div>

          <div className="bg-gradient-to-r from-signal/10 to-transparent p-4 rounded-lg border border-signal/20">
            <p className="text-sm text-titanium/70">Email sequence builder (demo)</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <svg width="60" height="12" viewBox="0 0 60 12">
              <line x1="0" y1="6" x2="60" y2="6" stroke="rgba(0,230,118,0.3)" strokeWidth="1.5" strokeDasharray="3 2"/>
            </svg>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-signal rounded-sm blink-cursor signal-glow" />
              <span className="font-mono text-xs text-signal/60">sequence active — monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
