import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from './i18n.config'

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    // Default to 'en' if invalid locale
    return {
      messages: (await import('./src/messages/en.json')).default,
    }
  }

  return {
    messages: (await import(`./src/messages/${locale}.json`)).default,
  }
})
