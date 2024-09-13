import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  interId: null,
  recordId: null,
  interPages: null,
  userInputContent: null,
  userInputQuestions: null,
  userInputPages: null,
}

export type IInterPage = {
  pageId: number
  interId: number
  imgUrl: string
  textContent: string
  navbarTitle: string
  operationIcon: string
  operationText: string
  specialPage: string
}

type IInterState = {
  interId: number
  recordId: number
  interPages: Array<IInterPage>
  userInputContent: string
  userInputQuestions: string
  userInputPages: string
}

export const useInterStore = defineStore(
  'inter',
  () => {
    const interInfo = ref<IInterState>({ ...initState })

    const pageCount = ref<number>(0)

    const pageIndex = ref<number>(0)

    const setInterInfo = (val: IInterState) => {
      interInfo.value = val
      pageCount.value = val.interPages.length
    }

    const clearInternfo = () => {
      interInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      interInfo.value = { ...initState }
    }

    const addPageIndex = () => {
      if (pageIndex.value < pageCount.value - 1) {
        pageIndex.value = pageIndex.value + 1
        console.log(pageIndex.value)
      } else {
        return 'pageEnd'
      }
    }

    const resetIndex = () => {
      pageIndex.value = 0
    }

    return {
      interInfo,
      setInterInfo,
      clearInternfo,
      pageCount,
      reset,
      pageIndex,
      addPageIndex,
      resetIndex,
    }
  },
  {
    persist: true,
  },
)
