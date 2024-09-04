<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view class="" :style="{ marginTop: safeAreaInsets?.top + 'px' }" w-full h-full>
    <wd-navbar title="第一站：导览" left-arrow @click-left="ToHome()"></wd-navbar>

    <view class="container">
      <view class="card">
        <image
          class="illustration"
          src="/static/images/thinking-illustration.png"
          mode="aspectFit"
        ></image>

        <view class="title">第二站: 观察你的思维</view>

        <view class="questions">
          <view class="question">• 情绪反应的起点是什么?</view>
          <view class="question">• 思维的 "默认选项" 如何影响生活?</view>
          <view class="question">• 消极思维挥之不去,怎么办?</view>
        </view>

        <button class="start-button" @click="startJourney">开始旅程</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
const { safeAreaInsets } = uni.getSystemInfoSync()
const startJourney = () => {
  uni.navigateTo({
    url: '/pages/1/daoru/2',
  })
}
</script>

<style>
.container {
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
