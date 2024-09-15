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
      title="第二站 : 导览"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <view class="main-container">
      <view style="height: 15%"></view>
      <view style="width: 100%; height: 15%; margin-left: 15px">
        <image src="http://115.159.83.61:9000/journey2/daolan5.png" mode="aspectFit" />
      </view>
      <view class="card">
        <view style="font-size: 25px; font-weight: bold; text-align: center">情绪生成指南</view>
        <view style="width: 90%; height: auto; margin-top: 20px">
          <image
            src="http://115.159.83.61:9000/journey2/daolan3.png"
            mode="widthFix"
            @click="toFirstStep"
          />
        </view>
        <view style="width: 90%; height: auto; margin-top: 20px">
          <image
            src="http://115.159.83.61:9000/journey2/daolan4.png"
            mode="widthFix"
            @click="toSecondStep"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { IInterPage, useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { useToast } from 'wot-design-uni'

const interStore = useInterStore()
const globalPageControlStore = useGlobalPageControlStore()
const toast = useToast()

onShow((options) => {})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const toFirstStep = async () => {
  if (globalPageControlStore.globalPageControlInfo.firstStepPage6_2 === false) {
    globalPageControlStore.globalPageControlInfo.firstStepPage6_2 = true
  }
  await interStore.setPageIndex(7)
  uni.navigateTo({
    url: '/pages/journey_common/common',
  })
}

const toSecondStep = async () => {
  if (globalPageControlStore.globalPageControlInfo.firstStepPage6_2 === true) {
    await interStore.setPageIndex(8)
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
  } else {
    toast.warning('请先查看第一步')
  }
}
</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 10px 0 10px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: auto;
  padding: 16px 15px 30px 15px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px gray;
}
</style>
