<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view w-full h-full>
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="自动思维"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view v-for="(siwei, index) in siweiList" :key="index">
        <view class="box" @click="selectSiWei(index)">
          <view class="left_box">
            <image :src="siwei.monsterUrl" style="width: 45px; height: 45px; margin-right: 10px" />
            <view class="text-area">
              <view style="font-size: 16px; color: gray">{{ siwei.date }}</view>
              <view class="siwei-name">{{ siwei.siweiName }}</view>
            </view>
          </view>
          <view class="right_box">
            <image
              src="http://115.159.83.61:9000/tool/tool-list.png"
              style="width: 45px; height: 45px"
            />
          </view>
        </view>
      </view>
    </view>

    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { getAllUserZidongsiwei, IZidongsiweiReturn } from '@/service/index/zidongsiwei'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const userStore = useUserStore()
const toast = useToast()
const message = useMessage()
const siweiList = ref<IZidongsiweiReturn[]>([])
onShow(async () => {
  toast.loading('加载中...')
  const res = await getAllUserZidongsiwei()
  toast.close()
  if (res.code === 200) {
    console.log(res)
    siweiList.value = res.data
  } else {
    message.alert('网络错误！')
  }
})
const goBack = () => {
  uni.navigateBack()
}
const selectSiWei = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(siweiList.value[index]))
  uni.navigateTo({
    url: `/pages/tool-zidongsiwei/siweiDetail?detail=${detailObject}`,
  })
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(
    180deg,
    rgba(255, 221, 225, 0.67) 0%,
    rgba(241, 221, 212, 0.3) 60%,
    rgba(255, 252, 219, 0.67) 100%
  );
}

.box {
  box-sizing: border-box;
  display: flex;
  width: 90%;
  height: auto;
  padding: 12px 25px 12px 25px;
  margin: 15px auto;
  border-radius: 20px;
  box-shadow: 0px 0px 8px gray;
}

.left_box {
  display: flex;
  width: 80%;
}

.right_box {
  display: flex;
  justify-content: center;
  width: 20%;
}

.text-area {
  display: flex;
  flex-direction: column;
  width: 75%;
}

.siwei-name {
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;
  text-overflow: elipsis;
  white-space: nowrap;
}
</style>
