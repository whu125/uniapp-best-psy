<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '心情日记',
  },
  needLogin: true,
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="心情日记" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view>
      <wd-img
        :width="200"
        :height="200"
        src="http://115.159.83.61:9000/mindease/dcce124f-af8d-4a69-8051-3445485c63fb_tool_logo.png"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'tool',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const handleClickLeft = () => {
  uni.navigateBack()
}
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
