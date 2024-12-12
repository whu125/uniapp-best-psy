<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '打卡',
  },
  needLogin: true,
}
</route>

<template>
  <view class="" w-full h-full>
    <wd-navbar fixed safeAreaInsetTop title="打卡"></wd-navbar>

    <view class="con px-2">
      <view style="height: 15%"></view>
      <view class="illustration-placeholder">
        <img src="http://115.159.83.61:9000/common/dakaend.png" alt="" />
      </view>

      <view class="flex justify-center mt-14" v-if="isLast === false">
        <wd-button @click="toHome" type="success" size="large">返回主界面</wd-button>
      </view>
      <view class="flex justify-center btn" v-if="isLast === true">
        <wd-button @click="toReport" type="success" size="large">查看你的旅程报告</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useInterStore } from '@/store/inter'
import { useUserStore } from '@/store/user'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { startInter, IStartInter } from '@/service/index/inter'
import { getFormattedDate } from '@/utils/getTime'
import { useMessage, useToast } from 'wot-design-uni'

const interStore = useInterStore()
const userStore = useUserStore()
const globalPageControlStore = useGlobalPageControlStore()
const toast = useToast()
const isLast = computed(() => {
  return userStore.userInfo.groupId === 0 && userStore.userInfo.currProgress === 99
})

const interText = ref(['零', '一', '二', '三', '四', '五', '六', '七'])

// 这里可以添加任何需要的逻辑
const toHome = () => {
  // 加逻辑，如果是第一套，跳转home，如果是第二套，跳转daolanHome
  if (userStore.userInfo.groupId === 0) {
    uni.switchTab({
      url: '/pages/home/home?flag=true',
    })
  } else {
    uni.redirectTo({
      url: '/pages/journey_common/daolanHome',
    })
  }
}

const toReport = async () => {
  interStore.clearInternfo()
  globalPageControlStore.clearInternfo()
  const startObj: IStartInter = {
    userId: userStore.userInfo.userId,
    interId: 99,
    startTime: getFormattedDate(),
  }
  const res = await startInter(startObj)
  if (res.code === 200) {
    interStore.setInterInfo(res.data)
    uni.redirectTo({
      url: '/pages/journey_common/common',
    })
  } else {
    toast.error('出现了一些问题')
  }
}
</script>

<style scoped>
.con {
  display: flex;
  flex: 1;
  flex-direction: column;
  /* gap: 15px; */
  height: 100vh;
  overflow: hidden;
  /* padding-top: 1.25rem;
  margin-top: 3rem; */
  /* overflow-y: scroll; */
  background: linear-gradient(90deg, rgba(171, 236, 214, 0.29) 0%, rgba(251, 237, 150, 0.29) 100%);
}
.container {
  max-width: 400px;
  height: 100vh;
  /* padding: 20px; */
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: #e8f5e9;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.btn {
  margin-top: 20px;
}

.back-arrow {
  margin-right: 10px;
  font-size: 24px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.illustration {
  margin-bottom: 20px;
}

.illustration-placeholder {
  width: 100%;
  height: 50%;
  /* background-color: #c8e6c9; */
  border-radius: 10px;
}

.instructions {
  margin-bottom: 20px;
  text-align: center;
}

.instructions p {
  margin: 5px 0;
  font-size: 14px;
}

.start-button {
  display: block;
  width: 60%;
  padding: 12px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
}

.start-button:hover {
  background-color: #45a049;
}
</style>
