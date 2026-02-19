import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ontime-maritime.onrender.com'
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ontimemaritime.com/api/'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: true, // ✅ allow cookies / session
})


// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('ontime_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const message = (error.response.data as any)?.message || error.message

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          // But don't redirect if we're already on a login or register page
          const currentPath = window.location.pathname
          const isOnAuthPage = ['/login', '/register', '/admin/login'].includes(currentPath)

          if (!isOnAuthPage) {
            localStorage.removeItem('ontime_token')
            localStorage.removeItem('ontime_user')
            // Redirect to appropriate login page based on current path
            const isAdminRoute = currentPath.startsWith('/admin')
            window.location.href = isAdminRoute ? '/admin/login' : '/login'
          }
          break
        case 403:
          console.error('Access forbidden:', message)
          break
        case 404:
          console.error('Resource not found:', message)
          break
        case 500:
          console.error('Server error:', message)
          break
        default:
          console.error('API error:', message)
      }

      return Promise.reject({
        status,
        message,
        data: error.response.data,
      })
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: No response from server')
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
      })
    } else {
      // Something else happened
      console.error('Request error:', error.message)
      return Promise.reject({
        status: 0,
        message: error.message,
      })
    }
  }
)

export default api
