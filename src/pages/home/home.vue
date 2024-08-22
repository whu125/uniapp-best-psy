<!--
 * @Author: wenhao zhang zhangwenhao@answerai.pro
 * @Date: 2024-08-12 11:12:02
 * @LastEditors: wenhao zhang zhangwenhao@answerai.pro
 * @LastEditTime: 2024-08-19 00:07:52
 * @FilePath: /my-project/src/pages/home/home.vue
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
        <view class="todo-item" v-for="(inter, index) in inters" :key="index">
          <view class="todo-time">旅程{{ inter.title }}</view>
          <view class="todo-content">开启时间: 2024-08-12 14:30</view>
          <view class="flex flex-justify-center">
            <wd-button type="info" size="medium" v-if="inter.interId < userInfo.curr_progress">
              已完成
            </wd-button>
            <wd-button
              type="success"
              size="medium"
              @click="ToGanPage(inter.interId)"
              v-if="inter.interId == userInfo.curr_progress"
            >
              进入干预
            </wd-button>
            <wd-button type="warning" size="medium" v-if="inter.interId > userInfo.curr_progress">
              等待开启
            </wd-button>
            <wd-button type="error" size="medium">问卷</wd-button>
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
import { startInter, IStartInter } from '@/service/index/questions'
import { getFormattedDate } from '@/utils/getTime'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const author = ref('菲鸽')
const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite4 + UnoCss + UniUI + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)

const inters = ref([
  { title: '一', interId: 1 },
  { title: '二', interId: 2 },
  { title: '三', interId: 3 },
  { title: '四', interId: 4 },
  { title: '五', interId: 5 },
  { title: '六', interId: 6 },
])
const userInfo = ref({
  userId: 1,
  username: 'yz',
  wechatId: '123456789wechat',
  wechatName: 'yz-wechat',
  phone: '1234567890',
  avatar: '',
  curr_progress: 1,
})
// 测试 uni API 自动引入
onLoad(() => {
  console.log(author)
})

const wiexinLogin = () => {
  console.log('weixin login')
  uni.login({
    provider: 'weixin',
    onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      const { code } = event
      console.log(code)

      // 客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      uni.request({
        url: 'http://localhost:8081/loginByWechat', // 仅为示例，并非真实接口地址。
        method: 'POST',
        data: {
          code: event.code,
        },
        success: (res) => {
          // 获得token完成登录
          const token = res.data
          console.log(token)
          uni.setStorageSync('token', token)
        },
      })
    },
    fail: function (err) {
      // 登录授权失败 err.code是错误码
      console.log(err)
    },
  })
}

const ToGanPage = async (interId: number) => {
  const res = await startInter({
    userId: '1',
    interId,
    startTime: getFormattedDate(),
  })
  console.log(res)
  uni.navigateTo({
    url: `/pages/ganyu/ganyu?interId=${interId}`,
  })
}

const ToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}
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
