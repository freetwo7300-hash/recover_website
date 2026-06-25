'use client'
import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AppLogo from '@/components/ui/AppLogo'

const Header: React.FC = () => {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('common')
  const navT = useTranslations('nav')

  useEffect(() => {
    setMounted(true)
  }, [])

  const switchLocale = (newLocale: string) => {
    const pathSegments = pathname.split('/')
    pathSegments[1] = newLocale
    window.location.href = pathSegments.join('/')
  }

  if (!mounted) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <AppLogo
            size={28}
            iconName="HeartIcon"
            text={t('appName')}
            className="text-signal"
          />
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {['features', 'integrations', 'pricing', 'caseStudies'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-titanium/60 hover:text-titanium transition-colors duration-200"
            >
              {navT(link as any)}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-sm font-medium text-titanium/60 hover:text-titanium px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
              aria-label="Toggle language"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <path d="M2 12h20"/>
              </svg>
              <span>{locale === 'ar' ? 'العربية' : 'EN'}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-cockpit border border-white/10 rounded-lg overflow-hidden z-50 min-w-32">
                <button
                  onClick={() => {
                    switchLocale('en')
                    setLangMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    locale === 'en'
                      ? 'bg-signal/20 text-signal'
                      : 'text-titanium/60 hover:text-titanium hover:bg-white/5'
                  } transition-colors`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    switchLocale('ar')
                    setLangMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    locale === 'ar'
                      ? 'bg-signal/20 text-signal'
                      : 'text-titanium/60 hover:text-titanium hover:bg-white/5'
                  } transition-colors`}
                >
                  العربية
                </button>
              </div>
            )}
          </div>

          {session ? (
            <>
              <Link href={`/${locale}/dashboard`} className="hidden md:block text-sm font-medium text-titanium/60 hover:text-titanium transition-colors">
                {t('dashboard')}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className="bg-signal/20 hover:bg-signal/30 text-signal text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                {t('signOut')}
              </button>
            </>
          ) : (
            <>
              <Link href={`/${locale}/auth/signin`} className="hidden md:block text-sm font-medium text-titanium/60 hover:text-titanium transition-colors">
                {t('signIn')}
              </Link>
              <Link
                href={`/${locale}/auth/signup`}
                className="bg-signal text-cockpit text-sm font-bold px-4 py-2 rounded-lg hover:bg-signal/90 transition-all duration-200 signal-glow"
              >
                {t('getStarted')}
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
          {['features', 'integrations', 'pricing', 'caseStudies'].map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-titanium/60 hover:text-titanium py-1">
              {navT(link as any)}
            </a>
          ))}
          {session && (
            <>
              <hr className="my-2 border-white/10" />
              <Link href={`/${locale}/dashboard`} className="text-sm font-medium text-titanium/60 hover:text-titanium py-1">
                {t('dashboard')}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className="text-left text-sm font-medium text-signal py-1"
              >
                {t('signOut')}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header