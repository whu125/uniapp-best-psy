import { http } from '@/utils/http'
export interface InquiryOption {
  text: string
  score: number
}

export interface InquiryItem {
  groupId: string
  groupIndex: string
  inquiryId: number
  options: InquiryOption[]
  position: string
  question: string
}

/** POST 请求 */
export const getInquiryByPos = (pos: string) => {
  return http.post<InquiryItem[]>(`/inquiry/getAll?position=${pos}`, {}, {})
}
