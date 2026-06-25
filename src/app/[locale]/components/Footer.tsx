import React from 'react'
import { useTranslations } from 'next-intl'
import AppLogo from '@/components/ui/AppLogo'

const Footer: React.FC = () => {
  const t = useTranslations('footer')
  const commonT = useTranslations('common')

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo + copyright */}
        <div className="flex items-center gap-4">
          <AppLogo size={20} iconName="HeartIcon" text={commonT('appName')} className="text-signal" />
          <span className="text-sm text-titanium/40 font-medium">
            © {new Date().getFullYear()} {t('copyrightCompany')}
          </span>
        </div>

        {/* Links — all labels come from the footer namespace */}
        <nav className="flex items-center gap-6 text-sm font-medium text-titanium/40">
          {(['features', 'hipaa', 'privacy', 'terms'] as const).map((link) => (
            <a key={link} href="#" className="hover:text-titanium transition-colors duration-200">
              {t(link)}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-4">
          {/* LinkedIn */}
          <a href="#" aria-label="LinkedIn" className="text-titanium/40 hover:text-titanium transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          {/* X/Twitter */}
          <a href="#" aria-label="X" className="text-titanium/40 hover:text-titanium transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer