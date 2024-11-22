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
    <wd-navbar fixed safeAreaInsetTop title="接纳练习" left-arrow @click-left="goBack"></wd-navbar>

    <!-- 第一步 -->
    <view class="main-container" v-show="currIndex === 0">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/journey5/renwu3.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">开始接纳体验</view>
      </view>
    </view>

    <!-- 第二步 -->
    <view class="main-container" v-show="currIndex === 1">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey5/renwu4.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area">
        <view style="text-align: center">
          <audio-player :audioObject="audioObject" ref="audioRef"></audio-player>
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">我完成啦</view>
      </view>
    </view>

    <!-- 第三步 -->
    <view class="main-container" v-show="currIndex === 2">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image
          src="http://115.159.83.61:9000/tool/jienalianxi/jienalianxi1.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/back.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">回到首页</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import audioPlayer, { IAudio } from '../journey_common/audioPlayer.vue'

const audioObject = ref<IAudio>({
  audioSrc: 'http://115.159.83.61:9000/tool/jienalianxi/accept.MP3',
  audioTitle: '接纳练习',
})

const audioRef = ref(null)

onUnload(() => {
  audioRef.value.audioDestroy()
})

const currIndex = ref<number>(0)
const goBack = () => {
  uni.navigateBack()
}

const toNext = () => {
  if (currIndex.value === 2) {
    uni.navigateBack()
  } else {
    if (currIndex.value === 1) {
      audioRef.value.audioDestroy()
    }
    currIndex.value = currIndex.value + 1
  }
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(
    180deg,
    rgba(255, 221, 225, 0.67) 0%,
    rgba(241, 221, 212, 0.3) 60%,
    rgba(255, 252, 219, 0.67) 100%
  );
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: auto;
}

.title {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.input-area {
  width: 90%;
  height: auto;
  margin: 0 auto;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 15px 0 20px 0;
}
</style>
