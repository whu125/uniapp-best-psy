<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view class="" w-full h-full v-if="pageContent">
    <wd-navbar
      fixed
      safeAreaInsetTop
      :title="pageContent.navbarTitle"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <!-- 普通页面 -->
    <view class="main-container" v-if="pageType === 'normal'">
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image :src="pageContent.imgUrl" mode="aspectFit" style="width: 100%" />
      </view>
      <view class="operation-area">
        <view @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px">{{ pageContent.operationText }}</view>
        </view>
      </view>
    </view>

    <!-- 输入页面 -->
    <view class="main-container" v-if="pageType === 'input'">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="aspectFit" style="width: 100%" />
      </view>
      <view class="input-area">
        <view
          style="margin-top: 15px"
          v-for="(placeholder, index) in pageContent.inputPlaceholders"
          :key="index"
        >
          <view>{{ pageContent.inputQuestions[index] }}</view>
          <wd-input type="text" :placeholder="placeholder" />
        </view>
      </view>
      <view class="operation-area">
        <view @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px">{{ pageContent.operationText }}</view>
        </view>
      </view>
    </view>

    <!-- 轮播图页面 -->
    <view class="main-container" v-if="pageType === 'slide'">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="aspectFit" style="width: 100%" />
      </view>
      <view class="input-area">
        <wd-swiper
          :list="pageContent.slideImages"
          :autoplay="false"
          v-model:current="currentSlideImage"
          :indicator="{ showControls: true }"
          :loop="false"
          @click="handleSlideClick"
          @change="onSlideChange"
        ></wd-swiper>
      </view>
      <view class="operation-area">
        <view @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="width: 100%; font-size: 18px">{{ pageContent.operationText }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { IInterPage, useInterStore } from '@/store/inter'
const interStore = useInterStore()

const pageType = ref<string>('normal')
const pageContent = ref<IInterPage>()
const currentSlideImage = ref<number>(0)

onShow(() => {
  const index = interStore.pageIndex
  pageContent.value = interStore.interInfo.interPages[index]
  pageType.value = pageContent.value.pageType
  console.log('pageContent.value', pageContent.value)
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const handleSlideClick = (e) => {
  console.log(e)
}
const onSlideChange = (e) => {
  console.log(e)
}

const doOperation = async () => {
  console.log(123)
  if (pageContent.value.operationIcon.endsWith('back.png')) {
    uni.navigateBack()
  }

  const res = await interStore.addPageIndex()
  console.log(interStore.pageIndex)
  if (res === 'pageEnd') {
    return
  }

  if (pageContent.value.specialPage === 'none') {
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
  } else {
    const specialPage = pageContent.value.specialPage
    uni.redirectTo({
      url: specialPage,
    })
  }
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img-common {
  width: 100%;
  height: 60%;
  overflow-y: scroll;
}

.middle-img-input {
  width: 100%;
  height: 30%;
  overflow-y: scroll;
}

.input-area {
  width: 100%;
  height: 30%;
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
