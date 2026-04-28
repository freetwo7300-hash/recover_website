'use client';
import React, { useEffect, useState } from 'react';

const ScrollController: React.FC = () => {
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setStickyVisible(pct >= 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    /* Sticky bottom CTA */
    <div className={`sticky-cta fixed bottom-0 left-0 right-0 z-50 ${stickyVisible ? 'visible' : ''}`}>
      <div
        className="border-t border-signal/20 px-6 py-4"
        style={{ background: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-signal ping-dot" />
            <p className="text-sm font-semibold text-titanium">
              Stop watching patients disappear. <span className="text-titanium/50">Get your recovery rate now.</span>
            </p>
          </div>
          <a
            href="#lead-form"
            className="flex-shrink-0 bg-signal text-cockpit font-bold px-6 py-3 rounded-xl text-sm signal-glow hover:bg-signal/90 transition-all active:scale-95"
          >
            See Your Recovery Rate →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScrollController;