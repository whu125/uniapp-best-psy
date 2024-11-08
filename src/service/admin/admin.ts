import { http } from '@/utils/http'

export const exportExcelApi = () => {
  return http.get('/upload/excel', {})
}

export const getAccessTokenApi = () => {
  return http.get('/getAccessToken', {})
}

export const setUserGroupApi = (phone: any, groupId: any) => {
  return http.post('/admin/setUser', { phone, groupId })
}
