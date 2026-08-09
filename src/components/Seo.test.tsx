import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Seo, { DEFAULT_TITLE, DEFAULT_DESCRIPTION, SITE_URL } from './Seo'

describe('Seo', () => {
  it('actualiza title, meta tags y canonical con los valores dados', () => {
    render(<Seo title="Productos — Jona Labels" description="Descripción de prueba" path="/productos" />)

    expect(document.title).toBe('Productos — Jona Labels')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Descripción de prueba')
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Productos — Jona Labels')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('Descripción de prueba')
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(`${SITE_URL}/productos`)
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe('Productos — Jona Labels')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${SITE_URL}/productos`)
  })

  it('usa valores por defecto cuando no recibe props', () => {
    render(<Seo />)

    expect(document.title).toBe(DEFAULT_TITLE)
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(DEFAULT_DESCRIPTION)
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(`${SITE_URL}/`)
  })
})
