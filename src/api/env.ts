import request from '@/lib/request'

interface EnvType {
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean
}

export const env = (data: EnvType) => {
  return request.post<EnvType>('/env', data)
}
