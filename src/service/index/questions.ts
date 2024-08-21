import { http } from '@/utils/http'
export interface IQuestionItem {
	questionId: number
	content: string
	options: string
	questionType: string
	url: string
	interId: string
}

/** POST 请求 */
export const getQuestionByInterId = (interId: number) => {
  return http.post<IQuestionItem>(`/inter/getAllQuestions?interId=${interId}`, {}, {})
}
