import React from 'react'
import type { Metadata, Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '../../../i18n.config'
import '../../styles/tailwind.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Recover — Win Back Every Abandoned Patient',
  description: 'Recover fires HIPAA-compliant email sequences the moment a patient abandons a booking, enrollment, or refill — turning care gaps into recovered revenue for telehealth, hospital, and dental platforms.',
  icons: {
    icon: [
      { url: '/assets/images/app_logo.png', type: 'image/x-icon' }
    ],
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  // Await params before using in Next.js 15+
  const { locale } = await params

  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Set request locale for next-intl server functions
  setRequestLocale(locale)

  // Get messages - next-intl will use the locale set above
  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </NextIntlClientProvider>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Frecover178830back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  )
}
