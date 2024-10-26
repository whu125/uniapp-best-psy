import { http } from '@/utils/http'

export const exportExcelApi = () => {
  return http.get('/upload/excel', {})
}

export const getAccessTokenApi = () => {
  return http.get('/getAccessToken', {})
}
