<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人信息',
  },
  needLogin: true,
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="container">
      <view class="header">
        <!-- <view class="avatar">🐧</view> -->
        <wd-img
          :width="100"
          :height="100"
          round
          src="https://ss0.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3498215567,1247959937&fm=253&gp=0.jpg"
        />
        <view>{{ userInfo.username }}</view>
        <!-- <button class="login-btn">登录</button>
        <p>免费注册</p> -->
      </view>
      <!-- <view class="quick-actions">
        <view class="quick-action">
          ⭐
          <br />
          收藏
        </view>
        <view class="quick-action">
          👍
          <br />
          点赞
        </view>
        <view class="quick-action">
          💬
          <br />
          评论
        </view>
        <view class="quick-action">
          🕒
          <br />
          历史
        </view>
      </view> -->
      <ul class="menu-list">
        <li class="menu-item">
          新手指南
          <span>></span>
        </li>
        <li class="menu-item">
          关于我们
          <span>></span>
        </li>
        <li class="menu-item">
          意见反馈
          <span>></span>
        </li>
        <li class="menu-item" @click="logoutByToken()">
          退出登录
          <span>></span>
        </li>
        <li class="menu-item" @click="toLogin()">
          进入登录页面
          <span>></span>
        </li>
        <li class="menu-item" @click="checkLogin()">
          检查登录
          <span>></span>
        </li>
        <li class="menu-item" @click="testAPI()">
          检测接口
          <span>></span>
        </li>
      </ul>
      <view class="flex flex-justify-center flex-items-center flex-col mt-1">
        <view class="small-gray-text">咨询师信箱: example@qq.com</view>
        <view class="small-gray-text">心理危机热线: 1234567890</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useUserStore } from '@/store/user'
import { logout, test } from '@/service/index/user'
const userStore = useUserStore()
const userInfo = ref(userStore.userInfo)

defineOptions({
  name: 'my',
})

onLoad(() => {
  console.log(userStore.userInfo)
})

onShow(() => {
  userInfo.value = userStore.userInfo
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const logoutByToken = async () => {
  const res = await logout()
  console.log(res)
  if (res.code === 200) {
    userStore.clearUserInfo()
    uni.navigateTo({
      url: '/pages/my/my',
    })
  }
}

const toLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}

const checkLogin = () => {
  uni.navigateTo({
    url: '/pages/test2/test2',
  })
}

const testAPI = async () => {
  const res = await test()
  console.log(res)
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.container {
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.header {
  padding: 20px;
  text-align: center;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  font-size: 40px;
  background-color: #ffd700;
  border-radius: 50%;
}
.login-btn {
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 16px;
  color: white;
  background-color: #ff6347;
  border: none;
  border-radius: 20px;
}
.quick-actions {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}
.quick-action {
  font-size: 12px;
  text-align: center;
}
.menu-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}
.menu-item:last-child {
  border-bottom: none;
}

.small-gray-text {
  font-size: 12px; /* 字体大小，根据需要调整 */
  color: #808080; /* 灰色字体颜色 */
}
</style>
