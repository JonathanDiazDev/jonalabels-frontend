const configuredBaseUrl = import.meta.env.VITE_API_URL ?? '/api/v1'

export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '')

export function apiUrl(path: string): string {
  return `${API_BASE_URL}/${path.replace(/^\//, '')}`
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(apiUrl(path), { ...init, credentials: 'include' })

  if (res.status === 401 && !window.location.pathname.startsWith('/login')) {
    window.location.href = '/login'
    throw new Error('Sesión expirada')
  }

  return res
}
