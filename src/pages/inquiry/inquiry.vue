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
    class="overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="问卷" left-arrow @click-left="ToHome()"></wd-navbar>

    <view class="con">
      <view class="mt-4">
        <wd-progress :percentage="curPer" />
      </view>

      <!-- 问题 -->
      <view class="question">
        <text>{{ questions[curId - 1]?.question }}</text>
      </view>

      <!-- 选项列表 -->
      <view class="options" style="background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6)">
        <wd-radio-group v-model="answers[curId - 1]" cell>
          <view
            class="option"
            v-for="option in questions[curId - 1]?.options"
            :key="option.score"
            style="background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6)"
          >
            <wd-radio :value="option.score">{{ option.text }}</wd-radio>
          </view>
        </wd-radio-group>
      </view>

      <!-- 底部按钮 -->
      <view class="bottom-btn">
        <!-- <view class="circle">
          <text class="arrow"></text>
        </view>
        <text>上一题</text> -->
        <wd-button @click="changeLast" v-if="curId != 1">上一题</wd-button>
        <wd-button @click="changeNext" v-if="curId != queLen">下一题</wd-button>
        <wd-button @click="submit" v-if="curId == queLen">提交</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getInquiryByPos, submitInquiry, InquiryResultArray } from '@/service/ganyu/inquiry'

import { useUserStore } from '@/store/user'
import { useToast, useNotify } from 'wot-design-uni'

defineOptions({
  name: 'tool',
})

const toast = useToast()

const position = ref('')
const userStore = useUserStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const systemInfo = uni.getSystemInfoSync()
const contentHeight = systemInfo.windowHeight - safeAreaInsets.top - 100

const queLen = ref()
const curId = ref(1)
const curPer = ref(0)
watch(curId, (newVal) => {
  console.log('newVal', newVal)
  curPer.value = parseInt(((newVal / queLen.value) * 100).toFixed(0))
})

onLoad(async (param) => {
  toast.loading({ message: '加载中' })
  position.value = param.position
  // interId.value = parseInt(param.interId)
  interId.value = 1
  console.log(position.value)
  console.log('请求getInquiryByPos')
  const res = await getInquiryByPos('pre')
  toast.close()
  questions.value = res.data
  questions.value.forEach((item) => {
    item.options = JSON.parse(item.options)
    if (item.groupIndex == curGroup.value) {
      pageQuestions.value.push(item)
    }
  })
  console.log(questions.value)
  queLen.value = questions.value.length
  curPer.value = parseInt(((curId.value / queLen.value) * 100).toFixed(0))
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
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
const interId = ref()

const changeNext = () => {
  curId.value++
}

const changeLast = () => {
  curId.value = curId.value - 1
  console.log(curId.value)
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
      // userId: userStore.userInfo.userId,
      inquiryId: parseInt(inquiryId),
      interId: interId.value,
      score: parseInt(score),
    })
  }

  if (formData.value.length < queLen.value) {
    toast.error('请完成所有题目')
    // toast.
    return
  }
  console.log(formData.value)
  const res = await submitInquiry(formData.value)
  console.log(res)

  if (res.code === 200) {
    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        uni.switchTab({ url: '/pages/home/home' })
      },
    })
  }
  // 根据positon设置不同的跳转逻辑
}
</script>

<style>
.con {
  /* background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6); */
}

.main-title-color {
  color: #d14328;
}

.back {
  margin-right: 10px;
  font-size: 24px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.progress-bar {
  height: 10px;
  margin-bottom: 5px;
  overflow: hidden;
  background-color: #e0e0e0;
  border-radius: 5px;
}

.progress {
  height: 100%;
  background-color: #007aff;
}

.progress-text {
  margin-bottom: 20px;
  font-size: 14px;
  color: #888;
  text-align: right;
}

.question {
  margin-bottom: 20px;
  font-size: 16px;
}

.options {
  margin-bottom: 30px;
}

.option {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
}

.bottom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border: 2px solid #000;
  border-radius: 50%;
}

.arrow {
  font-size: 20px;
}
</style>
