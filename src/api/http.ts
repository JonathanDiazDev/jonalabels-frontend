const configuredBaseUrl = import.meta.env.VITE_API_URL ?? '/api/v1'

export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '')

export function apiUrl(path: string): string {
  return `${API_BASE_URL}/${path.replace(/^\//, '')}`
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(apiUrl(path), { ...init, credentials: 'include' })
}

/** Use only for admin/auth calls that should send the user to login when unauthenticated. */
export async function apiFetchAdmin(path: string, init?: RequestInit): Promise<Response> {
  const res = await apiFetch(path, init)

  if (res.status === 401 && !window.location.pathname.startsWith('/login')) {
    window.location.href = '/login'
    throw new Error('Sesión expirada')
  }

  return res
}
