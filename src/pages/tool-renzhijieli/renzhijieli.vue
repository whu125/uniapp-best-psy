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
      left-text="返回"
      safeAreaInsetTop
      title="认知解离"
      left-arrow
      @click-left="handleClickLeft"
    ></wd-navbar>
    <view class="main-container">
      <view style="height: 15%"></view>
      <view class="big-icon">
        <img
          style="width: 200px; height: 180px"
          src="http://115.159.83.61:9000/tool/renzhijieli/renzhijieli-logo.png"
        />
      </view>
      <view class="title">认知解离</view>
      <view class="font">我是我，想法是想法，我不被想法定义</view>
      <view class="small-font">下面两个正念练习将帮助你将自己和想法区分开</view>
      <view class="button-area">
        <wd-card>
          <view class="card-content" @click="toDistance">
            <view class="card-title">与想法拉开距离</view>
            <view><wd-icon name="fullsreen" size="26px"></wd-icon></view>
          </view>
        </wd-card>
        <wd-card>
          <view class="card-content" @click="ToLeaf">
            <view class="card-title">随溪飘走的落叶</view>
            <view><wd-icon name="format-vertical-align-right" size="26px"></wd-icon></view>
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

const toDistance = () => {
  uni.navigateTo({
    url: '/pages/tool-renzhijieli/distance',
  })
}

const ToLeaf = () => {
  uni.navigateTo({
    url: '/pages/tool-renzhijieli/leaf',
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

.big-icon {
  display: flex;
  justify-content: center;
  margin-top: 20%;
}

.button-area {
  margin-top: 18px;
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
