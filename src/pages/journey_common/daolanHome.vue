<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的旅程',
  },
}
</route>
<template>
  <view w-full h-full v-if="currContent">
    <view class="main-container">
      <wd-navbar
        fixed
        safeAreaInsetTop
        :title="currContent.navbarTitle"
        left-arrow
        @click-left="ToHome"
      ></wd-navbar>

      <view style="width: 100%; height: 20%">
        <image :src="currContent.logoUrl" mode="aspectFit" style="width: 90%" />
      </view>

      <view class="start-inter">
        <view class="title">1.站点导览</view>
        <view class="text" style="margin-top: 15px">从想法开始, 了解你的情绪,</view>
        <view class="text" style="margin-bottom: 15px">还有你自己。</view>
        <view>
          <wd-button type="info" @click="startJourney()">开始旅程</wd-button>
        </view>
      </view>
      <view class="sub-container">
        <view class="inter-task" @click="toTask()">
          <view class="title">2.站点任务</view>
          <view class="icon">
            <wd-icon name="list" color="#ffffff" size="24px" />
          </view>
        </view>
        <view class="inter-next" @click="toPunch()">
          <view class="title">3.站点打卡</view>
          <view class="icon">
            <wd-icon name="add-circle" color="#ffffff" size="24px" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useInterStore } from '@/store/inter'

const interStore = useInterStore()
const interId = ref<number>()
const currContent = ref<IContentType>()

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
onShow(() => {
  // interId.value = interStore.interInfo.interId - 1
  interId.value = 1
  currContent.value = contentList[interId.value]
})

type IContentType = {
  navbarTitle: string
  logoUrl: string
}

const contentList = [
  {
    navbarTitle: '第一站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey1/journeyHome1.png',
  },
  {
    navbarTitle: '第二站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey2/journeyHome2.png',
  },
  {
    navbarTitle: '第三站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey3/journeyHome3.png',
  },
]

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const startJourney = async () => {
  const res = await interStore.addPageIndex()
  if (res === 'pageEnd') {
    return
  }
  if (currContent.value.navbarTitle === '第二站: 导览') {
    uni.navigateTo({
      url: '/pages/journey_common/common',
    })
  }
}
const toTask = () => {}
const toPunch = () => {}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.main-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0 10px 0 10px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.sub-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-top: 20px;
}

.start-inter {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 20px;
  background-image: url('http://115.159.83.61:9000/common/daolanHomeBg3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
}

.inter-task {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: auto;
  background-image: url('http://115.159.83.61:9000/common/daolanHomeBg1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
}

.inter-next {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: auto;
  background-image: url('http://115.159.83.61:9000/common/daolanHomeBg2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
}

.title {
  margin-top: 15px;
  font-size: 22px;
  color: white;
}

.text {
  font-size: 18px;
  color: white;
}

.icon {
  width: auto;
  height: auto;
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
