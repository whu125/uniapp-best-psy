<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '干预测试',
  },
}
</route>
<template>
  <view v-if="true">
    <inquire></inquire>
  </view>
  <view v-if="false">
    <view
      class="bg-white overflow-hidden pt-2 px-4"
      :style="{ marginTop: safeAreaInsets?.top + 'px' }"
      w-full
      h-full
    >
      <wd-navbar title="干预" left-arrow @click-left="ToHome()"></wd-navbar>
      <view :style="{ height: contentHeight + 'px' }" style="overflow-y: scroll">
        <view>
          {{ questions.value[currQuestion - 1].content }}
        </view>
        <view style="display: flex; justify-content: center">
          <wd-img
            :width="200"
            :height="200"
            :src="questions.value[currQuestion - 1].url"
            :enable-preview="true"
          />
        </view>
      </view>

      <wd-radio-group
        v-model="currAnswer"
        shape="dot"
        @change="handleRadioChange"
        v-if="inter.questions[currQuestion - 1].questionType == 'select'"
      >
        <wd-radio v-for="(currOption, index) in currOptions" :key="index" :value="currOption">
          {{ currOption }}
        </wd-radio>
      </wd-radio-group>
      <wd-textarea
        v-model="currAnswer"
        placeholder="请填写想法"
        @confirm="handelInputChange"
        @blur="handelInputChange"
        v-if="inter.questions[currQuestion - 1].questionType == 'fill'"
        clearable
      />

      <wd-pagination
        v-model="currQuestion"
        :total-page="inter.questions.length"
        @change="handlePageChange"
        show-icon
      ></wd-pagination>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import inquire from './inquire.vue'

defineOptions({
  name: 'tool',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const systemInfo = uni.getSystemInfoSync()
const contentHeight = systemInfo.windowHeight - safeAreaInsets.top - 100
onLoad(() => {
  if (inter.value.questions[currQuestion.value - 1].questionType == 'select') {
    currOptions.value = inter.value.questions[currQuestion.value - 1].options.split(';')
  }
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
  submit()
}
const currQuestion = ref<number>(1)
const currAnswer = ref<string>()
const currOptions = ref([])
const answers = ref(new Map())

const inter = ref({
  interId: 1,
  questions: [
    {
      questionId: 1,
      content: '你喜欢什么颜色',
      options: '红色;蓝色;绿色',
      url: 'http://115.159.83.61:9000/mindease/f0744620-034b-4e01-8afe-2301b74a6dc5_pixel.png',
      questionType: 'select',
    },
    {
      questionId: 2,
      content: '你喜欢什么水果',
      options: '苹果;香蕉;葡萄',
      url: '',
      questionType: 'select',
    },
    {
      questionId: 3,
      content: '描述你今天早上的的心情',
      options: '',
      url: '',
      questionType: 'fill',
    },
  ],
})

const handlePageChange = ({ value }) => {
  currQuestion.value = value
  console.log(currQuestion.value)
  currAnswer.value = ''
  if (inter.value.questions[currQuestion.value - 1].questionType == 'select') {
    currOptions.value = inter.value.questions[currQuestion.value - 1].options.split(';')
  } else {
    currOptions.value = []
  }
}

const handelInputChange = ({ value }) => {
  currAnswer.value = value
  answers.value.set(currQuestion.value - 1, currAnswer.value)
  console.log(answers.value)
}

const handleRadioChange = () => {
  answers.value.set(currQuestion.value - 1, currAnswer.value)
  console.log(answers.value)
}

const submit = () => {
  const answersString = Array.from(answers.value.values()).join(';')
  console.log(answersString)
}
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
