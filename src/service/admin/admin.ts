import { http } from '@/utils/http'

export const exportExcelApi = () => {
  return http.get('/upload/excel', {}, {})
}
