'use client';
import React, { useEffect, useRef, useState } from 'react';

interface EmailCard {
  id: number;
  delay: string;
  subject: string;
  preview: string;
  tag: string;
  openRate: string;
  recoveryRate: string;
  color: string;
}

const emailCards: EmailCard[] = [
  {
    id: 1,
    delay: '1 hr after abandon',
    subject: '"Your 2:30 PM slot is still open"',
    preview: 'Hi Sarah — you were this close to booking with Dr. Patel. One tap and it\'s yours.',
    tag: 'URGENCY',
    openRate: '61.4%',
    recoveryRate: '22.8%',
    color: 'rgba(0,230,118,0.15)',
  },
  {
    id: 2,
    delay: '24 hrs — new slot offered',
    subject: '"We found 3 new openings for you"',
    preview: 'Based on your schedule, these times work best. Dynamic slots refreshed from your EHR.',
    tag: 'PERSONALIZED',
    openRate: '48.2%',
    recoveryRate: '18.1%',
    color: 'rgba(26,26,46,0.8)',
  },
  {
    id: 3,
    delay: '72 hrs — provider video',
    subject: '"A message from Dr. Patel"',
    preview: '30-second video from your assigned provider. Conversion 3× higher than text-only.',
    tag: 'HIGH-IMPACT',
    openRate: '71.9%',
    recoveryRate: '31.4%',
    color: 'rgba(26,26,46,0.8)',
  },
];

const HeroSection: React.FC = () => {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [liveCount, setLiveCount] = useState(4312);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((c) => c + Math.floor(Math.random() * 3));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen pt-24 pb-16 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top badge */}
      <div className="flex items-center gap-2 mb-8 reveal visible">
        <span className="w-2 h-2 rounded-full bg-signal ping-dot" />
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          Live — {liveCount.toLocaleString()} patients recovered today
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight tracking-tight max-w-5xl mb-6 reveal visible">
        <span className="text-titanium">Every abandoned booking is a</span>{' '}
        <span className="gradient-text">patient you can still save.</span>
      </h1>

      <p className="text-lg md:text-xl text-titanium/60 text-center max-w-2xl mb-12 font-medium leading-relaxed reveal visible reveal-delay-1">
        Recover intercepts the exact moment a patient drops off — appointment, enrollment, refill — and fires a HIPAA-compliant sequence that brings them back before the care gap widens.
      </p>

      {/* CTA row */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 reveal visible reveal-delay-2">
        <a
          href="#lead-form"
          className="bg-signal text-cockpit font-bold px-8 py-4 rounded-xl text-base signal-glow hover:bg-signal/90 transition-all duration-200 active:scale-95"
        >
          See Your Recovery Rate →
        </a>
        <button className="flex items-center gap-2 text-titanium/60 hover:text-titanium text-sm font-medium transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-signal">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Watch 90-second demo
        </button>
      </div>

      {/* ── Interactive Email Sequence Builder ── */}
      <div className="w-full max-w-5xl reveal visible reveal-delay-3">
        <div className="carbon-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Console header bar */}
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

          {/* Trigger label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1.5 rounded-lg border border-signal/30 bg-signal/10 font-mono text-xs text-signal">
              TRIGGER: appointment.abandoned
            </div>
            <svg width="20" height="12" viewBox="0 0 20 12">
              <path d="M0 6 H18 M14 2 L18 6 L14 10" stroke="rgba(0,230,118,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
            <span className="font-mono text-xs text-titanium/40">EHR event detected</span>
          </div>

          {/* Email cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {emailCards.map((card, idx) => (
              <div key={card.id} className="relative">
                {/* Connector line between cards */}
                {idx < emailCards.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-4 z-10">
                    <svg width="16" height="40" viewBox="0 0 16 40">
                      <line x1="0" y1="20" x2="16" y2="20" stroke="rgba(0,230,118,0.4)" strokeWidth="1.5" strokeDasharray="3 2" className="trigger-line"/>
                    </svg>
                  </div>
                )}

                {/* Flip card */}
                <div
                  className={`flip-card h-52 cursor-pointer ${flipped === card.id ? 'flipped' : ''}`}
                  onMouseEnter={() => setFlipped(card.id)}
                  onMouseLeave={() => setFlipped(null)}
                  onClick={() => setFlipped(flipped === card.id ? null : card.id)}
                >
                  <div className="flip-card-inner">
                    {/* Front */}
                    <div
                      className="flip-card-front carbon-card p-4 flex flex-col gap-3"
                      style={{ background: card.color }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-signal/70 uppercase tracking-widest">{card.delay}</span>
                        <span className="px-2 py-0.5 rounded font-mono text-[9px] bg-signal/10 text-signal border border-signal/20">
                          {card.tag}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-titanium mb-2">{card.subject}</p>
                        <p className="text-xs text-titanium/50 leading-relaxed">{card.preview}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-titanium/30 font-mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Hover to see stats
                      </div>
                    </div>

                    {/* Back — stats */}
                    <div className="flip-card-back p-4 flex flex-col justify-center gap-5"
                      style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.12) 0%, rgba(26,26,46,0.95) 100%)', border: '1px solid rgba(0,230,118,0.25)' }}>
                      <div>
                        <p className="font-mono text-[10px] text-signal/60 uppercase tracking-widest mb-1">Open Rate</p>
                        <p className="text-3xl font-extrabold text-signal signal-text-glow">{card.openRate}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-signal/60 uppercase tracking-widest mb-1">Recovery Rate</p>
                        <p className="text-3xl font-extrabold text-titanium">{card.recoveryRate}</p>
                      </div>
                      <p className="text-xs text-titanium/40 font-mono">avg. across 2.4M sends · 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Blinking cursor — sequence continues */}
          <div className="mt-6 flex items-center gap-3">
            <svg width="60" height="12" viewBox="0 0 60 12">
              <line x1="0" y1="6" x2="60" y2="6" stroke="rgba(0,230,118,0.3)" strokeWidth="1.5" strokeDasharray="3 2" className="trigger-line"/>
            </svg>
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-5 bg-signal rounded-sm blink-cursor signal-glow"
                style={{ boxShadow: '0 0 8px rgba(0,230,118,0.8)' }}
              />
              <span className="font-mono text-xs text-signal/60">sequence active — monitoring</span>
            </div>
          </div>

          {/* Hint text */}
          <p className="mt-4 text-center font-mono text-xs text-titanium/25">
            ↑ hover each card to reveal performance data
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;