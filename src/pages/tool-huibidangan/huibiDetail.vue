<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view w-full h-full>
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="正念练习：旅行手记"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="box">
        <view class="text-area">
          <view>1.首先，为这种应对方式取个名字</view>
          <view>{{ content.huibiName }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view>2.引发情绪的情境或事件：</view>
          <view>{{ content.qingjing }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view>3.产生了什么感受：</view>
          <view>{{ content.ganshou }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view>4.为了对抗这种感觉，你做了什么尝试?</view>
          <view>{{ content.changshi }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view>5.这种尝试给你带来了什么长期影响?</view>
          <view>{{ content.yingxiang }}</view>
        </view>
      </view>
      <view class="box">
        <view class="text-area">
          <view>6.下一次，你希望自己怎么做?</view>
          <view>{{ content.zenme }}</view>
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { IHuibidanganReturn } from '@/service/index/huibidangan'

const content = ref<IHuibidanganReturn>({
  huibiId: '',
  userId: '',
  date: '',
  huibiName: '',
  qingjing: '',
  ganshou: '',
  changshi: '',
  yingxiang: '',
  zenme: '',
  recordId: -1,
})
onLoad((options) => {
  content.value = JSON.parse(decodeURIComponent(options.detail))
  console.log(content.value)
})

const goBack = () => {
  uni.navigateBack()
}
</script>

<style>
.main-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.box {
  box-sizing: content-box;
  width: 85%;
  height: auto;
  padding: 12px;
  margin: 15px auto;
  border-radius: 10px;
}
</style>
