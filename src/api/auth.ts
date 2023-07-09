import request from '@/lib/request'

interface User {
  id: number
  user_name: string
  user_password: string
  user_email: string
  user_avatar: string
}

interface LoginResponse {
  user: User
  token: string
}

export const login = (data: { name: string; password: string }) => {
  return request.post<{ data: LoginResponse[]; token: string }>(
    'user/login',
    data
  )
}
