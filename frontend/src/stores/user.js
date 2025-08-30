import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api, setAccessToken } from '@/lib/apiClient' // import your updated axios

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!user.value)

  // Load token from localStorage on app startup
  function loadToken() {
    const stored = localStorage.getItem('accessToken')
    if (stored) {
      token.value = stored
      setAccessToken(stored)
    }
  }

  async function fetchSession() {
    loadToken()
    if (!token.value) {
      user.value = null
      return
    }

    try {
      const { data } = await api.get('/auth/me')
      user.value = data.user
    } catch {
      user.value = null
      setAccessToken(null)
      token.value = null
      localStorage.removeItem('accessToken')
    }
  }

  async function loginWithEmail(email, password) {
    loading.value = true
    try {
      const { data } = await api.post('/auth/login', { email, password })
      user.value = data.user
      token.value = data.accessToken
      setAccessToken(data.accessToken)
      localStorage.setItem('accessToken', data.accessToken)
    } finally {
      loading.value = false
    }
  }

  async function register(email, password, name) {
    loading.value = true
    try {
      const { data } = await api.post('/auth/register', { email, password, name })
      user.value = data.user
      token.value = data.accessToken
      setAccessToken(data.accessToken)
      localStorage.setItem('accessToken', data.accessToken)
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    setAccessToken(null)
    localStorage.removeItem('accessToken')
    router.push({ name: 'login' })
  }

  return {
    user,
    token,
    loading,
    isLoggedIn,
    fetchSession,
    loginWithEmail,
    register,
    logout,
  }
})
