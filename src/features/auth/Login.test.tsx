import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'

vi.mock('../../api/http', () => ({
  apiFetch: vi.fn(),
}))

import { apiFetch } from '../../api/http'

const mockedApiFetch = vi.mocked(apiFetch)

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra error cuando las credenciales son incorrectas', async () => {
    mockedApiFetch.mockResolvedValue({ ok: false, status: 401 } as Response)

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'admin@test.com' },
    })
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrong' },
    })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    await waitFor(() => {
      expect(screen.getByText(/correo o contraseña incorrectos/i)).toBeInTheDocument()
    })
  })
})
