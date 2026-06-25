'use client'
import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import AppLogo from '@/components/ui/AppLogo'

const Header: React.FC = () => {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <AppLogo
            size={28}
            iconName="HeartIcon"
            text="Recover"
            className="text-signal"
          />
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Integrations', 'Pricing', 'Case Studies'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-titanium/60 hover:text-titanium transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link href="/dashboard" className="hidden md:block text-sm font-medium text-titanium/60 hover:text-titanium transition-colors">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-signal/20 hover:bg-signal/30 text-signal text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="hidden md:block text-sm font-medium text-titanium/60 hover:text-titanium transition-colors">
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-signal text-cockpit text-sm font-bold px-4 py-2 rounded-lg hover:bg-signal/90 transition-all duration-200 signal-glow"
              >
                Get Started
              </Link>
            </>
          )}
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-titanium/60 hover:text-titanium"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                : <><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 mx-0 carbon-card rounded-xl p-4 flex flex-col gap-3">
          {['Features', 'Integrations', 'Pricing', 'Case Studies'].map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-titanium/60 hover:text-titanium py-1">
              {link}
            </a>
          ))}
          {session && (
            <>
              <hr className="my-2 border-white/10" />
              <Link href="/dashboard" className="text-sm font-medium text-titanium/60 hover:text-titanium py-1">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-left text-sm font-medium text-signal py-1"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header