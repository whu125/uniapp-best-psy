<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '工具箱',
  },
  needLogin: true,
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 100 + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="工具箱" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view class="main-container">
      <view>
        <wd-img
          :width="200"
          :height="200"
          src="http://115.159.83.61:9000/mindease/dcce124f-af8d-4a69-8051-3445485c63fb_tool_logo.png"
        />
      </view>

      <wd-grid border :column="2">
        <wd-grid-item icon="heart" text="社会支持" />
        <wd-grid-item icon="clock" text="睡眠放松" />
        <wd-grid-item icon="eye-close" text="正念冥想" />
        <wd-grid-item icon="chart-bubble" text="呼吸训练" />
        <wd-grid-item @click="toMoodDiary" icon="chat" text="心情日记" />
        <wd-grid-item icon="a-precisemonitor" text="认知解离" />
      </wd-grid>
    </view>
  </view>

  <!-- <view class="text-center text-lg main-title-color">
    这是zwh写的视频测试

    <player-component id="tvp-id" playerid="tvp" vid="t3560gug9kt"></player-component>
    
  </view> -->
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'tool',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const toMoodDiary = () => {
  uni.navigateTo({
    url: '/pages/mood/mood',
  })
}

const handleClickLeft = () => {
  uni.navigateBack()
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
