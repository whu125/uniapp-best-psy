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
    <!-- <wd-loading type="outline" /> -->
    <view :style="{ height: contentHeight + 'px' }" style="overflow-y: scroll">
      <view class="mb-5 mt-2">
        <view v-for="(question, index) in pageQuestions" :key="question.id" class="mb-5">
          <!-- 显示题目标题 -->
          <h3>{{ index + 1 }}. {{ question.question }}</h3>

          <!-- 生成对应的单选框组 -->
          <wd-radio-group v-model="answers[question.inquiryId]" shape="button">
            <wd-radio v-for="option in question.options" :key="option.score" :value="option.score">
              {{ option.text }}
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
    </view>

    <!-- <wd-pagination
      v-model="currQuestion"
      :total-page="inter.questions.length"
      @change="handlePageChange"
      show-icon
    ></wd-pagination> -->
  </view>
  <view class="absolute bottom-10 w-full">
    <view class="flex justify-between">
      <view>
        <wd-button @click="changeLast()" v-show="curGroup - 1 > 0">上一页</wd-button>
      </view>

      <view>
        <wd-button @click="changeNext()" v-if="!islastFlag">下一页</wd-button>
        <wd-button @click="changeNext()" v-if="islastFlag">提交</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getInquiryByPos } from '@/service/ganyu/inquiry'

defineOptions({
  name: 'tool',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const systemInfo = uni.getSystemInfoSync()
const contentHeight = systemInfo.windowHeight - safeAreaInsets.top - 100
onLoad(async () => {
  console.log('请求getInquiryByPos')
  const res = await getInquiryByPos('2-pre')
  console.log(res)
  questions.value = res.data
  questions.value.forEach((item) => {
    item.options = JSON.parse(item.options)
    console.log(item)
    if (item.groupIndex == curGroup.value) {
      pageQuestions.value.push(item)
    }
  })
  console.log(questions.value)
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
}

const changeLast = () => {
  curGroup.value--
  pageQuestions.value = []
  questions.value.forEach((item) => {
    if (item.groupIndex == curGroup.value) {
      pageQuestions.value.push(item)
    }
  })
}

const submit = () => {
  // const answersString = Array.from(answers.value.values()).join(';')
  // console.log(answersString)
  console.log(answers.value)
}
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
