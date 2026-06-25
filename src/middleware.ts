import { createMiddleware } from 'next-intl/middleware'
import { auth } from '@/lib/auth'

// Inline locale config for middleware compatibility
const locales = ['en', 'ar'] as const
const defaultLocale = 'en' as const

// Create next-intl middleware for locale handling
const intlMiddleware = createMiddleware({
  locales: locales as any,
  defaultLocale,
  localePrefix: 'as-needed',
})

export const middleware = auth((req) => {
  // Run next-intl middleware for locale handling
  return intlMiddleware(req)
})

export const config = {
  matcher: [
    // Match all localized routes and protected routes
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
