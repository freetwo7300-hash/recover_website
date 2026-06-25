import React from 'react'
import type { Metadata, Viewport } from 'next'

// NOTE: No <html> or <body> here.
// The [locale]/layout.tsx renders those with the correct lang + dir attributes.
// Having TWO layouts both render <html> causes a hydration mismatch.

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Recover — Win Back Every Abandoned Patient',
  description:
    'Recover fires HIPAA-compliant email sequences the moment a patient abandons a booking, enrollment, or refill — turning care gaps into recovered revenue for telehealth, hospital, and dental platforms.',
  icons: {
    icon: [{ url: '/assets/images/app_logo.png', type: 'image/x-icon' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Return children directly — <html> and <body> are owned by [locale]/layout.tsx
  return children
}
