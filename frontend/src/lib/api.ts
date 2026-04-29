import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ontime-maritime.onrender.com'
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ontimemaritime.com/api/'
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
// 
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
  withCredentials: true, // required so the httpOnly refresh cookie is sent
})

// ── Error message normaliser ─────────────────────────────────────────────────
// Converts raw NestJS / server messages into friendly, actionable text.
// All Promise.reject() calls go through here so every consumer gets clean text.
function friendlyMessage(status: number, raw: string | string[] | undefined, data?: any): string {
  // Validation arrays from class-validator: join into a single sentence
  if (Array.isArray(raw)) return raw.join(' ')

  const msg = (raw ?? '').trim()

  // ── Rate limiting ────────────────────────────────────────────────────────
  if (status === 429 || /throttl|too many request/i.test(msg)) {
    const seconds: number | undefined =
      data?.retryAfter ?? data?.retry_after ?? data?.ttl
    if (seconds) {
      const mins = Math.ceil(seconds / 60)
      return mins >= 2
        ? `Too many attempts. Please wait ${mins} minutes before trying again.`
        : `Too many attempts. Please wait ${seconds} second${seconds !== 1 ? 's' : ''} before trying again.`
    }
    return 'Too many attempts. Please wait a minute and try again.'
  }

  // ── Server / internal errors ─────────────────────────────────────────────
  if (status >= 500 || /internal server error/i.test(msg)) {
    return 'Something went wrong on our end. Please try again in a moment.'
  }

  // ── Strip NestJS exception class prefixes ────────────────────────────────
  // "ThrottlerException: Too Many Requests" → "Too Many Requests"
  // "NotFoundException: Listing not found"  → "Listing not found"
  if (/Exception:/i.test(msg)) {
    const afterColon = msg.split(':').slice(1).join(':').trim()
    if (afterColon) return friendlyMessage(status, afterColon, data)
  }

  // ── Known backend codes (pass through — handled specially in pages) ──────
  if (data?.code === 'EMAIL_NOT_VERIFIED' || data?.code === 'ACCOUNT_LOCKED') return msg

  // ── Generic status fallbacks ─────────────────────────────────────────────
  if (!msg || msg.toLowerCase() === 'unauthorized')       return 'Your session has expired. Please log in again.'
  if (!msg || msg.toLowerCase() === 'forbidden')          return 'You do not have permission to perform this action.'
  if (!msg || msg.toLowerCase() === 'not found')          return 'The requested resource was not found.'
  if (!msg || msg.toLowerCase() === 'bad request')        return 'Invalid request. Please check your input and try again.'
  if (!msg || msg.toLowerCase() === 'service unavailable') return 'The service is temporarily unavailable. Please try again later.'

  return msg || 'An unexpected error occurred. Please try again.'
}

// ── Request interceptor — attach access token ────────────────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('ontime_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// ── Response interceptor — silent token refresh on 401 ───────────────────────
let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

function processQueue(newToken: string) {
  refreshQueue.forEach((cb) => cb(newToken))
  refreshQueue = []
}

function forceLogout(isAdmin = false) {
  localStorage.removeItem('ontime_token')
  localStorage.removeItem('ontime_user')
  window.dispatchEvent(new CustomEvent('auth:session-expired', { detail: { isAdmin } }))
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (!error.response) {
      return Promise.reject({ status: 0, message: 'Network error. Please check your connection.' })
    }

    const { status }   = error.response
    const rawData      = error.response.data as any
    const rawMessage   = rawData?.message || error.message
    const message      = friendlyMessage(status, rawMessage, rawData)

    // ── 401 handling — attempt silent refresh ──────────────────────────────
    if (status === 401) {
      const currentPath = window.location.pathname
      const isSafePath  =
        currentPath === '/login' ||
        currentPath === '/register' ||
        currentPath.startsWith('/admin/login')

      // No token means the user is simply not logged in — there is nothing
      // to refresh and no session to invalidate. Reject quietly so that
      // components on public pages can handle the error themselves (e.g.
      // show fallback UI) without being kicked to /login.
      const hasToken = !!localStorage.getItem('ontime_token')
      if (!hasToken) {
        return Promise.reject({ status, message, data: rawData })
      }

      if (isSafePath || originalRequest.url?.includes('/auth/refresh')) {
        if (!isSafePath) forceLogout(currentPath.startsWith('/admin'))
        return Promise.reject({ status, message, data: rawData })
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          })
        })
      }

      if (originalRequest._retry) {
        forceLogout(currentPath.startsWith('/admin'))
        return Promise.reject({ status, message, data: rawData })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await api.post('/auth/refresh')
        const newToken: string = data.access_token

        localStorage.setItem('ontime_token', newToken)
        window.dispatchEvent(new CustomEvent('auth:token-refreshed', { detail: { token: newToken } }))

        processQueue(newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch {
        processQueue('')
        forceLogout(currentPath.startsWith('/admin'))
        return Promise.reject({ status: 401, message: 'Session expired. Please log in again.' })
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject({ status, message, data: rawData })
  },
)

export default api
