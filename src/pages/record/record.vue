<route lang="json5">
{
  style: {
    navigationBarTitleText: '旅程记录',
  },
  needLogin: true,
}
</route>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="text-center text-3xl mt-8">
      鸽友们好，我是我是
      <text class="text-red-50">菲鸽</text>
      <wd-button type="success" @click="testLogin">成功按钮</wd-button>
    </view>

    <!-- <RequestComp />
    <UploadComp /> -->
  </view>
</template>

<script lang="ts" setup>
// import RequestComp from './components/request.vue'
// import UploadComp from './components/upload.vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const testLogin = () => {
  uni.navigateTo({ url: '/pages/test2/test2' })
}
</script>

<style lang="scss" scoped>
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
</style>
