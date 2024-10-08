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

        <!-- <button class="start-button" @click="startJourney">开始旅程</button> -->
        <view class="flex justify-center">
          <wd-button type="success" size="large" @click="startJourney">开始旅程</wd-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { startInter, IStartInter } from '@/service/index/inter'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { useMessage, useToast } from 'wot-design-uni'

const userStore = useUserStore()
const globalPageControl = useGlobalPageControlStore()
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
  console.log('progress.value', progress.value)
  navbarTitle.value = stationMap.get(progress.value)
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
const stationMap = new Map([
  [0, '我的旅程: 导入'],
  [1, '我的旅程: 第一站'],
  [2, '我的旅程: 第二站'],
  [3, '我的旅程: 第三站'],
  [4, '我的旅程: 第四站'],
  [5, '我的旅程: 第五站'],
  [6, '我的旅程: 第六站'],
  [7, '我的旅程: 第七站'],
])

const navbarTitle = ref<string>('')

const { safeAreaInsets } = uni.getSystemInfoSync()
const imageMap = new Map([
  [0, 'http://115.159.83.61:9000/journey0/start_journey_logo0.png'],
  [1, 'http://115.159.83.61:9000/journey1/start_journey_logo1.png'],
  [2, 'http://115.159.83.61:9000/journey2/start_journey_logo2.png'],
  [3, 'http://115.159.83.61:9000/journey3/start_journey_logo3.png'],
  [4, 'http://115.159.83.61:9000/journey4/start_journey_logo4.png'],
  [5, 'http://115.159.83.61:9000/journey5/start_journey_logo5.png'],
  [6, 'http://115.159.83.61:9000/journey6/start_journey_logo6.png'],
  [7, 'http://115.159.83.61:9000/journey7/start_journey_logo7.png'],
])
const currContent = ref()

const pageContent = ref([
  {
    title: '导入: ',
    questions: [],
  },
  {
    title: '第一站: ',
    questions: [],
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
    title: '第三站: 回到此时此刻',
    questions: ['• 什么是回避?', '• 回避将带给我们怎样的影响?', '• 除了回避，我们还能做点什么?'],
  },
  {
    title: '第四站: 放下控制的绳子',
    questions: [
      '• 什么回避和控制不会起作用?',
      '• 除了与痛苦战斗，我们还能怎么做?',
      '• 以正念的方式应对痛苦是可行的吗?',
    ],
  },
  {
    title: '第五站: 接纳当下的你',
    questions: ['• 什么是接纳，接纳为何有帮助?', '• 如何做到接纳?', '• 接纳的背后：自我关怀'],
  },
  {
    title: '第六站: ',
    questions: [],
  },
  {
    title: '第七站: ',
    questions: [],
  },
])
const startJourney = async () => {
  const startObj: IStartInter = {
    userId: userStore.userInfo.userId,
    interId: progress.value,
    // interId: 2,
    startTime: getFormattedDate(),
  }
  toast.loading('马上开始...')
  const res = await startInter(startObj)
  console.log(res)
  toast.close()
  if (res.code === 200) {
    interStore.setInterInfo(res.data)
    uni.redirectTo({
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
  padding: 10px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.card {
  width: 90%;
  max-width: 400px;
  padding: 30px;
  /* background-color: #ffffff; */
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.illustration {
  display: block;
  width: 600rpx;
  height: 600rpx;
  margin: 0 auto;
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
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 25px;
}
</style>
