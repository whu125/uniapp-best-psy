<!--
 * @Author: wenhao zhang zhangwenhao@answerai.pro
 * @Date: 2024-08-12 11:12:02
 * @LastEditors: wenhao zhang zhangwenhao@answerai.pro
 * @LastEditTime: 2024-08-12 11:20:16
 * @FilePath: /my-project/src/pages/index/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的旅程',
  },
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="container">
      <view class="header">
        <view class="title">我的旅程</view>
      </view>
      <view class="todo-list">
        <view class="todo-item">
          <view class="todo-time">旅程一</view>
          <view class="todo-content">完成时间: 2024-08-14 14:30</view>
          <view class="flex flex-justify-center">
            <wd-button type="info" size="medium">已完成</wd-button>
            <wd-button type="error" size="medium">问卷</wd-button>
          </view>
        </view>
        <view class="todo-item">
          <view class="todo-time">旅程二</view>
          <view class="todo-content">开启时间: 2024-08-12 14:30</view>
          <view class="flex flex-justify-center">
            <wd-button type="success" size="medium">进入旅程</wd-button>
            <wd-button type="info" size="medium">问卷</wd-button>
          </view>
        </view>
        <view class="todo-item">
          <view class="todo-time">旅程三</view>
          <view class="todo-content">开启时间: 2024-08-12 14:30</view>
          <view class="flex flex-justify-center">
            <wd-button type="warning" size="medium">等待开启</wd-button>
            <wd-button type="info" size="medium">问卷</wd-button>
          </view>
        </view>
        <view class="todo-item">
          <view class="todo-time">旅程四</view>
          <view class="todo-content">开启时间: 2024-08-12 14:30</view>
          <view class="flex flex-justify-center">
            <wd-button type="warning" size="medium">等待开启</wd-button>
            <wd-button type="info" size="medium">问卷</wd-button>
          </view>
        </view>
        <view class="todo-item">
          <view class="todo-time">旅程五</view>
          <view class="todo-content">开启时间: 2024-08-12 14:30</view>
          <view class="flex flex-justify-center">
            <wd-button type="warning" size="medium">等待开启</wd-button>
            <wd-button type="info" size="medium">问卷</wd-button>
          </view>
        </view>
        <view class="todo-item">
          <view class="todo-time">旅程六</view>
          <view class="todo-content">开启时间: 2024-08-12 14:30</view>
          <view class="flex flex-justify-center">
            <wd-button type="warning" size="medium">等待开启</wd-button>
            <wd-button type="info" size="medium">问卷</wd-button>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="flex flex-justify-center">
      <wd-button type="success" @click="wiexinLogin">微信登录</wd-button>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getUserInfo, User } from '@/service/index/user'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const author = ref('菲鸽')
const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite4 + UnoCss + UniUI + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)
// 测试 uni API 自动引入
onLoad(() => {
  console.log(author)
})
</script>

<style>
.main-title-color {
  color: #d14328;
}

.container {
  box-sizing: border-box;
  max-width: 414px;
  padding: 20px;
  margin: 0 auto;
  background-color: #6666ff;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: white;
}
.back-arrow {
  margin-right: 20px;
  font-size: 24px;
}
.title {
  font-size: 18px;
}
.date-selector {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #7777ff;
  border-radius: 10px;
}
.date-item {
  color: white;
  text-align: center;
}
.date-item.active {
  padding: 5px 10px;
  color: #6666ff;
  background-color: white;
  border-radius: 5px;
}
.todo-list {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}
.todo-item {
  position: relative;
  padding-left: 30px;
  margin-bottom: 20px;
}
.todo-item::before {
  position: absolute;
  top: 5px;
  left: 0;
  width: 10px;
  height: 10px;
  content: '';
  border-radius: 50%;
}
.todo-item:nth-child(even)::before {
  background-color: #6666ff;
}
.todo-item:nth-child(odd)::before {
  background-color: #66ccff;
}
.todo-time {
  margin-bottom: 5px;
  font-weight: bold;
}
.todo-content {
  margin-bottom: 5px;
}
.todo-button {
  padding: 5px 10px;
  font-size: 12px;
  color: #6666ff;
  background-color: #e6e6ff;
  border: none;
  border-radius: 5px;
}
</style>
