import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE, SITE_URL } from '../config/constants'

export { SITE_URL }
export const DEFAULT_TITLE = 'Jona Labels — Etiquetas que dan identidad'
export const DEFAULT_DESCRIPTION =
  'Etiquetas textiles personalizadas que dan identidad a tu marca. Producción rápida con satén de alta definición.'

interface SeoProps {
  title?: string
  description?: string
  path?: string
  noindex?: boolean
  ogImage?: string
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

export default function Seo({
  title,
  description,
  path = '/',
  noindex = false,
  ogImage = DEFAULT_OG_IMAGE,
}: SeoProps) {
  useEffect(() => {
    const finalTitle = title ?? DEFAULT_TITLE
    const finalDescription = description ?? DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${path}`

    document.title = finalTitle
    setMeta('name', 'description', finalDescription)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', finalTitle)
    setMeta('property', 'og:description', finalDescription)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', ogImage)
    setMeta('name', 'twitter:title', finalTitle)
    setMeta('name', 'twitter:description', finalDescription)
    setMeta('name', 'twitter:image', ogImage)
    setCanonical(url)
  }, [title, description, path, noindex, ogImage])

  return null
}
