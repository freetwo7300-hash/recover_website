'use client'

import { signIn } from 'next-auth/react'
import { useState, FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const errorParam = searchParams.get('error')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error === 'CredentialsSignin' ? 'Invalid email or password' : result.error)
      } else if (result?.ok) {
        router.push(callbackUrl)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cockpit px-4">
      <div className="max-w-md w-full carbon-card rounded-xl p-8">
        <h1 className="text-2xl font-bold text-titanium mb-2">Sign In</h1>
        <p className="text-titanium/60 mb-6">Welcome back to Recover</p>

        {error || errorParam ? (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error || 'Sign in failed. Please try again.'}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-titanium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-titanium placeholder:text-titanium/40 focus:outline-none focus:border-signal"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-titanium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-titanium placeholder:text-titanium/40 focus:outline-none focus:border-signal"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-signal hover:bg-signal/90 disabled:bg-signal/50 text-cockpit font-semibold py-2 rounded-lg transition-all duration-200"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-cockpit text-titanium/60">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-titanium">Sign in with Google</span>
        </button>

        <p className="text-center text-titanium/60 text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-signal hover:text-signal/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-cockpit">Loading...</div>}>
      <SignInContent />
    </Suspense>
  )
}
