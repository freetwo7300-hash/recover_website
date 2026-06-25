import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ar']

export async function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Check if pathname starts with a locale
  const pathnameHasLocale = locales.some(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If pathname doesn't have a locale, redirect to /en + pathname
  if (!pathnameHasLocale && pathname !== '/') {
    return NextResponse.redirect(
      new URL(`/en${pathname}`, request.url)
    )
  }

  // NextAuth handles authentication
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip API routes, static files, and _next
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
