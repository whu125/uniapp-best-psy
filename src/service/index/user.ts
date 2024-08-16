import { http } from '@/utils/http'

export interface User {
  userId: string
  username: string
  wechatId: string
  wechatName: string
  phone: string
  currProgress: number
  avatar: string
}

export const getUserInfo = () => {
  return http.post<User>('/user/getUserInfo', {}, {})
}
