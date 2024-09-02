<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的旅程',
  },
}
</route>
<template>
  <tabbar selected="0"></tabbar>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <!-- <view class="container">
      <view class="header">
        <view class="title">我的旅程</view>
      </view>
      <view class="todo-list">
        <view class="todo-item" v-for="(inter, index) in inters" :key="index">
          <view class="todo-time">旅程{{ inter.title }}</view>
          <view class="todo-content">开启时间: 2024-08-12 14:30</view>
          <view class="flex flex-justify-center">
            <wd-button type="info" size="medium" v-if="inter.interId < userInfo.currProgress">
              已完成
            </wd-button>
            <wd-button
              type="success"
              size="medium"
              @click="ToGanPage(inter.interId)"
              v-if="inter.interId == userInfo.currProgress"
            >
              进入干预
            </wd-button>
            <wd-button type="warning" size="medium" v-if="inter.interId > userInfo.currProgress">
              等待开启
            </wd-button>
            <wd-button type="error" size="medium">问卷</wd-button>
          </view>
        </view>
      </view>
    </view> -->

    <view class="main-container">
      <view class="start-inter">
        <view class="title">站点导览</view>
        <view class="text">有时候你能做的最有效的事情是放松。</view>
        <view>
          <wd-button type="success" @click="ToGanPage(1)">进入旅程</wd-button>
          <wd-button type="success" @click="ToInquiry()">测试进入问卷</wd-button>
        </view>
      </view>
      <view class="sub-container">
        <view class="inter-task">
          <view class="title">站点任务</view>
          <view class="icon">
            <wd-icon name="list" color="#ffffff" />
          </view>
        </view>
        <view class="inter-next">
          <view class="title">下一站地图</view>
          <view class="icon">
            <wd-icon name="add-circle" color="#ffffff" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getUserInfo, User } from '@/service/index/user'
import { startInter, IStartInter } from '@/service/index/questions'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import tabbar from '@/pages/tabbar/tabbar.vue'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()
const userInfo = userStore.userInfo

const inters = ref([
  { title: '一', interId: 1 },
  { title: '二', interId: 2 },
  { title: '三', interId: 3 },
  { title: '四', interId: 4 },
  { title: '五', interId: 5 },
  { title: '六', interId: 6 },
])
// 测试 uni API 自动引入
onLoad(() => {})
uni.hideTabBar()
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
    userId: userInfo.userId,
    interId,
    startTime: getFormattedDate(),
  })
  console.log(res)
  if (res.code === 200) {
    uni.navigateTo({
      url: `/pages/ganyu/ganyu?interId=${interId}`,
    })
  }
}

const ToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}

const ToInquiry = () => {
  const position = '2-pre'
  uni.navigateTo({
    url: `/pages/inquiry/inquiry?position=${position}`,
  })
}
</script>

<style>
.main-title-color {
  color: #d14328;
}
/*
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
  */

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
}

.sub-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-top: 20px;
}

.start-inter {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: auto;
  padding: 15px;
  background-color: #d14328;
  border-radius: 10px;
}

.inter-task {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: auto;
  background-color: cadetblue;
  border-radius: 10px;
}

.inter-next {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: auto;
  background-color: gray;
  border-radius: 10px;
}

.title {
  margin-top: 15px;
  font-size: 18px;
  color: white;
}

.text {
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 15px;
  color: white;
}

.icon {
  width: auto;
  height: auto;
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
