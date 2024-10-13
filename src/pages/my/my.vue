<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人信息',
  },
  // needLogin: true,
}
</route>
<template>
  <tabbar selected="2"></tabbar>
  <view
    class="bg-white overflow-hidden pt-10 px-2 box-border"
    style="
      height: 100vh;
      overflow: scroll;
      background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6);
    "
  >
    <div class="profile-container">
      <div class="user-info">
        <div class="avatar">
          <!-- <img src="@/static/" alt="User avatar" /> -->
          <img src="../../static/images/wenjuan.png" alt="" class="w-20 h-20" mode="widthFix" />
          <!-- <wd-img src="../../../../static/images/wenjuan.png"></wd-img> -->
          <view class="ml-4">
            <wd-icon name="jump" />
          </view>
        </div>
        <view class="flex">
          <h2 class="username">{{ userInfo.username }}</h2>
          <view class="ml-4 flex items-center">
            <wd-icon name="jump" />
          </view>
        </view>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-value">2</span>
          <span class="stat-label">已解锁单元</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">10</span>
          <span class="stat-label">已获得金币</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">40</span>
          <span class="stat-label">待解锁金币</span>
        </div>
      </div>

      <div class="menu-items">
        <div class="menu-item">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">新手指南</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/rexiandianhua.png"
            />
          </view>

          <span class="label ml-4">心理危机热线</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/zixun.png"
            />
          </view>
          <span class="label ml-4">咨询师信箱</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/yijian.png"
            />
          </view>
          <span class="label ml-4">意见反馈</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toadmin()">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">测试管理员页面</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toLogin()">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">进入登录页面</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toInquiry()">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">测试问卷入口</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toFirst()">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">测试第一次进入调查入口</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item" @click="toadmin()">
          <view>
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="../../static/images/my/xinshouzhinan.png"
            />
          </view>
          <span class="label ml-4">测试管理员页面</span>
          <span class="arrow">›</span>
        </div>

        <view style="height: 150rpx"></view>
      </div>
    </div>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useUserStore } from '@/store/user'
import { logout, test } from '@/service/index/user'
import tabbar from '@/pages/tabbar/tabbar.vue'
import { IInterPage, useInterStore } from '@/store/inter'

const interStore = useInterStore()

const userStore = useUserStore()
const userInfo = ref(userStore.userInfo)

uni.hideTabBar()
defineOptions({
  name: 'my',
})

// onLoad(() => {
//   console.log(userStore.userInfo)
// })

onShow(() => {
  userInfo.value = userStore.userInfo
  console.log('userInfo:', userInfo.value)

  if (Object.keys(userInfo.value).length === 0 && userInfo.value.constructor === Object) {
    // 如果 userInfo.value 是一个空对象，则执行以下代码
    getUserInfo()
  }
})

const getUserInfo = () => {
  console.log('获取用户信息')
}
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const logoutByToken = async () => {
  const res = await logout()
  console.log(res)
  if (res.code === 200) {
    userStore.clearUserInfo()
    uni.switchTab({
      url: '/pages/my/my',
    })
  }
}

const toLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}

const toInquiry = () => {
  uni.navigateTo({
    url: '/pages/inquiry/start',
  })
}

const toFirst = () => {
  uni.navigateTo({
    url: '/pages/inquiry/first',
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

const toadmin = () => {
  uni.navigateTo({
    url: '/pages/admin/admin',
  })
}

const submitInter = () => {
  console.log('模拟提交干预')
}

const clear = () => {
  console.log('测试清楚干预缓存')
  interStore.clearInternfo()
}
</script>

<style>
.profile-container {
  padding: 0.625rem;
  margin-top: 2rem;

  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6);
  border-radius: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  /* background-color: #d9d9d9; */
  border-radius: 50%;
}

.username {
  margin: 0;
  font-size: 18px;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.menu-items {
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.icon {
  margin-right: 15px;
  font-size: 20px;
}

.label {
  flex-grow: 1;
  font-size: 18px;
}

.arrow {
  color: #ccc;
}
</style>
