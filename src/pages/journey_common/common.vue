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
    <!-- <wd-navbar fixed safeAreaInsetTop :title="pageContent.navbarTitle"></wd-navbar> -->

    <wd-navbar
      fixed
      safeAreaInsetTop
      :title="pageContent.navbarTitle"
      left-text="退出"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <!-- 普通页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'normal'"
    >
      <view style="height: 15%"></view>
      <view class="middle-img-common">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" />
      </view>

      <view @click="doOperation" class="operation-area">
        <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          {{ pageContent.operationText }}
        </view>
      </view>
    </view>

    <!-- 输入页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'input'"
    >
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" />
      </view>
      <view class="input-area px-2">
        <view v-for="(placeholder, index) in pageContent.inputPlaceholders" :key="index">
          <view style="margin-top: 15px" v-if="pageContent.inputQuestions != null">
            {{ pageContent.inputQuestions[index] }}
          </view>
          <view style="margin-top: 5px">
            <wd-textarea v-model="userInputList[index]" :placeholder="placeholder" />
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
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'button'"
    >
      <view style="height: 15%"></view>
      <view class="middle-img-button">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%; margin: 0 auto" />
      </view>
      <view class="button-area">
        <view v-for="(buttonUrl, index) in pageContent.buttonUrls" :key="index" class="mb-4">
          <view style="width: 80%; height: auto; margin: 0 auto">
            <image
              :src="buttonUrl"
              mode="widthFix"
              @click="toPage(buttonUrl)"
              style="width: 100%"
            />
          </view>
        </view>
      </view>
      <view v-if="hasOperation" @click="doOperation" class="operation-area">
        <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          {{ pageContent.operationText }}
        </view>
      </view>
    </view>

    <!-- 单选页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'radio'"
    >
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" />
      </view>
      <view class="input-area">
        <view class="select-btns">
          <view
            v-for="(monster, index) in pageContent.selectUrls"
            :key="index"
            class="select-btn"
            :class="{ selected: selectedItem === index }"
            @click="selectItem(index)"
          >
            <image :src="monster" mode="aspectFit" style="width: 100%" />
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

    <!-- 多选页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'checkBox'"
    >
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" />
      </view>
      <view class="input-area">
        <wd-checkbox-group v-model="checkBoxItem" cell shape="button" size="large">
          <template v-for="(item, index) in pageContent.selectUrls" :key="index">
            <wd-checkbox :modelValue="index">{{ item }}</wd-checkbox>
          </template>
        </wd-checkbox-group>
      </view>
      <view @click="doOperation" class="operation-area">
        <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          {{ pageContent.operationText }}
        </view>
      </view>
    </view>

    <!-- 轮播图页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'slide'"
    >
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" />
      </view>
      <view class="input-area" style="width: 100%">
        <wd-swiper
          :list="pageContent.slideImages"
          :autoplay="false"
          v-model:current="currentSlideImage"
          :indicator="{ showControls: true }"
          :loop="false"
          imageMode="aspectFit"
          @click="handleSlideClick"
          @change="onSlideChange"
          customClass="swiper"
        ></wd-swiper>
      </view>
      <view @click="doOperation" class="operation-area">
        <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          {{ pageContent.operationText }}
        </view>
      </view>
    </view>

    <!-- 音频页面 -->
    <view
      class="main-container"
      :class="{
        'main-container-bg-0': currInterId == 0,
        'main-container-bg-1': currInterId == 1,
        'main-container-bg-2': currInterId == 2,
        'main-container-bg-3': currInterId == 3,
        'main-container-bg-4': currInterId == 4,
        'main-container-bg-5': currInterId == 5,
        'main-container-bg-6': currInterId == 6,
        'main-container-bg-7': currInterId == 7,
      }"
      v-if="pageType === 'audio'"
    >
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image :src="pageContent.imgUrl" mode="widthFix" style="width: 100%" />
      </view>
      <view class="input-area">
        <view style="text-align: center">
          <audio
            style="text-align: left"
            :src="pageContent.audioUrls[0]"
            :poster="audioPlayer.poster"
            :name="audioPlayer.name"
            :author="audioPlayer.author"
            :action="audioAction"
            controls
          ></audio>
        </view>
      </view>
      <view @click="doOperation" class="operation-area">
        <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">
          {{ pageContent.operationText }}
        </view>
      </view>
    </view>

    <!-- <view>
      <wd-button @click="testsubmit">测试提交干预</wd-button>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import { IInterPage, useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { getPageByInterId } from '@/service/index/inter'
import { useToast, useMessage } from 'wot-design-uni'

const interStore = useInterStore()
const message = useMessage()
const globalPageControlStore = useGlobalPageControlStore()
const toast = useToast()

const pageType = ref<string>('normal')
const pageContent = ref<IInterPage>()
const currentSlideImage = ref<number>(0)
const selectedItem = ref<number>(-1)
const checkBoxItem = ref<number[]>([])
const currInterId = ref<number>(interStore.interInfo.interId)
const userInputList = ref<Array<string>>([])
const hasOperation = computed(() => {
  return pageContent.value.operationIcon != null && pageContent.value.operationText != null
})

const audioPlayer = ref({
  poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
  name: '致爱丽丝',
  author: '暂无',
})
const audioAction = ref({
  method: 'pause',
})

onShow(async () => {
  const index = interStore.pageIndex
  pageContent.value = interStore.interInfo.interPages[index]
  // const res = await getPageByInterId(2, 28)
  // pageContent.value = res.data

  pageType.value = pageContent.value.pageType
  // 如果是 input 页面 恢复状态
  if (pageType.value === 'input') {
    console.log('interStore.userInputMap', interStore.userInputMap)
    if (interStore.userInputMap && interStore.userInputMap.size > 0) {
      if (interStore.userInputMap.has(pageContent.value.pageId)) {
        let inputString = interStore.userInputMap.get(pageContent.value.pageId)
        inputString = inputString.slice(0, -1)
        const inputList = inputString.split('%')
        inputList.forEach((input, index) => {
          userInputList.value[index] = input
        })
      }
    }
  }
  console.log('pageContent.value', pageContent.value)
})

const ToHome = () => {
  // message
  //   .confirm({
  //     msg: '确定退出干预吗？',
  //     title: '提示',
  //   })
  //   .then(() => {
  //     // 如果是 input 页面 保存用户输入到pinia
  //     if (pageContent.value.pageType === 'input') {
  //       let inputContent = ''
  //       for (let i = 0; i < userInputList.value.length; i++) {
  //         inputContent = inputContent + userInputList.value[i] + '%'
  //       }
  //       interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  //     }
  //     uni.switchTab({ url: '/pages/home/home' })
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // 如果是 input 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'input') {
    let inputContent = ''
    for (let i = 0; i < userInputList.value.length; i++) {
      inputContent = inputContent + userInputList.value[i] + '%'
    }
    interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  }
  uni.switchTab({ url: '/pages/home/home' })
}

const handleSlideClick = (e) => {
  console.log(e)
}

const onSlideChange = (e) => {
  console.log(e)
}

const selectItem = (index) => {
  selectedItem.value = index
}

const toPage = (buttonUrl: string) => {
  // botton 页面的跳转逻辑 根据按钮的图片名称判断需要跳转到哪个页面
  // 干预2页面6
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
    // 干预2页面15
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
  // 干预2页面24
  if (buttonUrl === 'http://115.159.83.61:9000/journey2/renwu3.png') {
    interStore.setPageIndex(25)
    globalPageControlStore.globalPageControlInfo.firstStepPage24_2 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/renwu4.png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage24_2 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(30)
      globalPageControlStore.globalPageControlInfo.secondStepPage24_2 = true
    }
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey2/renwu5.png') {
    if (
      globalPageControlStore.globalPageControlInfo.secondStepPage24_2 === false ||
      globalPageControlStore.globalPageControlInfo.firstStepPage24_2 === false
    ) {
      toast.warning('请先查看第二步')
      return
    } else {
      interStore.setPageIndex(31)
      globalPageControlStore.globalPageControlInfo.toDaolanHome = true
    }
  }
  // 干预3页面27
  if (buttonUrl === 'http://115.159.83.61:9000/journey3/renwu2(1).png') {
    interStore.setPageIndex(28)
    globalPageControlStore.globalPageControlInfo.firstStepPage27_3 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey3/renwu2(2).png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage27_3 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(29)
      globalPageControlStore.globalPageControlInfo.secondStepPage27_3 = true
    }
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey3/renwu2(3).png') {
    if (
      globalPageControlStore.globalPageControlInfo.secondStepPage27_3 === false ||
      globalPageControlStore.globalPageControlInfo.firstStepPage27_3 === false
    ) {
      toast.warning('请先查看第二步')
      return
    } else {
      interStore.setPageIndex(30)
      globalPageControlStore.globalPageControlInfo.toDaolanHome = true
    }
  }
  // 干预4页面37
  if (buttonUrl === 'http://115.159.83.61:9000/journey4/renwu2(1).png') {
    interStore.setPageIndex(38)
    globalPageControlStore.globalPageControlInfo.firstStepPage37_4 = true
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey4/renwu2(2).png') {
    if (globalPageControlStore.globalPageControlInfo.firstStepPage37_4 === false) {
      toast.warning('请先查看第一步')
      return
    } else {
      interStore.setPageIndex(39)
      globalPageControlStore.globalPageControlInfo.secondStepPage37_4 = true
    }
  } else if (buttonUrl === 'http://115.159.83.61:9000/journey4/renwu2(3).png') {
    if (
      globalPageControlStore.globalPageControlInfo.secondStepPage37_4 === false ||
      globalPageControlStore.globalPageControlInfo.firstStepPage37_4 === false
    ) {
      toast.warning('请先查看第二步')
      return
    } else {
      interStore.setPageIndex(40)
      globalPageControlStore.globalPageControlInfo.toDaolanHome = true
    }
  }
  uni.redirectTo({
    url: '/pages/journey_common/common',
  })
}

const doOperation = async () => {
  // 如果是 input 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'input') {
    let inputContent = ''
    for (let i = 0; i < userInputList.value.length; i++) {
      // 判断用户有无未填写
      if (userInputList.value[i] === '') {
        toast.error('请不要留下空白！')
        return
      } else if (
        userInputList.value[i].indexOf('%') !== -1 ||
        userInputList.value[i].indexOf('#') !== -1 ||
        userInputList.value[i].indexOf('_') !== -1
      ) {
        toast.error('请不要输入 % # _ 字符！')
        return
      }
      inputContent = inputContent + userInputList.value[i] + '%'
    }
    interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  }
  // 如果是 radio 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'radio') {
    // 判断用户有无未填写
    if (selectedItem.value !== -1) {
      toast.error('选择一项！')
      return
    }
    const inputContent = pageContent.value.selectUrls[selectedItem.value]
    interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  }
  // 如果是 checkBox 页面 保存用户输入到pinia
  if (pageContent.value.pageType === 'checkBox') {
    // 判断用户有无未填写
    if (checkBoxItem.value.length < 1) {
      toast.error('选择至少一项！')
      return
    }
    let inputContent = ''
    for (let i = 0; i < checkBoxItem.value.length; i++) {
      inputContent = inputContent + pageContent.value.selectUrls[checkBoxItem.value[i]] + '_'
    }
    interStore.setUserInputMap(pageContent.value.pageId, inputContent)
  }
  // 如果是 button 页面 判断一下是否前往 daolanHome
  if (pageContent.value.pageType === 'button') {
    if (hasOperation.value && globalPageControlStore.globalPageControlInfo.toDaolanHome) {
      uni.redirectTo({
        url: '/pages/journey_common/daolanHome',
      })
    } else {
      toast.warning('请先完成任务')
      return
    }
  }

  // 如果用户点击的是返回按钮 需要判断当前是什么页面以跳转回原 button 页面
  if (pageContent.value.operationIcon.endsWith('back.png')) {
    if (pageContent.value.pageId === 7 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(6)
    } else if (pageContent.value.pageId === 17 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(15)
    } else if (pageContent.value.pageId === 29 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(24)
    } else if (pageContent.value.pageId === 30 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(24)
    } else if (pageContent.value.pageId === 31 && pageContent.value.interId === 2) {
      await interStore.setPageIndex(24)
    } else if (pageContent.value.pageId === 28 && pageContent.value.interId === 3) {
      await interStore.setPageIndex(27)
    } else if (pageContent.value.pageId === 29 && pageContent.value.interId === 3) {
      await interStore.setPageIndex(27)
    } else if (pageContent.value.pageId === 30 && pageContent.value.interId === 3) {
      await interStore.setPageIndex(27)
    } else if (pageContent.value.pageId === 38 && pageContent.value.interId === 4) {
      await interStore.setPageIndex(37)
    } else if (pageContent.value.pageId === 39 && pageContent.value.interId === 4) {
      await interStore.setPageIndex(37)
    } else if (pageContent.value.pageId === 40 && pageContent.value.interId === 4) {
      await interStore.setPageIndex(37)
    }
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
    return
  }

  // pageIndex 自增
  const res = await interStore.addPageIndex()
  // 如果是最后一页就不再进行跳转
  // if (res === 'pageEnd') {
  //   return
  // }

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

const testsubmit = () => {
  uni.redirectTo({
    url: '/pages/inquiry/eval',
  })
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.main-container-bg-2 {
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.main-container-bg-3 {
  background: linear-gradient(to bottom, #ffe6eb 0%, #e6f0ff 100%);
}

.middle-img-common {
  width: 100%;
  height: auto;
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  /* margin-top: 30rpx; */
  /* padding: 10px; */
}

.middle-img-button {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  /* padding: 10px; */
}

.input-area {
  width: 90%;
  height: auto;
  margin: 0 auto;
}

.button-area {
  width: 100%;
  height: auto;
  margin-top: 20px;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 15px 0 20px 0;
}

.select-btns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  overflow-x: hidden;
}
.select-btn {
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  opacity: 0.6;
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.select-btn:hover,
.select-btn.selected {
  opacity: 1;
  transform: scale(1.1);
}
.select-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.swiper {
  /* height: 540rpx; */
}
</style>
