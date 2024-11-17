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
      title="行动计划"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="font">我的魔法行动指南</view>
      <view v-for="(xingdong, index) in xingdongList" :key="index">
        <view class="box" @click="selectJiazhi(index)">
          <view style="font-size: 20px; font-weight: bold">{{ xingdong.date }}</view>
          <view class="name">{{ xingdong.jihuaName }}</view>
          <image
            src="http://115.159.83.61:9000/tool/tool-list.png"
            style="width: 45px; height: 45px"
          />
        </view>
      </view>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { getAllUserXingdongjihua, IXingdongjihuaReturn } from '@/service/index/xingdongjihua'
import { useUserStore } from '@/store/user'
import { useMessage, useToast } from 'wot-design-uni'

const userStore = useUserStore()
const toast = useToast()
const message = useMessage()
const xingdongList = ref<IXingdongjihuaReturn[]>([])
onShow(async () => {
  toast.loading('加载中...')
  const res = await getAllUserXingdongjihua()
  toast.close()
  if (res.code === 200) {
    console.log(res)
    xingdongList.value = res.data
  } else {
    message.alert('网络错误！')
  }
})

const goBack = () => {
  uni.navigateBack()
}
const selectJiazhi = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(xingdongList.value[index]))
  uni.navigateTo({
    url: `/pages/tool-xingdongjihua/xingdongDetail?detail=${detailObject}`,
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
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: auto;
  padding: 12px 25px 12px 25px;
  margin: 15px auto;
  border-radius: 20px;
  box-shadow: 0px 0px 8px gray;
}

.font {
  margin-top: 8px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.name {
  width: 35%;
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;
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
