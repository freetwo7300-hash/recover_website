import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from './i18n.config'

export default getRequestConfig(async ({ locale }) => {
  // Validate locale - use default if undefined or not in locales list
  const validLocale = locale && locales.includes(locale as any) ? locale : defaultLocale

  try {
    const messages = (await import(`./src/messages/${validLocale}.json`)).default
    return {
      messages,
    }
  } catch (error) {
    // Final fallback to English
    const fallback = (await import(`./src/messages/en.json`)).default
    return {
      messages: fallback,
    }
  }
})
