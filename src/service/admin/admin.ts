import { http } from '@/utils/http'

export const exportInterExcelApi = (id) => {
  return http.get(`/upload/excel/inter?id=${id}`, {})
}

export const exportExcelApi = () => {
  return http.get('/upload/excel', {})
}

export const exportSingleExcelApi = (id) => {
  return http.get(`/upload/singleexcel?id=${id}`, {})
}

export const getAccessTokenApi = () => {
  return http.get('/getAccessToken', {})
}

export const sendNoticeApi = (id) => {
  return http.get(`/admin/sendNotification?id=${id}`, {})
}

export const setUserGroupApi = (phone: any, groupId: any, userId) => {
  return http.post('/admin/setUser', { phone, groupId, userId })
}

export const exportEvalExcelApi = () => {
  return http.get(`/upload/excel/eval`, {})
}
