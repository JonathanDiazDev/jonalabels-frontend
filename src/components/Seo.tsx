import { useEffect } from 'react'

export const SITE_URL = 'https://jonalabels.com'
export const DEFAULT_TITLE = 'Jona Labels — Etiquetas que dan identidad'
export const DEFAULT_DESCRIPTION =
  'Etiquetas textiles personalizadas que dan identidad a tu marca. Producción rápida con satén de alta definición.'

interface SeoProps {
  title?: string
  description?: string
  path?: string
}

function setMeta(attribute: 'name' | 'property', attrValue: string, content: string) {
  const selector = `meta[${attribute}="${attrValue}"]`
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export default function Seo({ title, description, path = '/' }: SeoProps) {
  useEffect(() => {
    const finalTitle = title ?? DEFAULT_TITLE
    const finalDescription = description ?? DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${path}`

    document.title = finalTitle
    setMeta('name', 'description', finalDescription)
    setMeta('property', 'og:title', finalTitle)
    setMeta('property', 'og:description', finalDescription)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', finalTitle)
    setMeta('name', 'twitter:description', finalDescription)
    setCanonical(url)
  }, [title, description, path])

  return null
}
