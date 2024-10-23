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
        <image :src="currContent.logoUrl" mode="aspectFit" style="width: 100%" />
      </view>

      <view class="start-inter">
        <view class="title">1.站点导览</view>
        <view v-for="(item, index) in currContent.text" :key="index">
          <view class="text" style="margin-top: 10px">{{ item }}</view>
        </view>
        <view style="margin-top: 12px">
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
import { useToast } from 'wot-design-uni'

const interStore = useInterStore()
const toast = useToast()
const interId = ref<number>()
const currContent = ref<IContentType>()

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
onShow(() => {
  interId.value = interStore.interInfo.interId
  currContent.value = contentList[interId.value]
})

type IContentType = {
  navbarTitle: string
  logoUrl: string
  text: string[]
}

const contentList = [
  {
    navbarTitle: '',
    logoUrl: '',
    text: [],
  },
  {
    navbarTitle: '第一站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey1/journeyHome1.png',
    text: ['情绪是一切的起点,', '是我们的一部分'],
  },
  {
    navbarTitle: '第二站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey2/journeyHome2.png',
    text: ['从想法开始, 了解你的情绪,', '还有你自己。'],
  },
  {
    navbarTitle: '第三站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey3/journeyHome3.png',
    text: ['回到我们真正拥有的此时此刻,', '是获得内心平静的第一步'],
  },
  {
    navbarTitle: '第四站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey4/journeyHome4.png',
    text: ['放下控制的绳子,', '尝试用另一种方式与情绪和感受相处'],
  },
  {
    navbarTitle: '第五站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey5/journeyHome5.png',
    text: ['用接纳的态度,', '拥抱独一无二的你'],
  },
  {
    navbarTitle: '第六站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey6/journeyHome6.png',
    text: ['人生最重要的不是所在的位置, 而是你所', '朝的方向, 对你来说, 什么是最重要的?'],
  },
  {
    navbarTitle: '第七站: 导览',
    logoUrl: 'http://115.159.83.61:9000/journey7/journeyHome7.png',
    text: ['行动是生活的魔法'],
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
  interStore.isStartJourney = true
  uni.navigateTo({
    url: '/pages/journey_common/common',
  })
}
const toTask = async () => {
  if (interStore.isStartJourney !== true) {
    toast.warning('请先完成站点导览！')
    return
  }
  interStore.isTaskFinished = true
  if (interStore.interInfo.interId === 1) {
    await interStore.setPageIndex(13)
  } else if (interStore.interInfo.interId === 2) {
    await interStore.setPageIndex(23)
  } else if (interStore.interInfo.interId === 3) {
    await interStore.setPageIndex(26)
  } else if (interStore.interInfo.interId === 4) {
    await interStore.setPageIndex(36)
  } else if (interStore.interInfo.interId === 5) {
    await interStore.setPageIndex(17)
  } else if (interStore.interInfo.interId === 6) {
    await interStore.setPageIndex(17)
  } else if (interStore.interInfo.interId === 7) {
    await interStore.setPageIndex(13)
  }
  uni.navigateTo({
    url: '/pages/journey_common/common',
  })
}
const toPunch = () => {
  if (interStore.isTaskFinished !== true || interStore.isStartJourney !== true) {
    toast.warning('请先完成站点任务！')
    return
  }
  uni.navigateTo({
    url: '/pages/inquiry/start',
  })
}
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
