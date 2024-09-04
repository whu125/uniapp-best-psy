import { http } from '@/utils/http'

export interface IAddFeelingItem {
  userId: string
  diaryContent: string
  diaryDate: string
  diaryMood: string
}

export interface IEditFeelingItem {
  diaryId: number
  userId: string
  diaryContent: string
  diaryDate: string
  diaryMood: string
}

export const addMoodDiary = (feeling: IAddFeelingItem) => {
  return http.post('/moodDiary/addMoodDiary', feeling, {})
}

export const editMoodDiary = (feeling: IEditFeelingItem) => {
  return http.post('/moodDiary/editMoodDiary', feeling, {})
}

export const removeMoodDiary = (diaryId: number) => {
  return http.post(`/moodDiary/editMoodDiary?diaryId=${diaryId}`, {}, {})
}

export const getAllMoodDiary = () => {
  return http.post<IEditFeelingItem[]>('/moodDiary/getAllMoodDiary', {}, {})
}
