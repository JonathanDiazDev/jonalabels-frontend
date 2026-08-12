export const WHATSAPP_NUMBER = '523339472657'
export const SITE_URL = 'https://jonalabels.com'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export function whatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
