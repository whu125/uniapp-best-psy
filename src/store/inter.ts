import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  interId: -1,
  recordId: 0,
  interPages: null,
}

export type IInterPage = {
  pageId: number
  interId: number
  imgUrl: string
  textContent: string
  navbarTitle: string
  operationIcon: string
  operationText: string
  slideImages: Array<string>
  inputQuestions: Array<string>
  inputPlaceholders: Array<string>
  buttonUrls: Array<string>
  audioUrls: Array<string>
  selectUrls: Array<string>
  specialPage: string
  pageType: string
}

type IInterState = {
  interId: number
  recordId: number
  interPages: Array<IInterPage>
}

export const useInterStore = defineStore(
  'inter',
  () => {
    const interInfo = ref<IInterState>({ ...initState })

    const pageCount = ref<number>(0)

    const pageIndex = ref<number>(0)

    const userInputMap = ref<Map<number, string>>(new Map<number, string>())

    const isStartJourney = ref<boolean>(false)

    const isTaskFinished = ref<boolean>(false)

    const inputPages = computed(() => {
      let inputPages = ''
      userInputMap.value.forEach((value, key) => {
        inputPages = inputPages + key + '#'
      })
      return inputPages
    })

    const inputContent = computed(() => {
      let inputContent = ''
      userInputMap.value.forEach((value, key) => {
        inputContent = inputContent + value + '#'
      })
      return inputContent
    })

    const setUserInputMap = (key: number, value: string) => {
      userInputMap.value.set(key, value)
      console.log(userInputMap.value)
    }

    const setInterInfo = (val: IInterState) => {
      interInfo.value = val
      pageCount.value = val.interPages.length
    }

    const clearInternfo = () => {
      interInfo.value = { ...initState }
      pageCount.value = 0
      pageIndex.value = 0
      userInputMap.value = new Map<number, string>()
      isStartJourney.value = false
      isTaskFinished.value = false
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

    const minusPageIndex = () => {
      pageIndex.value = pageIndex.value - 1
    }

    const setPageIndex = (index: number) => {
      pageIndex.value = index
      console.log(pageIndex.value)
    }

    return {
      interInfo,
      setInterInfo,
      clearInternfo,
      setPageIndex,
      pageCount,
      reset,
      pageIndex,
      userInputMap,
      addPageIndex,
      minusPageIndex,
      isStartJourney,
      isTaskFinished,
      setUserInputMap,
      inputPages,
      inputContent,
    }
  },
  {
    persist: true,
  },
)
