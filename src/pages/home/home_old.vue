<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '旧版-我的旅程',
  },
}
</route>
<template>
  <tabbar selected="0"></tabbar>
  <view class="" h-full w-full>
    <!-- <view class="header">
      <view class="title">我的旅程</view>
    </view> -->

    <wd-navbar fixed safeAreaInsetTop title="旧版-我的旅程"></wd-navbar>

    <view class="content px-4">
      <view style="height: 100rpx"></view>
      <view class="h-40 w-full">
        <image src="http://115.159.83.61:9000/home/home.png" mode="scaleToFill" />
      </view>

      <view class="card flex justify-center">
        <span class="font-800 text-2xl">正在完成</span>
        <span class="font-800 text-2xl ml-4">第 1 站</span>
      </view>
      <view class="card flex justify-center">
        <span class="font-800 text-xl">剩余 3 小时 10 分 解锁</span>
        <span class="font-800 text-xl ml-4">第 2 站</span>
      </view>
      <!-- <view class="card intro-card">
        <view class="card-icon">&#9654;</view>
        <view class="card-text">导入: 开启你的旅程</view>
      </view> -->
      <view class="card" v-for="(journey, index) in journeySteps" :key="index">
        <img class="card-icon" :src="journey.icon" />
        <view class="card-text">{{ journey.text }}</view>
        <image
          style="width: 60rpx; height: 60rpx"
          mode="aspectFit"
          src="../../static/images/home/startJourney.png"
          v-show="currProgress >= journey.progress"
          @click="enterJourney(journey.progress)"
        />
        <image
          style="width: 60rpx; height: 60rpx"
          src="../../static/images/home/lockJourney.png"
          mode="aspectFit"
          v-show="currProgress < journey.progress"
        />
      </view>
      <view style="height: 150rpx"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getUserInfo, User } from '@/service/index/user'
import tabbar from '@/pages/tabbar/tabbar.vue'
import { checkInterAvailability } from '@/service/index/inter'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { useMessage, useToast } from 'wot-design-uni'

defineOptions({
  name: 'Home',
})

// uni.hideTabBar()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()
const message = useMessage()
const toast = useToast()
const interStore = useInterStore()
const globalPageControl = useGlobalPageControlStore()

const currProgress = ref<number>(3)
// const currProgress = ref<number>(userStore.userInfo.currProgress)

const journeySteps = ref([
  { icon: '../../static/images/home/journey0.png', text: '导入：开启你的旅程', progress: 0 },
  { icon: '../../static/images/home/journey1.png', text: '第一站：认识你的情绪', progress: 1 },
  { icon: '../../static/images/home/journey2.png', text: '第二站：观察你的思维', progress: 2 },
  { icon: '../../static/images/home/journey3.png', text: '第三站：回到此时此刻', progress: 3 },
  { icon: '../../static/images/home/journey4.png', text: '第四站：面对你的痛苦', progress: 4 },
  { icon: '../../static/images/home/journey5.png', text: '第五站：接纳当下的你', progress: 5 },
  { icon: '../../static/images/home/journey6.png', text: '第六站：开始你的行动', progress: 6 },
  { icon: '../../static/images/home/journey7.png', text: '第七站：发现你的价值', progress: 7 },
])
// 测试 uni API 自动引入
onLoad(() => {})

const enterJourney = async (progress: number) => {
  const numberStr = progress.toString()
  interStore.clearInternfo()
  globalPageControl.clearInternfo()
  uni.navigateTo({
    url: '/pages/journey_common/start_journey?progress=' + encodeURIComponent(numberStr),
  })
}
</script>

<style>
.main-title-color {
  color: #d14328;
}
/* .bg_image {
  position: absolute;
  top:0;
  height: 200rpx;
} */

.header {
  position: fixed;
  top: 3.75rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.back-button {
  margin-right: 20px;
  font-size: 24px;
  color: #333;
  text-decoration: none;
}
.title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 15px;

  padding-top: 1.25rem;
  /* margin-top: 3rem; */
  overflow-y: scroll;
  background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6);
}
.card {
  display: flex;
  align-items: center;
  height: auto;
  padding: 15px;
  /* background-color: white; */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.card-text {
  flex: 1;
}
.intro-card {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
}
.intro-card .card-icon {
  color: #1890ff;
}
</style>
