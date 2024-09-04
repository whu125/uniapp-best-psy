<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '干预测试',
  },
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="问卷" left-arrow @click-left="ToHome()"></wd-navbar>

    <view class="mt-4">
      <wd-progress :percentage="30" />
    </view>
    <view></view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getInquiryByPos, submitInquiry, InquiryResultArray } from '@/service/ganyu/inquiry'

import { useUserStore } from '@/store/user'

defineOptions({
  name: 'tool',
})

const position = ref('')
const userStore = useUserStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const systemInfo = uni.getSystemInfoSync()
const contentHeight = systemInfo.windowHeight - safeAreaInsets.top - 100
onLoad(async (param) => {
  //   position.value = param.position
  //   console.log(position.value)
  //   console.log('请求getInquiryByPos')
  //   const res = await getInquiryByPos('2-pre')
  //   console.log(res)
  //   questions.value = res.data
  //   questions.value.forEach((item) => {
  //     item.options = JSON.parse(item.options)
  //     console.log(item)
  //     if (item.groupIndex == curGroup.value) {
  //       pageQuestions.value.push(item)
  //     }
  //   })
  //   console.log(questions.value)
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
  submit()
}
const curGroup = ref(1)
const islastFlag = ref(false)
const currQuestion = ref<number>(1)
const currAnswer = ref<string>()
const currOptions = ref([])
// const answers = ref(new Map())
const value = ref()
const answers = ref({})
const questions = ref([])
const pageQuestions = ref([])

const changeNext = () => {
  curGroup.value++
  pageQuestions.value = []
  questions.value.forEach((item) => {
    if (item.groupIndex == curGroup.value) {
      pageQuestions.value.push(item)
    }
  })
  islastFlag.value = true
}

const changeLast = () => {
  curGroup.value--
  pageQuestions.value = []
  questions.value.forEach((item) => {
    if (item.groupIndex == curGroup.value) {
      pageQuestions.value.push(item)
    }
  })
  islastFlag.value = false
}
// const formData = ref<InquiryResultArray>([
//   { userId: '1', inquiryId: 1, position: '2-pre', score: 0 },
//   { userId: '1', inquiryId: 1, position: '', score: 0 },
//   { userId: '1', inquiryId: 1, position: '', score: 0 },
//   { userId: '1', inquiryId: 1, position: '', score: 0 },
//   { userId: '1', inquiryId: 1, position: '', score: 0 },
// ])

const submit = async () => {
  // const answersString = Array.from(answers.value.values()).join(';')
  // console.log(answersString)
  const formData = ref<InquiryResultArray>([])
  for (const [inquiryId, score] of Object.entries(answers.value)) {
    formData.value.push({
      userId: userStore.userInfo.userId,
      inquiryId: parseInt(inquiryId),
      position: position.value,
      score: parseInt(score),
    })
  }
  console.log(formData.value)
  const res = await submitInquiry(formData.value)
  console.log(res)

  // if (res.code === 200) {
  // 根据positon设置不同的跳转逻辑
}
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
