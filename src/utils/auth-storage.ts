const TOKEN_KEY = 'admin_token'
const USERNAME_KEY = 'admin_username'

// 这里单独封装 storage 读写：
// - 便于未来迁移到 cookie / indexedDB
// - 便于在拦截器里做“清理登录态”的单点收敛
export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAccessToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getStoredUsername(): string {
  return localStorage.getItem(USERNAME_KEY) ?? 'admin'
}

export function setStoredUsername(username: string) {
  localStorage.setItem(USERNAME_KEY, username)
}

export function clearStoredUsername() {
  localStorage.removeItem(USERNAME_KEY)
}
