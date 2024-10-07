import { defineStore } from 'pinia'
import { ref } from 'vue'

// const initState = { nickname: '', avatar: '' }
const initState = {
  userId: '1',
  username: 'yz',
  wechatId: '123456789wechat',
  wechatName: 'yz-wechat',
  phone: '1234567890',
  currProgress: 0,
  avatar: '',
  token: '',
  // 这个字段记录，下一次应该解锁的时间
  lockTime: '',
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

    const setLockTime = () => {
      // 24小时后解锁
      userInfo.value.lockTime = new Date().getTime() + 24 * 60 * 60 * 1000
    }
    const addProgress = () => {
      userInfo.value.currProgress = userInfo.value.currProgress + 1
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
      addProgress,
      setLockTime,
    }
  },
  {
    persist: true,
  },
)
