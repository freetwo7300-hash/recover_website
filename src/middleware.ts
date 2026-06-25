import { auth } from '@/lib/auth'

export const middleware = auth((req) => {
  // NextAuth and next-intl plugin handle routing automatically
  // This middleware is minimal - just ensure auth() is called
  return
})

export const config = {
  matcher: [
    // Protect dashboard and settings routes
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/protected/:path*',
  ],
}
