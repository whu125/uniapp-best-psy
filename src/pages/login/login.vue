/* stylelint-disable order/properties-order */
<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'login',
  },
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="login-form">
      <view class="tab-bar">
        <text class="active">登录</text>
        <text>注册</text>
      </view>

      <wd-input type="text" v-model="loginInfo.wechatId" placeholder="请输入微信号" />
      <wd-input v-model="loginInfo.wechatPassword" clearable show-password="false" />

      <text class="forget-password">忘记密码</text>

      <button class="login-btn" @tap="login">登录</button>
    </view>

    <!-- 社交媒体图标 -->
    <view class="social-icons">
      <view class="icon" @click="wiexinLogin">微信</view>
      <view class="icon">QQ</view>
      <view class="icon">微博</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useUserStore } from '@/store'
import { getUserInfo } from '@/service/index/user'

defineOptions({
  name: 'login',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const loginInfo = ref({
  wechatId: null,
  wechatPassword: null,
})
const login = () => {
  // 实现登录逻辑
  console.log('登录123')
}

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
          const userInfo = getUserInfo()
          const userStore = useUserStore()
          userStore.setUserInfo(userInfo)

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
</script>

<style>
.main-title-color {
  color: #d14328;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom, #87cefa, #ffffff);
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: #ffffff;
}

.illustration {
  flex: 1;
  /* 添加插图样式 */
}

.login-form {
  padding: 20px;
  background: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.tab-bar {
  display: flex;
  margin-bottom: 20px;
}

.tab-bar text {
  margin-right: 20px;
  font-size: 18px;
  color: #999999;
}

.tab-bar .active {
  color: #87cefa;
  border-bottom: 2px solid #87cefa;
}

.input {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #eeeeee;
  border-radius: 20px;
}

.input-wrapper {
  position: relative;
}

.forget-password {
  margin-bottom: 20px;
  font-size: 14px;
  color: #999999;
  text-align: right;
}

.login-btn {
  width: 100%;
  height: 40px;
  color: #ffffff;
  background: linear-gradient(to right, #87cefa, #4169e1);
  border: none;
  border-radius: 20px;
}

.social-icons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #eeeeee;
  border-radius: 50%;
}
</style>
