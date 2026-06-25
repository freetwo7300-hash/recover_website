'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Feature {
  id: string;
  title: string;
  description: string;
  animClass: string;
  icon: React.ReactNode;
  microAnimation: React.ReactNode;
}

const LockIcon = () => (
  <svg className="lock-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="1.5" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const CalendarSlot = () => (
  <div className="flex flex-col gap-1.5 w-full">
    <div className="flex items-center gap-2 p-2 rounded-lg border border-white/10 bg-white/5">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(224,224,224,0.4)" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      <span className="text-xs text-titanium/40 font-mono">Tue Mar 4 · 2:30 PM</span>
    </div>
    <div className="cal-slot flex items-center gap-2 p-2 rounded-lg border border-signal/30 bg-signal/10">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      <span className="text-xs text-signal font-mono font-semibold">Wed Mar 5 · 10:00 AM ← new</span>
    </div>
  </div>
);

const BarChart = () => {
  const bars = [
    { h: '30%', delay: '0s' },
    { h: '55%', delay: '0.05s' },
    { h: '45%', delay: '0.1s' },
    { h: '70%', delay: '0.15s' },
    { h: '60%', delay: '0.2s' },
    { h: '85%', delay: '0.25s' },
    { h: '95%', delay: '0.3s' },
  ];
  return (
    <div className="flex items-end gap-1.5 h-16 w-full">
      {bars.map((b, i) => (
        <div key={i} className="bar-item flex-1 rounded-t-sm bg-signal/70 transition-all duration-700"
          style={{ height: b.h, '--bar-target': b.h, transitionDelay: b.delay } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const ABVariants = () => (
  <div className="flex flex-col gap-2 w-full">
    <div className="ab-variant flex items-center gap-2 p-2 rounded-lg border border-white/10 bg-white/5">
      <span className="font-mono text-[10px] bg-titanium/20 text-titanium px-1.5 py-0.5 rounded">A</span>
      <span className="text-xs text-titanium/60">"Your slot is waiting"</span>
      <span className="ml-auto font-mono text-xs text-titanium/40">48%</span>
    </div>
    <div className="ab-variant flex items-center gap-2 p-2 rounded-lg border border-signal/30 bg-signal/10" style={{ animationDelay: '0.1s' }}>
      <span className="font-mono text-[10px] bg-signal/20 text-signal px-1.5 py-0.5 rounded">B</span>
      <span className="text-xs text-signal">"Dr. Patel is available now"</span>
      <span className="ml-auto font-mono text-xs text-signal">67%</span>
    </div>
  </div>
);

const BranchLines = () => (
  <div className="flex flex-col gap-2 w-full">
    <div className="branch-line flex items-center gap-2 p-2 rounded-lg border border-white/10 bg-white/5 transition-all duration-300">
      <span className="font-mono text-[10px] text-blue-400">BCBS</span>
      <div className="flex-1 h-px bg-blue-400/30"/>
      <span className="text-xs text-titanium/50">Tier-1 flow</span>
    </div>
    <div className="branch-line flex items-center gap-2 p-2 rounded-lg border border-white/10 bg-white/5 transition-all duration-300" style={{ animationDelay: '0.15s' }}>
      <span className="font-mono text-[10px] text-purple-400">Aetna</span>
      <div className="flex-1 h-px bg-purple-400/30"/>
      <span className="text-xs text-titanium/50">HSA reminder</span>
    </div>
    <div className="branch-line flex items-center gap-2 p-2 rounded-lg border border-white/10 bg-white/5 transition-all duration-300" style={{ animationDelay: '0.3s' }}>
      <span className="font-mono text-[10px] text-orange-400">Medicaid</span>
      <div className="flex-1 h-px bg-orange-400/30"/>
      <span className="text-xs text-titanium/50">Eligibility check</span>
    </div>
  </div>
);

const LiveDots = () => (
  <div className="flex flex-col gap-2 w-full">
    {[
      { label: 'Appointments recovered', val: '142', color: 'text-signal' },
      { label: 'Avg recovery time', val: '4.2 hrs', color: 'text-titanium' },
      { label: 'Revenue recovered', val: '$28,440', color: 'text-signal' },
    ].map((row) => (
      <div key={row.label} className="flex items-center justify-between py-1 border-b border-white/5">
        <span className="text-xs text-titanium/50">{row.label}</span>
        <span className={`font-mono text-sm font-bold ${row.color}`}>{row.val}</span>
      </div>
    ))}
  </div>
);

const EHRPulse = () => (
  <div className="flex items-center gap-3 flex-wrap">
    {['Epic', 'Cerner', 'Athena', 'Modmed'].map((name) => (
      <div key={name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-signal/20 bg-signal/5">
        <span className="w-1.5 h-1.5 rounded-full bg-signal ping-dot" />
        <span className="font-mono text-xs text-signal">{name}</span>
      </div>
    ))}
  </div>
);

const features: Feature[] = [
  {
    id: 'hipaa',
    title: 'HIPAA-Compliant Sending',
    description: 'BAA-covered infrastructure. PHI stays encrypted in transit and at rest. SOC 2 Type II certified. Audit logs on every send.',
    animClass: 'lock-animate',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    microAnimation: <LockIcon />,
  },
  {
    id: 'slots',
    title: 'Dynamic Slot Insertion',
    description: 'Real-time availability pulled from your EHR. Each email contains the next 3 open slots — personalized to patient\'s stated preferences.',
    animClass: 'calendar-animate',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    microAnimation: <CalendarSlot />,
  },
  {
    id: 'analytics',
    title: 'Real-Time Analytics',
    description: 'Per-sequence, per-segment dashboards. Recovery rate, revenue recovered, time-to-conversion — all ticking live as sequences execute.',
    animClass: 'bar-animate',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    microAnimation: <BarChart />,
  },
  {
    id: 'ab',
    title: 'A/B Subject-Line Testing',
    description: 'Auto-split traffic across variants. Winner promotion after statistical significance. Learns provider voice over time.',
    animClass: 'ab-animate',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="1.5"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>,
    microAnimation: <ABVariants />,
  },
  {
    id: 'payer',
    title: 'Payer-Specific Logic',
    description: 'Branch sequences by insurance carrier, plan tier, and eligibility status. BCBS gets a different message than Medicaid — automatically.',
    animClass: 'branch-animate',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="1.5"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l5.1 5.1M4 4l5 5"/></svg>,
    microAnimation: <BranchLines />,
  },
  {
    id: 'ehr',
    title: 'EHR Integration',
    description: 'Native connectors to Epic, Cerner, Athenahealth, and Modmed. Bi-directional sync — recovered bookings write back to your EHR automatically.',
    animClass: '',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    microAnimation: <EHRPulse />,
  },
];

const FeatureMatrix: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [tickerCount, setTickerCount] = useState(4312);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerCount((c) => c + Math.floor(Math.random() * 2) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    cardsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const tickerItems = Array(6).fill(null).map((_, i) => ({
    key: i,
    text: i % 2 === 0
      ? `${(tickerCount + i * 47).toLocaleString()} patients recovered this week`
      : '$' + ((tickerCount + i * 47) * 6.5).toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' in recovered revenue',
  }));

  return (
    <section ref={sectionRef} id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={(el) => { cardsRef.current[0] = el; }}
          className="text-center mb-16 reveal"
        >
          <span className="font-mono text-xs text-signal/70 uppercase tracking-widest mb-4 block">Capability Matrix</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-titanium tracking-tight mb-4">
            One platform. Every care gap.
          </h2>
          <p className="text-titanium/50 text-lg max-w-2xl mx-auto">
            Six core capabilities, each engineered for the specific friction points of healthcare abandonment.
          </p>
        </div>

        {/* Feature card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              ref={(el) => { cardsRef.current[idx + 1] = el; }}
              className={`carbon-card rounded-2xl p-6 flex flex-col gap-4 cursor-default reveal reveal-delay-${Math.min(idx + 1, 5)} ${feature.animClass}`}
            >
              {/* Icon row */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-signal/10 border border-signal/20 flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-titanium">{feature.title}</h3>
              </div>

              {/* Micro animation zone */}
              <div className="h-20 flex items-center">
                {feature.microAnimation}
              </div>

              {/* Description */}
              <p className="text-sm text-titanium/50 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* ── Live Ticker Row ── */}
        <div
          ref={(el) => { cardsRef.current[features.length + 1] = el; }}
          className="mt-8 rounded-2xl overflow-hidden border border-signal/20 bg-signal/5 py-5 reveal"
          style={{ boxShadow: '0 0 40px rgba(0,230,118,0.06)' }}
        >
          <div className="flex items-center gap-4 overflow-hidden">
            {/* Static label */}
            <div className="flex-shrink-0 pl-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal ping-dot" />
              <span className="font-mono text-xs text-signal uppercase tracking-widest">LIVE</span>
            </div>
            {/* Scrolling ticker */}
            <div className="flex-1 overflow-hidden">
              <div className="ticker-track flex whitespace-nowrap gap-0">
                {[...tickerItems, ...tickerItems].map((item, i) => (
                  <span key={i} className="font-mono text-sm text-signal font-semibold px-8 flex-shrink-0">
                    ◆ {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureMatrix;