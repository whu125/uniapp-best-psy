<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view class="" w-full h-full>
    <wd-navbar
      fixed
      safeAreaInsetTop
      :title="navbarTitle"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <view class="main-container" v-if="currContent">
      <view class="card">
        <image class="illustration" :src="imageMap.get(progress)" mode="aspectFit"></image>
        <view class="title">{{ currContent.title }}</view>

        <view class="questions" v-for="(question, index) in currContent.questions" :key="index">
          <view class="question">{{ question }}</view>
        </view>

        <button class="start-button" @click="startJourney">开始旅程</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { startInter, IStartInter } from '@/service/index/inter'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useInterStore } from '@/store/inter'
import { useMessage, useToast } from 'wot-design-uni'

const userStore = useUserStore()
const interStore = useInterStore()
const progress = ref<number>()
const toast = useToast()

// onMounted(() => {
//   currContent.value = pageContent.value[progress.value]
// })

onLoad((options) => {
  const numberStr = options.progress
  progress.value = Number(decodeURIComponent(numberStr))

  currContent.value = pageContent.value[progress.value]

  console.log('currContent', currContent.value)
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
const navbarTitle = ref<string>('我的旅程: 第二站')
const { safeAreaInsets } = uni.getSystemInfoSync()
const imageMap = new Map([
  [0, 'http://115.159.83.61:9000/journey2/start_journey_logo2.png'],
  [1, 'http://115.159.83.61:9000/journey2/start_journey_logo2.png'],
  [2, 'http://115.159.83.61:9000/journey2/start_journey_logo2.png'],
  [3, 'http://115.159.83.61:9000/journey2/start_journey_logo2.png'],
])
const currContent = ref()

const pageContent = ref([
  {
    title: '第零站: 观察你的思维',
    questions: [
      '• 情绪反应的起点是什么?',
      '• 思维的 "默认选项" 如何影响生活?',
      '• 消极思维挥之不去,怎么办?',
    ],
  },
  {
    title: '第一站: 观察你的思维',
    questions: [
      '• 情绪反应的起点是什么?',
      '• 思维的 "默认选项" 如何影响生活?',
      '• 消极思维挥之不去,怎么办?',
    ],
  },
  {
    title: '第二站: 观察你的思维',
    questions: [
      '• 情绪反应的起点是什么?',
      '• 思维的 "默认选项" 如何影响生活?',
      '• 消极思维挥之不去,怎么办?',
    ],
  },
  {
    title: '第三站: 观察你的思维',
    questions: [
      '• 情绪反应的起点是什么?',
      '• 思维的 "默认选项" 如何影响生活?',
      '• 消极思维挥之不去,怎么办?',
    ],
  },
])
const startJourney = async () => {
  const startObj: IStartInter = {
    userId: userStore.userInfo.userId,
    interId: progress.value,
    startTime: getFormattedDate(),
  }
  toast.loading('马上开始...')
  const res = await startInter(startObj)
  console.log(res)
  toast.close()
  if (res.code === 200) {
    interStore.setInterInfo(res.data)
    uni.navigateTo({
      url: '/pages/journey_common/common',
    })
  } else {
    toast.error('出现了一些问题')
  }
}
</script>

<style>
.main-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.card {
  width: 90%;
  max-width: 400px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.illustration {
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.questions {
  margin-bottom: 30px;
}

.question {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #666;
}

.start-button {
  padding: 12px 20px;
  font-size: 18px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 25px;
}
</style>
