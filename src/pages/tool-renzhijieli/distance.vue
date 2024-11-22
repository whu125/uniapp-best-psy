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
      left-text="返回"
      safeAreaInsetTop
      title="认知解离"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/renzhijieli/distance.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area">
        <view style="text-align: center">
          <audio-player :audioObject="audioObject" ref="audioRef"></audio-player>
        </view>
      </view>
      <view @click="doStart" class="operation-area">
        <img src="http://115.159.83.61:9000/common/back.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">我完成啦</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import audioPlayer, { IAudio } from '../journey_common/audioPlayer.vue'

const audioObject = ref<IAudio>({
  audioSrc: 'http://115.159.83.61:9000/tool/renzhijieli/distance.MP3',
  audioTitle: '与想法拉开距离',
})

const audioRef = ref(null)

onUnload(() => {
  audioRef.value.audioDestroy()
})

const doStart = () => {
  uni.navigateBack()
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
  background: linear-gradient(
    180deg,
    rgba(255, 221, 225, 0.67) 0%,
    rgba(241, 221, 212, 0.3) 60%,
    rgba(255, 252, 219, 0.67) 100%
  );
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

.font {
  margin-top: 8px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: auto;
}

.input-area {
  width: 100%;
  height: auto;
}
</style>
