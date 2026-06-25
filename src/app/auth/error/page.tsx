'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

const errorMessages: Record<string, string> = {
  CredentialsSignin: 'Invalid email or password.',
  Callback: 'An error occurred during authentication callback.',
  OAuthSignin: 'An error occurred during OAuth sign-in.',
  OAuthCallback: 'An error occurred during OAuth callback.',
  OAuthCreateAccount: 'Could not create OAuth account.',
  EmailCreateAccount: 'Could not create email account.',
  Callback: 'An error occurred during callback.',
  EmailSignInError: 'Email sign-in error.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  SessionCallback: 'An error occurred in the session callback.',
  SignoutError: 'An error occurred during sign-out.',
}

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || 'Unknown'
  const message = errorMessages[error as keyof typeof errorMessages] || 'An unexpected error occurred.'

  return (
    <div className="min-h-screen flex items-center justify-center bg-cockpit px-4">
      <div className="max-w-md w-full carbon-card rounded-xl p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/10 border-2 border-red-500/30 rounded-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-titanium mb-2">Authentication Error</h1>
        <p className="text-titanium/60 mb-6">{message}</p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 text-left">
          <p className="text-xs font-mono text-titanium/40 break-all">Error: {error}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/auth/signin"
            className="w-full bg-signal hover:bg-signal/90 text-cockpit font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Try Signing In Again
          </Link>

          <Link
            href="/auth/signup"
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-titanium font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Create New Account
          </Link>

          <Link
            href="/"
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-titanium font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-cockpit">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  )
}
