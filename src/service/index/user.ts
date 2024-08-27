import { http } from '@/utils/http'

export interface User {
  userId: string
  username: string
  wechatId: string
  wechatName: string
  phone: string
  currProgress: number
  avatar: string
  token: string
}

export const getUserInfo = (token: string) => {
  return http.post<User>('/user/getUserInfo', { token }, {})
}
