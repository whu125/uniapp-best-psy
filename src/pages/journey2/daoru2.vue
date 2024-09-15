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
      title="第二站 : 导入"
      left-arrow
      @click-left="ToHome"
    ></wd-navbar>

    <view class="main-container">
      <view class="top-img">
        <image
          src="http://115.159.83.61:9000/journey2/daoru5.png"
          mode="aspectFit"
          style="width: 100%"
        />
      </view>
      <view class="input-area">
        <view>
          <wd-input type="text" v-model="value1" placeholder="我认为, 他这样做是因为......" />
        </view>
        <view style="margin-top: 15px">
          <wd-input type="text" v-model="value2" placeholder="我感觉到的情绪是......" />
        </view>
      </view>
      <view class="middle-img">
        <image
          src="http://115.159.83.61:9000/journey2/daoru4.png"
          mode="aspectFit"
          style="width: 100%"
        />
      </view>
      <view class="operation-area" @click="submitInput">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 50px; height: 50px" />
        <view>写好啦, 提交!</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useInterStore } from '@/store/inter'
const progress = ref<number>()
const interStore = useInterStore()

onLoad((options) => {})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
const value1 = ref<string>('')
const value2 = ref<string>('')

const submitInput = async () => {
  // inputContent表示的用户在这个页面输入的内容，不同输入框的输入内容用 % 分隔，
  // 不同页面输入的内容用 # 分割，因此这里用 # 结尾，表示该页面输入内容结束
  const inputContent = value1.value + '%' + value2.value + '#'
  // inputPage表示输入内容是在当前干预的第几页，用 # 分隔
  const inputPage = '2#'
  // inoutQuestion表示输入内容对应的问题，不同问题直接用 % 分隔，
  // 不同页面输入的问题用 # 分割，因此这里用 # 结尾，表示该页面的问题结束
  const inoutQuestion = '我认为, 他这样做是因为......%我感觉到的情绪是......#'

  // 将当前干预中用户输入的内容、问题、所在的页面保存到pinia，最后完成时整个提交后端
  interStore.interInfo.userInputContent = interStore.interInfo.userInputContent + inputContent
  interStore.interInfo.userInputPages = interStore.interInfo.userInputContent + inputPage
  interStore.interInfo.userInputQuestions = interStore.interInfo.userInputContent + inoutQuestion

  console.log(inputContent)
  const res = await interStore.addPageIndex()
  if (res === 'pageEnd') {
    return
  }
  uni.redirectTo({
    url: '/pages/journey_common/common',
  })
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
  padding: 0 10px 0 10px;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img {
  width: 100%;
  height: 40%;
  overflow-y: scroll;
}

.top-img {
  width: 100%;
  height: 20%;
  margin-top: 140rpx;
  overflow-y: scroll;
}

.input-area {
  width: 100%;
  height: 10%;
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
