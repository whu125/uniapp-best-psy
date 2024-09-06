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
      :title="testData.navbarTitle"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="middle-img">
        <img :src="testData.imgUrl" style="width: 100%" />
      </view>
      <view class="operation-area">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 35px; height: 35px" />
        <view>写好啦, 提交!</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const progress = ref<number>()
onLoad((options) => {})

const testData = {
  pageId: 1,
  interId: 2,
  imgUrl: 'http://115.159.83.61:9000/journey2/daoru1.png',
  textContent: '',
  navbarTitle: '第二站 : 导览',
  operationIcon: 'http://115.159.83.61:9000/common/next.png',
  operationText: '下一页',
}
const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
const navbarTitle = ref<string>('')
</script>

<style>
.main-container {
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 10px 0 10px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img {
  width: 100%;
  height: 60%;
  overflow-y: scroll;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25%;
}
</style>
