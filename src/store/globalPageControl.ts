import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  isFirstStepFinished: false,
  isSecondStepFinished: false,
}

type IGlobalPageState = {
  isFirstStepFinished: boolean
  isSecondStepFinished: boolean
}

export const useGlobalPageControlStore = defineStore(
  'globalPageControl',
  () => {
    const globalPageControlInfo = ref<IGlobalPageState>({ ...initState })

    const setInterInfo = (val: IGlobalPageState) => {
      globalPageControlInfo.value = val
    }

    const clearInternfo = () => {
      globalPageControlInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      globalPageControlInfo.value = { ...initState }
    }

    return {
      globalPageControlInfo,
      setInterInfo,
      clearInternfo,
      reset,
    }
  },
  {
    persist: true,
  },
)
