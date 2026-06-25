import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '../i18n.config'

// next-intl middleware automatically sets the locale header that
// getRequestConfig reads via `requestLocale`. Without this, requestLocale
// is always undefined, causing "No locale was returned" errors.
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export function middleware(request: import('next/server').NextRequest) {
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    // Skip API routes, static files, and _next
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
