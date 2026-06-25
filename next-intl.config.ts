import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from './i18n.config'

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is a Promise in next-intl v4 — must be awaited
  const requested = await requestLocale

  // Validate locale — fall back to default if undefined or not in list
  const locale =
    requested && locales.includes(requested as any) ? requested : defaultLocale

  try {
    const messages = (await import(`./src/messages/${locale}.json`)).default
    return {
      locale,
      messages,
    }
  } catch (error) {
    // Final fallback to English
    const fallback = (await import(`./src/messages/en.json`)).default
    return {
      locale: defaultLocale,
      messages: fallback,
    }
  }
})
