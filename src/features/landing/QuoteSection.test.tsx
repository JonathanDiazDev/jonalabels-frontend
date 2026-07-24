import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { QuoteProvider } from '../../context/QuoteContext'
import QuoteSection from './QuoteSection'

describe('QuoteSection', () => {
  it('shows a useful error when required data is missing', () => {
    render(
      <QuoteProvider>
        <QuoteSection />
      </QuoteProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Solicitar Cotización' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Completa tu nombre, WhatsApp y las medidas deseadas.',
    )
  })
})
