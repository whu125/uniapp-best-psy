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
  <view w-full h-full>
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="专注当下"
      left-text="返回"
      left-arrow
      @click-left="handleClickLeft"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="big-icon">
        <img
          style="width: 200px; height: 180px"
          src="http://115.159.83.61:9000/tool/zhuanzhudangxia/zhuanzhudangxia-logo.png"
        />
      </view>
      <view class="title">专注当下</view>
      <view class="font">专注当下，觉知你的每一刻</view>
      <view class="small-font">下面两个正念练习将帮助你回到此时此刻</view>
      <view class="button-area">
        <wd-card>
          <view class="card-content" @click="toBreath">
            <view class="card-title">正念呼吸</view>
            <view><wd-icon name="chart-bubble" size="26px"></wd-icon></view>
          </view>
        </wd-card>
        <wd-card>
          <view class="card-content" @click="ToScan">
            <view class="card-title">身体扫描</view>
            <view><wd-icon name="user" size="26px"></wd-icon></view>
          </view>
        </wd-card>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const handleClickLeft = () => {
  uni.navigateBack()
}

const toBreath = () => {
  uni.navigateTo({
    url: '/pages/tool-zhuanzhudangxia/breath',
  })
}

const ToScan = () => {
  uni.navigateTo({
    url: '/pages/tool-zhuanzhudangxia/scan',
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

.font {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.title {
  margin-top: 12px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.small-font {
  margin-top: 12px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.button-area {
  margin-top: 18px;
}

.big-icon {
  display: flex;
  justify-content: center;
  margin-top: 20%;
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
  color: black;
}
</style>
