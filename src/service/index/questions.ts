import { http } from '@/utils/http'
export interface IQuestionItem {
  questionId: number
  content: string
  options: string
  questionType: string
  url: string
  interId: string
}

export interface IStartInter {
  userId: string
  interId: number
  startTime: string
}

export interface ISubmitInter {
  userId: string
  interId: number
  endTime: string
  answers: Map<number, string>
}

/** POST 请求 */
export const getQuestionByInterId = (interId: number) => {
  return http.post<IQuestionItem[]>(`/inter/getAllQuestions?interId=${interId}`, {}, {})
}

export const startInter = (startInter: IStartInter) => {
  return http.post<null>(`/inter/startInter`, startInter, {})
}

export const submitInter = (submitInter: ISubmitInter) => {
  return http.post<null>(`/inter/submitInter`, submitInter, {})
}
