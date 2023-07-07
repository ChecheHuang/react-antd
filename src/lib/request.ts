import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios'

export interface Result<T> {
  code?: number
  status: string
  data: T
  message?: string
}

const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3000,
})

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (config && config.headers && token) {
      config.headers.token = token
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response?.data?.status === 'success') {
      return response.data
    }
    throw new Error(response.data?.message || '請求錯誤')
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch'
type HttpMethodMap = {
  [key in MethodType]: <T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ) => Promise<Result<T>>
}
const http: HttpMethodMap = {
  get: (url: string, data?: object, config?: AxiosRequestConfig) => {
    if (data) {
      const queryString = objectToQueryString(data)
      url += queryString
    }
    return request.get(url, config)
  },
  post: request.post,
  patch: request.patch,
  put: request.put,
  delete: request.delete,
}

export default http

function objectToQueryString(obj: Record<string, any>): string {
  const params = new URLSearchParams()
  for (const key in obj) {
    params.append(key, String(obj[key]))
  }
  return `?${params.toString()}`
}
