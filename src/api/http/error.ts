// 统一的请求错误类型：
// - status: HTTP 状态码（如 401/500）
// - code: 业务码或 axios error.code
// - details: 原始响应/错误信息，便于上报或调试
export class HttpError extends Error {
  status?: number
  code?: number | string
  details?: unknown

  constructor(message: string, options?: { status?: number; code?: number | string; details?: unknown }) {
    super(message)
    this.name = 'HttpError'
    this.status = options?.status
    this.code = options?.code
    this.details = options?.details
  }
}
