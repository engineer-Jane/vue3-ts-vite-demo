export const API_SUCCESS_CODE = 0 as const

// 约定：后端统一返回 ApiResponse<T>。
// - code === 0 表示业务成功
// - code !== 0 表示业务失败（仍可能是 200 状态码）
export type ApiSuccess<T> = {
  code: typeof API_SUCCESS_CODE
  message: string
  data: T
}

export type ApiFailure = {
  code: number
  message: string
  data?: null
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

// 运行时兜底：避免把非预期 payload 当作 ApiResponse 处理
export function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  if (!value || typeof value !== 'object') {
    return false
  }

  return 'code' in value && 'message' in value
}

export function isApiSuccess<T>(value: ApiResponse<T>): value is ApiSuccess<T> {
  return value.code === API_SUCCESS_CODE
}
