'use client';
import React, { useState } from 'react';

type Step = 1 | 2 | 3 | 4;

const verticals = [
  'Telehealth platform',
  'Hospital system',
  'Dental chain',
  'Vision chain',
  'Pharmacy / PBM',
  'Mental health',
  'Other',
];

const sliderLabels = ['500', '2K', '5K', '10K', '25K', '50K+'];

const LeadFormSection: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [vertical, setVertical] = useState('');
  const [sliderVal, setSliderVal] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) setStep(2);
  };

  const handleVerticalNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (vertical) setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async call
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const projectedRate = 22 + sliderVal * 2;
  const volume = parseInt(sliderLabels[sliderVal].replace(/[^0-9]/g, '')) || 500;

  return (
    <section id="lead-form" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-signal/70 uppercase tracking-widest mb-4 block">Lead Capture</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-titanium tracking-tight mb-4">
            See your recovery rate in 60 seconds.
          </h2>
          <p className="text-titanium/50 text-lg">
            Answer three questions. We email a personalized projection before you close this tab.
          </p>
        </div>

        <div className="carbon-card rounded-2xl p-8 relative overflow-hidden">
          {/* Progress bar */}
          {!submitted && (
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="flex-1 h-1 rounded-full transition-all duration-500"
                  style={{
                    background: s <= step
                      ? 'linear-gradient(90deg, rgba(0,230,118,0.8), #00E676)'
                      : 'rgba(255,255,255,0.08)',
                    boxShadow: s <= step ? '0 0 8px rgba(0,230,118,0.4)' : 'none',
                  }}
                />
              ))}
            </div>
          )}

          {submitted ? (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-signal/15 border border-signal/30 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-titanium mb-3">Your projection is on its way.</h3>
              <p className="text-titanium/50 mb-2">
                Check <span className="text-signal font-semibold">{email}</span> — usually arrives within 60 seconds.
              </p>
              <p className="font-mono text-xs text-titanium/30 mt-6">
                Projected recovery rate for your volume: <span className="text-signal">{projectedRate}–{projectedRate + 8}%</span>
              </p>
            </div>
          ) : (
            <>
              {/* Step 1 — Email */}
              {step === 1 && (
                <form onSubmit={handleEmailNext} className="flex flex-col gap-5">
                  <div>
                    <label className="font-mono text-xs text-signal/70 uppercase tracking-widest block mb-3">
                      01 / Work email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@healthsystem.com"
                      className="console-input w-full rounded-xl px-4 py-3.5 text-sm font-medium"
                      required
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-signal text-cockpit font-bold py-4 rounded-xl text-base signal-glow hover:bg-signal/90 transition-all active:scale-[0.98]"
                  >
                    Continue →
                  </button>
                  <p className="text-center font-mono text-xs text-titanium/25">No spam. One email. Your projection.</p>
                </form>
              )}

              {/* Step 2 — Vertical */}
              {step === 2 && (
                <form onSubmit={handleVerticalNext} className="flex flex-col gap-5">
                  <div>
                    <label className="font-mono text-xs text-signal/70 uppercase tracking-widest block mb-3">
                      02 / Healthcare vertical
                    </label>
                    <select
                      value={vertical}
                      onChange={(e) => setVertical(e.target.value)}
                      className="console-input w-full rounded-xl px-4 py-3.5 text-sm font-medium"
                      required
                    >
                      <option value="">Select your vertical…</option>
                      {verticals.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-signal text-cockpit font-bold py-4 rounded-xl text-base signal-glow hover:bg-signal/90 transition-all active:scale-[0.98]"
                  >
                    Continue →
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-center font-mono text-xs text-titanium/35 hover:text-titanium/60 transition-colors"
                  >
                    ← Back
                  </button>
                </form>
              )}

              {/* Step 3 — Volume slider */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <label className="font-mono text-xs text-signal/70 uppercase tracking-widest block mb-3">
                      03 / Monthly abandoned sessions
                    </label>
                    <div className="carbon-card rounded-xl p-5 mb-4">
                      <div className="flex items-end justify-between mb-3">
                        <span className="text-3xl font-extrabold text-signal font-mono">
                          {sliderLabels[sliderVal]}
                        </span>
                        <span className="text-xs text-titanium/40 font-mono">sessions / month</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={5}
                        step={1}
                        value={sliderVal}
                        onChange={(e) => setSliderVal(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2">
                        {sliderLabels.map((l) => (
                          <span key={l} className="font-mono text-[9px] text-titanium/25">{l}</span>
                        ))}
                      </div>
                    </div>

                    {/* Live projection preview */}
                    <div className="rounded-xl border border-signal/20 bg-signal/5 p-4 flex items-center justify-between">
                      <div>
                        <p className="font-mono text-xs text-signal/60 uppercase tracking-widest mb-1">Projected recovery</p>
                        <p className="text-2xl font-extrabold text-signal">{projectedRate}–{projectedRate + 8}%</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs text-titanium/40 mb-1">Est. monthly value</p>
                        <p className="text-lg font-bold text-titanium">
                          ${((volume * (projectedRate / 100)) * 6.5).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-signal text-cockpit font-bold py-4 rounded-xl text-base signal-glow hover:bg-signal/90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Calculating your projection…
                      </>
                    ) : (
                      'Send My Recovery Projection →'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-center font-mono text-xs text-titanium/35 hover:text-titanium/60 transition-colors"
                  >
                    ← Back
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-titanium/35 font-mono">
          <span>🔒 HIPAA compliant</span>
          <span>· No credit card required</span>
          <span>· Results in 60 seconds</span>
          <span>· 140+ platforms trust Recover</span>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;