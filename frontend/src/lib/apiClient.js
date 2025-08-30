import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

// Access token stored in memory (Pinia can manage it)
let accessToken = null

export function setAccessToken(token) {
  accessToken = token
}

// Attach Authorization header automatically
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Handle 401 errors (just redirect to login, no refresh flow)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Clear token
      setAccessToken(null)
      // You can also trigger Pinia logout or redirect here
      // e.g. window.location.href = "/auth/login";
    }
    return Promise.reject(err)
  },
)
