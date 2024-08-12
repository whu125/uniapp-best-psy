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
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="mt-12">
      <image src="/static/logo.svg" alt="" class="w-28 h-28 block mx-auto" />
    </view>
    <view class="text-center text-4xl main-title-color mt-4">unibest</view>
    <view class="text-center text-2xl mt-2 mb-8">最 uniapp 开发模板</view>

    <view class="text-justify max-w-100 m-auto text-4 indent mb-2">{{ description }}</view>
    <view class="text-center mt-8">
      当前平台是：
      <text class="text-green-500">{{ PLATFORM.platform }}</text>
    </view>
    <view class="text-center mt-4">
      模板分支是：
      <text class="text-green-500">base</text>
    </view>

    <view class="flex flex-justify-center">
      <wd-button type="success" @click="wiexinLogin">微信登录</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

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
          const token = res.data.obj
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
// const wiexinLogin = () => {
//   uni.getUserProfile({
//     desc: '获取微信用户的昵称与头像',
//     success: function (resp) {
//       uni.login({
//         success: function (res) {
//           const code = res.code
//           console.log(res.code)
//           console.log(resp.userInfo)
//           const nickName = resp.userInfo.nickName
//           const avatarUrl = resp.userInfo.avatarUrl
//           // let data = {
//           //   code: code,
//           //   nickname: nickName,
//           //   photo: avatarUrl,
//           //   registerCode: that.registerCode,
//           // }
//           // uni.request({
//           //   url: url,
//           //   method: 'POST',
//           //   header: {
//           //     token: uni.getStorageSync('token'),
//           //   },
//           //   data: data,
//           //   success: function (resp) {},
//           // })
//         },
//         fail: function () {
//           console.log('fail use getUserProfile')
//         },
//       })
//     },
//   })
// }
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
