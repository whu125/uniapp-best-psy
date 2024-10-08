import { defineStore } from 'pinia'
import { ref } from 'vue'

// const initState = { nickname: '', avatar: '' }

const initState = {
  positions: {
    '1-pre': {},
    '1-post': {},
    '2-pre': {},
    // Add more positions as needed
  },
}

export const useInquiryStore = defineStore(
  'inquiry',
  () => {
    const AnsInfo = ref({ ...initState })

    const setInquiryInfo = (val) => {
      console.log('val', val)
      AnsInfo.value = { ...val }
      console.log('AnsInfo.value', AnsInfo.value)
    }

    // const isLogined = computed(() => !!userInfo.value.token)

    return {
      AnsInfo,
      setInquiryInfo,
    }
  },
  {
    persist: true,
  },
)
