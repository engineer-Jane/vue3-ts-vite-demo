import { defineStore } from 'pinia'
import { login as loginByApi } from '../api/modules/auth'
import type { LoginPayload } from '../types/auth'
import {
  clearAccessToken,
  clearStoredUsername,
  getAccessToken,
  getStoredUsername,
  setAccessToken,
  setStoredUsername,
} from '../utils/auth-storage'

type AuthState = {
  token: string | null
  username: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: getAccessToken(),
    username: getStoredUsername(),
  }),
  getters: {
    isAuthed: (state) => Boolean(state.token),
  },
  actions: {
    async login(payload: LoginPayload) {
      const result = await loginByApi(payload)
      this.token = result.token
      this.username = result.username
      setAccessToken(result.token)
      setStoredUsername(result.username)
    },
    logout() {
      this.token = null
      this.username = 'admin'
      clearAccessToken()
      clearStoredUsername()
    },
  },
})

