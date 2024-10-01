<route lang="json5">
{
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '打卡',
  },
  needLogin: true,
}
</route>

<template>
  <!-- <view
            class="bg-white overflow-hidden pt-2 px-4"
            :style="{ marginTop: safeAreaInsets?.top + 100 + 'px' }"
            w-full
            h-full
          >
            <wd-navbar title="工具箱"></wd-navbar>
          </view> -->
  <view class="container">
    <view class="illustration">
      <view class="illustration-placeholder">
        <img src="http://115.159.83.61:9000/inquiry/success.png" alt="" />
      </view>
    </view>

    <view class="instructions">
      <p>第二站</p>
      <p>打卡成功</p>
    </view>

    <view class="flex justify-center">
      <wd-button @click="startInquiry">查看站点回顾</wd-button>
    </view>
  </view>
</template>

<script setup>
// 这里可以添加任何需要的逻辑
const startInquiry = () => {
  uni.redirectTo({
    url: '/pages/inquiry/eval',
  })
}
</script>

<style scoped>
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
  height: 400px;
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
