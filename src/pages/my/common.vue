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
      :title="pageContent.navbarTitle"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>

    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { IMyPage, useInterStore } from '@/store/inter'

const pageContent = ref<IMyPage>({
  imgUrl: '',
  navbarTitle: '',
})

onLoad((options) => {
  pageContent.value = JSON.parse(decodeURIComponent(options.detail))
  console.log(pageContent.value)
})

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
</style>
