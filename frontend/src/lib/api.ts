const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function api<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && !(init.body instanceof FormData)) headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const res = await fetch(`${BASE}${path}`, { ...init, headers })
  if (!res.ok) {
    let msg = res.statusText
    try { const j = await res.json(); msg = j.detail || j.message || msg } catch {}
    throw new Error(msg)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}
