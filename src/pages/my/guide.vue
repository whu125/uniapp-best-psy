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
    <wd-navbar fixed safeAreaInsetTop title="新手导引" left-arrow @click-left="goBack"></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/home/guideIcon/guideHead.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="card" v-for="(guide, index) in guideSteps" :key="index" @click="toGuide(index)">
        <img class="card-icon" :src="guide.icon" />
        <view class="card-text">{{ guide.text }}</view>
        <img
          style="width: 60rpx; height: 60rpx"
          mode="aspectFit"
          src="http://115.159.83.61:9000/home/guideIcon/enter.png"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { IMyPage, useInterStore } from '@/store/inter'

const guideSteps = ref([
  {
    icon: 'http://115.159.83.61:9000/home/guideIcon/guideIcon1.png',
    text: '干预过程是什么样的?',
  },
  {
    icon: 'http://115.159.83.61:9000/home/guideIcon/guideIcon2.png',
    text: '我需要做什么?',
  },
  {
    icon: 'http://115.159.83.61:9000/home/guideIcon/guideIcon3.png',
    text: '这些彩蛋等待你发现',
  },
  {
    icon: 'http://115.159.83.61:9000/home/guideIcon/guideIcon4.png',
    text: '如何最大化干预效果?',
  },
  {
    icon: 'http://115.159.83.61:9000/home/guideIcon/guideIcon5.png',
    text: '常见问题答疑',
  },
])

const pageContentList = ref<IMyPage[]>([
  {
    navbarTitle: '新手指南',
    imgUrl: 'http://115.159.83.61:9000/home/2mine-2(1).png',
  },
  {
    navbarTitle: '新手指南',
    imgUrl: 'http://115.159.83.61:9000/home/2mine-2(2).png',
  },
  {
    navbarTitle: '新手指南',
    imgUrl: 'http://115.159.83.61:9000/home/2mine-2(3).png',
  },
  {
    navbarTitle: '新手指南',
    imgUrl: 'http://115.159.83.61:9000/home/2mine-2(4).png',
  },
  {
    navbarTitle: '新手指南',
    imgUrl: 'http://115.159.83.61:9000/home/2mine-2(5).png',
  },
])

const toGuide = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(pageContentList.value[index]))
  uni.navigateTo({
    url: `/pages/my/common?detail=${detailObject}`,
  })
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img-common {
  width: 100%;
  height: auto;
}

.card {
  display: flex;
  align-items: center;
  height: auto;
  padding: 15px;
  border-radius: 15px;
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
</style>
