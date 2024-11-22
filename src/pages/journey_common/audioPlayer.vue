<template>
  <view class="audio_center">
    <view class="play-btn">
      <view @click="clickAudio">
        <view v-show="audioStatus === false">
          <wd-icon name="play-circle" size="40px"></wd-icon>
        </view>
        <view v-show="audioStatus === true">
          <wd-icon name="pause-circle" size="40px"></wd-icon>
        </view>
      </view>
    </view>

    <view class="audio_center_right">
      <view class="single">
        <view class="single_title">
          <view class="single_title_info" :style="{ color: audioTitleColor }">
            {{ props.audioObject.audioTitle }}
          </view>
          <view class="tips">{{ timeTxt }}</view>
        </view>
        <slider
          :backgroundColor="backgroundColor"
          :activeColor="activeColor"
          @change="sliderChange"
          :value="sliderIndex"
          block-size="12"
          :min="0"
          :max="audioDuration"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
let timer
const audioStatus = ref<boolean>(false)

const timeTxt = ref<string>('00 : 00')
const sliderIndex = ref<number>(0)
const audioDuration = ref<number>(0)
const audioTitleColor = ref<string>('#333')
const activeColor = ref<string>('#00994c')
const backgroundColor = ref<string>('#c0c0c0')

const props = defineProps({
  audioObject: Object,
})

export interface IAudio {
  audioSrc: string
  audioTitle: string
}
// const audioObject = ref<IAudio>({
//   audioSrc: 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3',
//   audioTitle: 'title',
// })

const innerAudioContext: UniNamespace.InnerAudioContext = uni.createInnerAudioContext()

onMounted(() => {
  console.log('---audioplayer---')
  console.log(props.audioObject)
  innerAudioContext.src = props.audioObject.audioSrc
  innerAudioContext.loop = false
  innerAudioContext.onPlay(() => {
    console.log('audio play')
    audioDuration.value = innerAudioContext.duration
  })
  innerAudioContext.onPause(() => {
    console.log('audio pause')
  })
  innerAudioContext.onEnded(() => {
    console.log('audio end')
    sliderIndex.value = 0
    audioStatus.value = false
    timeTxt.value = '00 : 00'
    innerAudioContext.stop()
  })
  innerAudioContext.onTimeUpdate(() => {
    // 计算剩余时间
    const duration = innerAudioContext.duration // 音频总时长
    const currentTime = innerAudioContext.currentTime // 当前播放时间
    // const remainingTime = duration - currentTime // 剩余时间
    // 这里可以更新倒计时显示
    timeTxt.value = getTimeStr(currentTime) + ' / ' + getTimeStr(duration)
  })
})

onHide(() => {
  audioDestroy()
})

const getTimeStr = (time: number) => {
  // 计算分钟数
  const minutes = Math.floor(time / 60)
  // 计算剩余的秒数
  const seconds = Math.floor(time % 60)
  // 格式化输出，确保秒数始终是两位数
  const secondsStr = seconds < 10 ? '0' + seconds : seconds
  const minutesStr = minutes.toString()
  return `${minutesStr} : ${secondsStr}`
}

const audioDestroy = () => {
  if (innerAudioContext) {
    innerAudioContext.destroy()
    audioStatus.value = false
  }
}

const clickAudio = () => {
  if (audioStatus.value && !innerAudioContext.paused) {
    innerAudioContext.pause()
    clearInterval(timer)
  } else {
    innerAudioContext.play()
  }
  audioStatus.value = !audioStatus.value
}

const sliderChange = (e) => {
  innerAudioContext.seek(e.detail.value)
  sliderIndex.value = e.detail.value
}

defineExpose({
  audioDestroy,
})
</script>

<style lang="scss" scoped>
.audio_center {
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 10rpx;
  box-shadow: 0 0 10rpx #c3c3c3;

  .play-btn {
    width: 15%;
    height: auto;
  }

  .audio_center_right {
    width: 85%;
    height: auto;
  }

  .single_title {
    display: flex;
    justify-content: space-between;
    width: 85%;
    margin: 0 auto;
  }

  .single_title_info {
    margin-left: 5px;
  }

  .single {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 16rpx 24rpx 10rpx 0;

    .tips {
      flex-shrink: 0;
      font-size: 22rpx;
      color: #919191;
    }

    &_title {
      &_info {
        display: -webkit-box;
        margin-right: 20rpx;
        overflow: hidden;
        font-size: 28rpx;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }
  }

  &_cover {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: stretch;
    width: 127rpx;

    margin-right: 30rpx;
    background: #f5f5f5;

    img {
      width: 127rpx;
      height: 100%;
      border-radius: 10rpx 0 0 10rpx;
    }
  }
}
</style>
