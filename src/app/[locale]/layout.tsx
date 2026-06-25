import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '../../../i18n.config'
import '../../styles/tailwind.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

async function loadMessages(locale: string) {
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default
    return messages
  } catch {
    console.warn(`Messages not found for locale: ${locale}, falling back to English`)
    try {
      return (await import('../../messages/en.json')).default
    } catch {
      console.error('Failed to load fallback English messages')
      return {}
    }
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await loadMessages(locale)
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    // This is the ONE place that renders <html> and <body>.
    // lang + dir are set here from the URL locale — no mismatch possible.
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
