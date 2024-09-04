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
    class="bg-white overflow-hidden pt-10 px-4 box-border"
    style="height: 100vh; background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6)"
  >
    <div class="profile-container">
      <div class="user-info">
        <div class="avatar">
          <!-- <img src="@/static/" alt="User avatar" /> -->
          <img src="../../static/images/wenjuan.png" alt="" class="w-full h-full" />
          <!-- <wd-img src="../../../../static/images/wenjuan.png"></wd-img> -->
          <view class="ml-4">
            <wd-icon name="jump" />
          </view>
        </div>
        <view class="flex">
          <h2 class="username">这是一个非常非常长的名字</h2>
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
          <span class="icon">🧭</span>
          <span class="label">新手指南</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item">
          <span class="icon">📞</span>
          <span class="label">心理危机热线</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item">
          <span class="icon">💌</span>
          <span class="label">咨询师信箱</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item">
          <span class="icon">📝</span>
          <span class="label">意见反馈</span>
          <span class="arrow">›</span>
        </div>
        <div class="menu-item">
          <span class="icon">ℹ️</span>
          <span class="label">关于我们</span>
          <span class="arrow">›</span>
        </div>
      </div>
    </div>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useUserStore } from '@/store/user'
import { logout, test } from '@/service/index/user'
import tabbar from '@/pages/tabbar/tabbar.vue'

const userStore = useUserStore()
const userInfo = ref(userStore.userInfo)

uni.hideTabBar()
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
.profile-container {
  padding: 20px;
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
}

.arrow {
  color: #ccc;
}
</style>
