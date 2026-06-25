import { auth } from '@/lib/auth'

export const middleware = auth((req) => {
  // If not authenticated and trying to access protected routes, auth() will handle redirect
  return
})

export const config = {
  matcher: [
    // Protect these routes
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/protected/:path*',
  ],
}
