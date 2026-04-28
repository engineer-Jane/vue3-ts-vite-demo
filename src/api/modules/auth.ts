import { http } from '../http/client'
import type { LoginPayload, LoginResult } from '../../types/auth'

export function login(payload: LoginPayload) {
  return http.post<LoginResult, LoginPayload>('/auth/login', payload, {
    meta: {
      // 登录接口本身不应携带 Authorization
      skipAuth: true,
    },
  })
}
