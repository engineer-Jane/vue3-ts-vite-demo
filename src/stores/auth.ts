import { defineStore } from 'pinia'

type AuthState = {
  token: string | null
  username: string
}

const TOKEN_KEY = 'admin_token'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem(TOKEN_KEY),
    username: 'admin',
  }),
  getters: {
    isAuthed: (state) => Boolean(state.token),
  },
  actions: {
    async login(payload: { username: string; password: string }) {
      if (!payload.username || !payload.password) {
        throw new Error('请输入账号和密码')
      }

      // Demo: 直接发 token，真实项目请替换为接口请求
      const token = `${payload.username}-${Date.now()}`
      this.token = token
      this.username = payload.username
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout() {
      this.token = null
      localStorage.removeItem(TOKEN_KEY)
    },
  },
})

