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

    <view class="main-container" v-if="pageContent">
      <view style="height: 15%"></view>
      <view class="middle-img">
        <image :src="pageContent.imgUrl" mode="aspectFit" style="width: 100%" />
      </view>
      <view class="operation-area" v-if="haveBottom">
        <view @click="doOperation">
          <img :src="pageContent.operationIcon" style="width: 50px; height: 50px" />
          <view style="font-size: 18px">{{ pageContent.operationText }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { IInterPage, useInterStore } from '@/store/inter'
const progress = ref<number>()
const interStore = useInterStore()
const pageContent = ref<IInterPage>()
const haveBottom = computed(() => {
  return pageContent.value.operationIcon !== null && pageContent.value.operationText !== null
})

onShow((options) => {
  const index = interStore.pageIndex
  pageContent.value = interStore.interInfo.interPages[index]
  console.log('pageContent.value', pageContent.value)
})

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const doOperation = async () => {
  if (pageContent.value.operationIcon.endsWith('back.png')) {
    uni.navigateBack()
    return
  }

  const res = await interStore.addPageIndex()
  console.log(interStore.pageIndex)
  if (res === 'pageEnd') {
    return
  }

  if (pageContent.value.specialPage === 'none') {
    uni.navigateTo({
      url: '/pages/journey_common/common',
    })
  } else {
    const specialPage = pageContent.value.specialPage
    uni.navigateTo({
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
  /* padding: 0 10px 0 10px; */
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img {
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
  height: 30%;
}
</style>
