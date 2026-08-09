import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { QuoteProvider } from '../../context/QuoteContext'
import QuoteSection from './QuoteSection'

describe('QuoteSection', () => {
  it('shows a useful error when required data is missing', () => {
    render(
      <MemoryRouter>
        <QuoteProvider>
          <QuoteSection />
        </QuoteProvider>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Enviar solicitud web' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Completa tu nombre, WhatsApp y las medidas deseadas.',
    )
  })
})
