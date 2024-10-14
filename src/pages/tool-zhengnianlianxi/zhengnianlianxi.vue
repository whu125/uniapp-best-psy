<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '心情日记',
  },
  needLogin: true,
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="正念练习" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view style="height: 15%"></view>
    <view class="big-icon">
      <img
        style="width: 200px; height: 180px"
        src="http://115.159.83.61:9000/tool/zhengnianlianxi/zhengnianlianxi-logo.png"
      />
    </view>
    <view class="font">正念，用另一种方式与情绪相处</view>
    <view class="font">正念练习将引导你观察情绪的浪潮，</view>
    <view class="font">旅行手记可以帮助你记录自己的成长和进步</view>
    <view>
      <wd-card>
        <view class="card-content" @click="start">
          <view class="card-title">正念练习</view>
          <view><wd-icon name="edit-1" size="23px" /></view>
        </view>
      </wd-card>
      <wd-card>
        <view class="card-content" @click="ToList">
          <view class="card-title">旅行手记</view>
          <view><wd-icon name="copy" size="22px" /></view>
        </view>
      </wd-card>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const handleClickLeft = () => {
  uni.navigateBack()
}

const start = () => {
  uni.navigateTo({
    url: '/pages/tool-zhengnianlianxi/startPractise',
  })
}

const ToList = () => {
  uni.navigateTo({
    url: '/pages/tool-zhengnianlianxi/list',
  })
}
</script>

<style>
.font {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.big-icon {
  display: flex;
  justify-content: center;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.card-title {
  font-size: 20px;
}
</style>
