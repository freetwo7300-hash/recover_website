import React from 'react'
import Header from '@/app/[locale]/components/Header'
import Footer from '@/app/[locale]/components/Footer'
import HeroSection from './components/HeroSection'
import FeatureMatrix from './components/FeatureMatrix'
import StatsSection from './components/StatsSection'
import IntegrationsSection from './components/IntegrationsSection'
import LeadFormSection from './components/LeadFormSection'
import ScrollController from './components/ScrollController'

// Use dynamic rendering during build to avoid next-intl SSG issues
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cockpit relative">
      {/* Carbon grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Ambient top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,230,118,0.06) 0%, transparent 70%)' }}
      />

      <Header />
      <ScrollController />

      <main className="relative z-10">
        <HeroSection />
        <FeatureMatrix />
        <StatsSection />
        <IntegrationsSection />
        <LeadFormSection />
      </main>

      <Footer />

      {/* Sticky bottom CTA — rendered by ScrollController */}
    </div>
  )
}
