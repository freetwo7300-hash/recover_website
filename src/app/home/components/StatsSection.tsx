'use client';
import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: string;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
}

const stats: StatItem[] = [
  { value: '31', suffix: '%', label: 'Avg recovery rate', sublabel: 'across all verticals', color: 'text-signal' },
  { value: '4.2', suffix: 'hrs', label: 'Median time to recovery', sublabel: 'from first trigger', color: 'text-titanium' },
  { value: '2.4', suffix: 'M', label: 'Emails sent', sublabel: 'in last 12 months', color: 'text-titanium' },
  { value: '$6.50', suffix: '', label: 'Revenue per recovered patient', sublabel: 'avg across dental + telehealth', color: 'text-signal' },
];

const miniMetrics = [
  { label: 'Appointment abandons', recovered: 28, color: '#00E676' },
  { label: 'Insurance enrollments', recovered: 41, color: '#00E676' },
  { label: 'Prescription refills', recovered: 35, color: '#00E676' },
  { label: 'Vision exams', recovered: 22, color: '#00E676' },
];

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [barWidths, setBarWidths] = useState(miniMetrics.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => {
            setBarWidths(miniMetrics.map((m) => m.recovered));
          }, 200);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-graphite/20">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-signal/70 uppercase tracking-widest mb-4 block">System Telemetry</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-titanium tracking-tight mb-4">
            The numbers don't sleep.
          </h2>
          <p className="text-titanium/50 text-lg max-w-xl mx-auto">
            Aggregated across 140+ healthcare platforms. Updated in real time.
          </p>
        </div>

        {/* Big stat grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`carbon-card rounded-2xl p-6 text-center reveal ${visible ? 'visible' : ''} reveal-delay-${i + 1}`}
            >
              <div className={`text-4xl md:text-5xl font-extrabold mb-1 ${stat.color} counter-pulse`}>
                {stat.value}<span className="text-2xl">{stat.suffix}</span>
              </div>
              <p className="text-sm font-semibold text-titanium mb-1">{stat.label}</p>
              <p className="font-mono text-xs text-titanium/35">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Recovery by vertical */}
        <div className={`carbon-card rounded-2xl p-6 md:p-8 reveal ${visible ? 'visible' : ''} reveal-delay-4`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-titanium">Recovery Rate by Care Type</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal ping-dot" />
              <span className="font-mono text-xs text-signal">LIVE DATA</span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {miniMetrics.map((metric, i) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-titanium/70 font-medium">{metric.label}</span>
                  <span className="font-mono text-sm font-bold text-signal">{barWidths[i]}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${barWidths[i]}%`,
                      background: 'linear-gradient(90deg, rgba(0,230,118,0.6), #00E676)',
                      boxShadow: '0 0 8px rgba(0,230,118,0.4)',
                      transitionDelay: `${i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;