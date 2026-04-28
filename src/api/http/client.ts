import axios, { AxiosHeaders, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { HttpError } from './error'
import { mockAdapter } from './mock-adapter'
import { clearAccessToken, clearStoredUsername, getAccessToken } from '../../utils/auth-storage'
import { isApiResponse, isApiSuccess, type ApiResponse } from '../../types/http'

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? '/api'
const USE_MOCK = String(import.meta.env.VITE_USE_MOCK ?? 'false') === 'true'

// 扩展 axios config：在单次请求级别传递“拦截器行为开关”
export type RequestMeta = {
  skipAuth?: boolean
}

export type TypedRequestConfig<TData = unknown> = AxiosRequestConfig<TData> & {
  meta?: RequestMeta
}

// 类型增强：让 `config.meta` 在 axios 的类型系统里也可用（避免每处手动断言）
declare module 'axios' {
  interface AxiosRequestConfig {
    meta?: RequestMeta
  }
}

// 将各种来源的错误（业务失败/网络失败/非预期异常）统一收敛成 HttpError
function normalizeError(error: unknown): HttpError {
  if (error instanceof HttpError) {
    return error
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const payload = error.response?.data

    if (isApiResponse(payload)) {
      return new HttpError(payload.message, {
        status,
        code: payload.code,
        details: payload,
      })
    }

    return new HttpError(error.message || '网络请求失败', {
      status,
      code: error.code,
      details: error.response?.data,
    })
  }

  if (error instanceof Error) {
    return new HttpError(error.message)
  }

  return new HttpError('未知请求异常')
}

function clearAuthState() {
  clearAccessToken()
  clearStoredUsername()
}

class HttpClient {
  private readonly instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      // 约定：所有接口统一挂在 /api 下（Vite 可用代理转发到后端）
      baseURL: API_BASE,
      timeout: 10_000,
      // demo 用 mockAdapter；接入真实后端时建议关闭（VITE_USE_MOCK=false）
      adapter: USE_MOCK ? mockAdapter : undefined,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use((config) => {
      // 可用于登录/刷新 token 等“无需带 Authorization”的场景
      if (config.meta?.skipAuth) {
        return config
      }

      const token = getAccessToken()
      if (!token) {
        return config
      }

      const headers = AxiosHeaders.from(config.headers)
      headers.set('Authorization', `Bearer ${token}`)
      config.headers = headers

      return config
    })

    this.instance.interceptors.response.use(
      (response) => {
        const payload = response.data

        // 兼容非 ApiResponse<T> 的返回（例如下载文件、第三方接口等）
        if (!isApiResponse(payload)) {
          return response
        }

        if (isApiSuccess(payload)) {
          return response
        }

        // 约定：业务码 401 也视为未登录（并清理本地登录态）
        if (payload.code === 401) {
          clearAuthState()
        }

        throw new HttpError(payload.message, {
          status: response.status,
          code: payload.code,
          details: payload,
        })
      },
      (error: unknown) => {
        const normalizedError = normalizeError(error)

        if (normalizedError.status === 401 || normalizedError.code === 401) {
          clearAuthState()
        }

        return Promise.reject(normalizedError)
      },
    )
  }

  // 最终对外暴露的是“已解包后的 TResponse”，调用方无需再处理 code/message/data
  async request<TResponse, TData = unknown>(config: TypedRequestConfig<TData>): Promise<TResponse> {
    try {
      const axiosResponse = await this.instance.request<
        ApiResponse<TResponse>,
        AxiosResponse<ApiResponse<TResponse>>,
        TData
      >(config)
      const response = axiosResponse.data

      if (!isApiResponse<TResponse>(response)) {
        throw new HttpError('接口返回格式不正确', { details: axiosResponse.data })
      }

      if (!isApiSuccess(response)) {
        throw new HttpError(response.message, {
          code: response.code,
          details: response,
        })
      }

      return response.data
    } catch (error) {
      throw normalizeError(error)
    }
  }

  get<TResponse, TParams = unknown>(url: string, config?: TypedRequestConfig<TParams>) {
    return this.request<TResponse, TParams>({
      ...config,
      method: 'GET',
      url,
    })
  }

  post<TResponse, TData = unknown>(url: string, data?: TData, config?: TypedRequestConfig<TData>) {
    return this.request<TResponse, TData>({
      ...config,
      method: 'POST',
      url,
      data,
    })
  }

  put<TResponse, TData = unknown>(url: string, data?: TData, config?: TypedRequestConfig<TData>) {
    return this.request<TResponse, TData>({
      ...config,
      method: 'PUT',
      url,
      data,
    })
  }

  delete<TResponse, TData = unknown>(url: string, config?: TypedRequestConfig<TData>) {
    return this.request<TResponse, TData>({
      ...config,
      method: 'DELETE',
      url,
    })
  }
}

export const http = new HttpClient()
