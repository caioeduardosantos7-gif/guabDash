import { ref, computed } from 'vue'
import type { User } from './models/User'
import { TokenStorage } from '../infrastructure/auth/TokenStorage'
import { authService } from '../application/container'

const user = ref<User | null>(null)
const loading = ref(false)

const isAuthenticated = computed(() => !!user.value)
const isAdmin = computed(() => user.value?.role === 'admin')

async function login(email: string, password: string) {
  loading.value = true
  try {
    const result = await authService.login({ email, password })
    TokenStorage.save({ accessToken: result.accessToken, refreshToken: result.refreshToken })
    user.value = result.user
  } finally {
    loading.value = false
  }
}

function logout() {
  TokenStorage.clear()
  user.value = null
}

async function loadProfile() {
  if (!TokenStorage.hasTokens()) return
  try {
    user.value = await authService.getProfile()
  } catch {
    logout()
  }
}

export function useAuthStore() {
  return { user, loading, isAuthenticated, isAdmin, login, logout, loadProfile }
}
