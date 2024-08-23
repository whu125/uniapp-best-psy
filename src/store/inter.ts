import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  interId: null,
  answers: null,
}

type IInterState = {
  interId: number
  answers: Map<number, string>
}

export const useInterStore = defineStore(
  'inter',
  () => {
    const interInfo = ref<IInterState>({ ...initState })

    const setInterInfo = (val: IInterState) => {
      interInfo.value = val
    }

    const clearInternfo = () => {
      interInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      interInfo.value = { ...initState }
    }

    return {
      interInfo,
      setInterInfo,
      clearInternfo,
      reset,
    }
  },
  {
    persist: true,
  },
)
