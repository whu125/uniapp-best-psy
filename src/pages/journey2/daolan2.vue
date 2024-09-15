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
      title="第二站 : 导览"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <view class="main-container">
      <view style="height: 10%"></view>
      <view class="middle-img">
        <image
          src="http://115.159.83.61:9000/journey2/daolan12.png"
          mode="aspectFit"
          style="width: 100%"
        />
      </view>
      <wd-swiper
        :list="swiperList"
        :autoplay="false"
        v-model:current="current"
        :indicator="{ showControls: true }"
        :loop="false"
        @click="handleClick"
        imageMode="aspectFit"
        @change="onChange"
      ></wd-swiper>
      <!-- <view @click="nextPage" class="bottom-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="font-size: 18px">下一页</view>
      </view> -->
    </view>
  </view>
</template>

<script lang="ts" setup>
onShow(() => {})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const current = ref<number>(0)

const swiperList = ref([
  'http://115.159.83.61:9000/journey2/daolan2.png',
  'http://115.159.83.61:9000/journey2/daolan10.png',
  'http://115.159.83.61:9000/journey2/daolan11.png',
  'http://115.159.83.61:9000/journey2/daolan9.png',
])

const handleClick = (e) => {
  console.log(e)
}
const onChange = (e) => {
  console.log(e)
}

const nextPage = () => {
  uni.redirectTo({
    url: '/pages/journey_common/common',
  })
}
</script>

<style>
.main-container {
  height: 100vh;
}

.middle-img {
  width: 100%;
  height: 40%;
  overflow-y: scroll;
}

.slide-area {
  height: 500px;
}

.bottom-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
}
</style>
