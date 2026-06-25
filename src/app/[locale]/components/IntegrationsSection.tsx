'use client';
import React, { useEffect, useRef, useState } from 'react';

const ehrSystems = [
  { name: 'Epic', category: 'EHR', status: 'Native' },
  { name: 'Cerner', category: 'EHR', status: 'Native' },
  { name: 'Athenahealth', category: 'EHR', status: 'Native' },
  { name: 'Modmed', category: 'Specialty', status: 'Native' },
  { name: 'DrChrono', category: 'EHR', status: 'API' },
  { name: 'Kareo', category: 'Billing', status: 'API' },
  { name: 'Zocdoc', category: 'Booking', status: 'Webhook' },
  { name: 'Salesforce Health', category: 'CRM', status: 'Native' },
  { name: 'HubSpot', category: 'CRM', status: 'API' },
  { name: 'Twilio', category: 'Comms', status: 'Native' },
  { name: 'SendGrid', category: 'Email', status: 'Native' },
  { name: 'AWS HealthLake', category: 'Data', status: 'API' },
];

const statusColor: Record<string, string> = {
  'Native': 'text-signal border-signal/30 bg-signal/10',
  'API': 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  'Webhook': 'text-purple-400 border-purple-400/30 bg-purple-400/10',
};

const IntegrationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <span className="font-mono text-xs text-signal/70 uppercase tracking-widest mb-4 block">Integrations</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-titanium tracking-tight mb-4">
            Plugs into your stack in 20 minutes.
          </h2>
          <p className="text-titanium/50 text-lg max-w-xl mx-auto">
            Native connectors to every major EHR, booking platform, and CRM. Recovered bookings write back automatically.
          </p>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 reveal ${visible ? 'visible' : ''}`}>
          {ehrSystems.map((sys, i) => (
            <div
              key={sys.name}
              className={`ehr-pill rounded-xl p-4 flex flex-col gap-2 reveal reveal-delay-${Math.min(i % 5 + 1, 5)} ${visible ? 'visible' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-titanium">{sys.name}</span>
                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${statusColor[sys.status]}`}>
                  {sys.status}
                </span>
              </div>
              <span className="font-mono text-xs text-titanium/35">{sys.category}</span>
            </div>
          ))}
        </div>

        {/* HIPAA badge row */}
        <div className={`mt-12 flex flex-wrap items-center justify-center gap-4 reveal ${visible ? 'visible' : ''}`}>
          {[
            { icon: '🔒', label: 'HIPAA Compliant', sub: 'BAA available' },
            { icon: '🛡️', label: 'SOC 2 Type II', sub: 'Certified 2025' },
            { icon: '📋', label: 'HITRUST', sub: 'In progress' },
            { icon: '🔐', label: 'AES-256 Encryption', sub: 'At rest & transit' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/8 bg-white/3 carbon-card">
              <span className="text-xl">{badge.icon}</span>
              <div>
                <p className="text-sm font-bold text-titanium">{badge.label}</p>
                <p className="font-mono text-xs text-titanium/40">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;