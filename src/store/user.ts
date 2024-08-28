import { defineStore } from 'pinia'
import { ref } from 'vue'

// const initState = { nickname: '', avatar: '' }
const initState = {
  userId: '1',
  username: 'yz',
  wechatId: '123456789wechat',
  wechatName: 'yz-wechat',
  phone: '1234567890',
  currProgress: 1,
  avatar: '',
  token: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = { ...val }
    }

    const setUserToken = (token: string) => {
      userInfo.value.token = token
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    // const isLogined = computed(() => !!userInfo.value.token)
    const isLogined = computed(() => userInfo.value.token !== '' && userInfo.value.token !== null)

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      setUserToken,
    }
  },
  {
    persist: true,
  },
)
