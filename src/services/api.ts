/**
 * API Service Layer
 * Centralized HTTP client with interceptors for all API calls
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { API_CONFIG, ENV } from '@config/environment'
import { tokenUtils } from '@utils'

/**
 * API Response Types
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiErrorResponse {
  code: string
  message: string
  details?: unknown
}

/**
 * API Client Class
 */
class ApiClient {
  private client: AxiosInstance
  private requestInterceptor?: number
  private responseInterceptor?: number

  constructor(baseURL: string = API_CONFIG.baseURL) {
    this.client = axios.create({
      baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request Interceptor - Add auth token
    this.requestInterceptor = this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = tokenUtils.getToken()

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        if (ENV.isDevelopment) {
          console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`)
        }

        return config
      },
      (error) => {
        console.error('[API Request Error]', error)
        return Promise.reject(error)
      }
    )

    // Response Interceptor - Handle errors and token refresh
    this.responseInterceptor = this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        if (ENV.isDevelopment) {
          console.debug(`[API Response] ${response.status}`, response.data)
        }

        return response
      },
      async (error: AxiosError<ApiErrorResponse>) => {
        console.error('[API Response Error]', error)

        // Token expired - trigger logout
        if (error.response?.status === 401) {
          tokenUtils.removeToken()
          window.dispatchEvent(new CustomEvent('auth:token-expired'))
          return Promise.reject({
            code: 'UNAUTHORIZED',
            message: 'Sesión expirada. Por favor inicia sesión de nuevo.',
          })
        }

        // Server error
        if (error.response?.status === 500) {
          return Promise.reject({
            code: 'SERVER_ERROR',
            message: 'Error del servidor. Intenta más tarde.',
          })
        }

        // Network error
        if (!error.response) {
          return Promise.reject({
            code: 'NETWORK_ERROR',
            message: 'Error de conexión. Verifica tu internet.',
          })
        }

        return Promise.reject(error.response.data)
      }
    )
  }

  /**
   * Generic GET request
   */
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.get<ApiResponse<T>>(url, config)
  }

  /**
   * Generic POST request
   */
  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.post<ApiResponse<T>>(url, data, config)
  }

  /**
   * Generic PUT request
   */
  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.put<ApiResponse<T>>(url, data, config)
  }

  /**
   * Generic PATCH request
   */
  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.patch<ApiResponse<T>>(url, data, config)
  }

  /**
   * Generic DELETE request
   */
  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.delete<ApiResponse<T>>(url, config)
  }

  /**
   * Cleanup interceptors
   */
  destroy(): void {
    if (this.requestInterceptor !== undefined) {
      this.client.interceptors.request.eject(this.requestInterceptor)
    }
    if (this.responseInterceptor !== undefined) {
      this.client.interceptors.response.eject(this.responseInterceptor)
    }
  }
}

// Export singleton instance
export const api = new ApiClient()

export default api
