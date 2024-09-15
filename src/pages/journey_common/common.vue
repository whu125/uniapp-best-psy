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
      <view style="height: 10%"></view>
      <view class="middle-img-common">
        <image :src="pageContent.imgUrl" mode="aspectFit" style="width: 100%" />
      </view>

      <view @click="doOperation" class="operation-area">
        <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          {{ pageContent.operationText }}
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
        <view v-for="(placeholder, index) in pageContent.inputPlaceholders" :key="index">
          <view>
            {{ pageContent.inputQuestions[index] }}
          </view>
          <view style="margin-top: 15px">
            <wd-input type="text" v-model="value1" :placeholder="placeholder" />
          </view>
        </view>
      </view>
      <view @click="doOperation" class="operation-area">
        <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          {{ pageContent.operationText }}
        </view>
      </view>
    </view>

    <!-- 按钮选择页面 -->
    <view class="main-container" v-if="pageType === 'button'">
      <view style="height: 10%"></view>
      <view class="middle-img-button">
        <image :src="pageContent.imgUrl" mode="aspectFit" style="width: 100%; margin: 0 auto" />
      </view>
      <view class="button-area">
        <view v-for="(buttonUrl, index) in pageContent.buttonUrls" :key="index">
          <view style="width: 90%; height: auto; margin: 15px 0 0 15px">
            <image :src="buttonUrl" mode="widthFix" @click="toPage(buttonUrl)" />
          </view>
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
          imageMode="aspectFit"
          @click="handleSlideClick"
          @change="onSlideChange"
        ></wd-swiper>
      </view>
      <view @click="doOperation" class="operation-area">
        <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          {{ pageContent.operationText }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { IInterPage, useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { useToast } from 'wot-design-uni'
const interStore = useInterStore()
const globalPageControlStore = useGlobalPageControlStore()
const toast = useToast()

const pageType = ref<string>('normal')
const pageContent = ref<IInterPage>()
const currentSlideImage = ref<number>(0)
const value1 = ref<string>()

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

const toPage = (buttonUrl: string) => {
  if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan3.png') {
    interStore.setPageIndex(7)
    globalPageControlStore.globalPageControlInfo.isFirstStepFinished = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan4.png') {
    if (globalPageControlStore.globalPageControlInfo.isFirstStepFinished === false) {
      toast.warning('请先查看第一步')
    } else {
      interStore.setPageIndex(8)
    }
  }
  uni.redirectTo({
    url: '/pages/journey_common/common',
  })
}

const doOperation = async () => {
  if (pageContent.value.operationIcon.endsWith('back.png')) {
    await interStore.minusPageIndex()
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
    return
  }

  const res = await interStore.addPageIndex()
  console.log(interStore.pageIndex)
  if (res === 'pageEnd') {
    return
  }

  if (pageContent.value.specialPage === null) {
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
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: 40%;
  padding: 10px;
}

.middle-img-button {
  box-sizing: border-box;
  width: 100%;
  height: 30%;
  padding: 10px;
}

.input-area {
  width: 100%;
  height: 30%;
  overflow-y: scroll;
}

.button-area {
  width: 100%;
  height: 55%;
  overflow-y: scroll;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
}
</style>
