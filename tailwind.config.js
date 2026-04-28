/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cockpit: '#0D0D0D',
        graphite: '#1A1A2E',
        signal: '#00E676',
        'signal-dim': 'rgba(0,230,118,0.15)',
        titanium: '#E0E0E0',
        muted: 'rgba(224,224,224,0.45)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'ticker': 'tickerScroll 25s linear infinite',
        'blink': 'blink 1s ease-in-out infinite',
        'ping-dot': 'pingDot 1.2s ease-in-out infinite',
        'counter-pulse': 'counterPulse 2s ease-in-out infinite',
      },
      backgroundImage: {
        'carbon-grid': "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
    },
  },
  plugins: [],
};