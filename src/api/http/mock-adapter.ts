import { AxiosHeaders, type AxiosAdapter, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { LoginPayload, LoginResult } from '../../types/auth'
import { API_SUCCESS_CODE, type ApiFailure, type ApiResponse, type ApiSuccess } from '../../types/http'

// 仅用于本 demo：用 axios adapter 在前端模拟“后端返回 ApiResponse<T>”
// 真实项目可以：
// - 删除 adapter，改为真正的后端 baseURL
// - 或替换成 msw 等更完整的 mock 方案
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function parseData<T>(data: AxiosRequestConfig['data']): T {
  if (typeof data === 'string') {
    return JSON.parse(data) as T
  }

  return (data ?? {}) as T
}

function createResponse<T>(
  config: InternalAxiosRequestConfig,
  data: ApiResponse<T>,
  status = 200,
): AxiosResponse<ApiResponse<T>> {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: {
      ...config,
      headers: AxiosHeaders.from(config.headers),
    },
  }
}

function createSuccess<T>(config: InternalAxiosRequestConfig, data: T, message = 'OK') {
  const body: ApiSuccess<T> = {
    code: API_SUCCESS_CODE,
    message,
    data,
  }

  return createResponse(config, body)
}

function createFailure(config: InternalAxiosRequestConfig, code: number, message: string, status = 200) {
  const body: ApiFailure = {
    code,
    message,
    data: null,
  }

  return createResponse(config, body, status)
}

function handleLogin(config: InternalAxiosRequestConfig) {
  const payload = parseData<LoginPayload>(config.data)

  if (!payload.username || !payload.password) {
    return createFailure(config, 400, '请输入账号和密码')
  }

  if (payload.username !== 'admin' || payload.password !== 'admin') {
    return createFailure(config, 401, '账号或密码错误')
  }

  const result: LoginResult = {
    token: `${payload.username}-${Date.now()}`,
    username: payload.username,
  }

  return createSuccess(config, result, '登录成功')
}

export const mockAdapter: AxiosAdapter = async (config) => {
  await sleep(250)

  const method = config.method?.toLowerCase()
  const url = config.url ?? ''

  if (method === 'post' && url === '/auth/login') {
    return handleLogin(config)
  }

  return createFailure(config, 404, `未匹配到 Mock 接口: ${method?.toUpperCase() ?? 'GET'} ${url}`, 404)
}
