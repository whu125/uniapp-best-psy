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
      <view style="height: 10%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="aspectFit" style="width: 100%" />
      </view>
      <view class="input-area">
        <view v-for="(placeholder, index) in pageContent.inputPlaceholders" :key="index">
          <view style="margin-top: 15px">
            {{ pageContent.inputQuestions[index] }}
          </view>
          <view style="margin-top: 5px">
            <wd-input
              type="text"
              :placeholder="placeholder"
              v-model="userInputList[index]"
              @change="userInputChange({ index, userInput: userInputList[index] })"
            />
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
const userInputList = ref<Array<string>>([])

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

const userInputChange = (event) => {
  console.log(event)
}

const toPage = (buttonUrl: string) => {
  // botton 页面的跳转逻辑 根据按钮的图片名称判断需要跳转到哪个页面
  if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan3.png') {
    interStore.setPageIndex(7)
    globalPageControlStore.globalPageControlInfo.firstStepPage6_2 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan4.png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage6_2 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(8)
    }
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan15.png') {
    interStore.setPageIndex(16)
    globalPageControlStore.globalPageControlInfo.firstStepPage15_2 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/daolan16.png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage15_2 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(18)
    }
  }
  uni.redirectTo({
    url: '/pages/journey_common/common',
  })
}

const doOperation = async () => {
  // 如果用户点击的是返回按钮 需要判断当前是什么页面以跳转回原 button 页面
  if (pageContent.value.operationIcon.endsWith('back.png')) {
    if (pageContent.value.pageId === 7 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(6)
    } else if (pageContent.value.pageId === 17 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(15)
    }
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
    return
  }

  // 如果是 input 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'input') {
    let inputContent = ''
    for (let i = 0; i < userInputList.value.length; i++) {
      inputContent = inputContent + userInputList.value[i] + '%'
    }
    inputContent = inputContent.slice(0, -1) + '#'

    const inputPage = pageContent.value.pageId + '#'

    let inoutQuestion = ''
    for (let i = 0; i < pageContent.value.inputPlaceholders.length; i++) {
      inoutQuestion = inoutQuestion + pageContent.value.inputPlaceholders[i] + '%'
    }
    inoutQuestion = inoutQuestion.slice(0, -1) + '#'

    interStore.interInfo.userInputContent = interStore.interInfo.userInputContent + inputContent
    interStore.interInfo.userInputPages = interStore.interInfo.userInputContent + inputPage
    interStore.interInfo.userInputQuestions = interStore.interInfo.userInputContent + inoutQuestion

    console.log(inputContent)
    console.log(inoutQuestion)
  }

  // pageIndex 自增
  const res = await interStore.addPageIndex()
  console.log(interStore.pageIndex)
  // 如果是最后一页就不再进行跳转
  if (res === 'pageEnd') {
    return
  }

  // 如果下一页不是跳转到特殊页面(journey通用页面) 就刷新当前页面
  if (pageContent.value.specialPage === null) {
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
  } else {
    // 否则跳转到特殊页面
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
  height: 30%;
  padding: 10px;
}

.middle-img-button {
  box-sizing: border-box;
  width: 100%;
  height: 40%;
  padding: 10px;
}

.input-area {
  width: 100%;
  height: 35%;
  overflow-y: scroll;
}

.button-area {
  width: 100%;
  height: 50%;
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
