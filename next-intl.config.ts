import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  try {
    const messages = (await import(`./src/messages/${locale}.json`)).default
    return {
      messages,
    }
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`)
    // Fallback to English messages
    const fallback = (await import(`./src/messages/en.json`)).default
    return {
      messages: fallback,
    }
  }
})
