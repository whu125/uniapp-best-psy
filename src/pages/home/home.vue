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
  <view class="" h-full w-full>
    <wd-navbar fixed safeAreaInsetTop title="我的旅程"></wd-navbar>

    <view class="content px-4">
      <view style="height: 150rpx"></view>
      <view class="h-40 w-full">
        <image src="http://115.159.83.61:9000/home/home.png" mode="scaleToFill" />
      </view>
      <view class="card flex justify-center" v-if="curInter != -1">
        <span class="font-800 text-2xl">正在完成</span>
        <span class="font-800 text-2xl ml-4" v-show="curInter == 0">导入</span>
        <span class="font-800 text-2xl ml-4" v-show="curInter != 0">第 {{ curInter }} 站</span>
      </view>
      <view class="card flex justify-center" v-show="waitingTime > 0">
        <span class="font-800 text-xl">剩余 {{ waitingTime }} 小时 解锁</span>
        <span class="font-800 text-xl ml-4">第 {{ currProgress }} 站</span>
      </view>
      <view class="card flex justify-center" v-if="waitingTime <= 0">
        <span class="font-800 text-xl" v-if="currProgress != 0">
          已解锁 第 {{ currProgress }} 站
        </span>
        <span class="font-800 text-xl" v-if="currProgress == 0">已解锁 导入</span>
        <!-- <span class="font-800 text-xl ml-4">下一站</span> -->
      </view>
      <view
        class="card"
        v-for="(journey, index) in journeySteps"
        :key="index"
        @click="enterJourney(journey.progress)"
      >
        <img class="card-icon" :src="journey.icon" />
        <view class="card-text">{{ journey.text }}</view>
        <!-- 体验版 -->
        <image
          style="width: 60rpx; height: 60rpx"
          mode="aspectFit"
          src="../../static/images/home/finish.png"
        />

        <!-- <image
          style="width: 60rpx; height: 60rpx"
          mode="aspectFit"
          src="../../static/images/home/finish.png"
          v-show="currProgress > journey.progress"
          @click="enterJourney(journey.progress)"
        />
        <image
          style="width: 60rpx; height: 60rpx"
          mode="aspectFit"
          src="../../static/images/home/startJourney.png"
          v-show="currProgress == journey.progress && checkTimeFlag"
          @click="enterJourney(journey.progress)"
        />
        <image
          style="width: 60rpx; height: 60rpx"
          src="../../static/images/home/lockJourney.png"
          mode="aspectFit"
          v-show="currProgress == journey.progress && !checkTimeFlag"
        />
        <image
          style="width: 60rpx; height: 60rpx"
          src="../../static/images/home/lockJourney.png"
          mode="aspectFit"
          v-show="currProgress < journey.progress"
        /> -->
      </view>
      <view style="height: 150rpx"></view>
    </view>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { getUserInfo, User } from '@/service/index/user'
import tabbar from '@/pages/tabbar/tabbar.vue'
import { checkInterAvailability } from '@/service/index/inter'
import { getFormattedDate } from '@/utils/getTime'
import { useUserStore } from '@/store/user'
import { useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { useMessage, useToast } from 'wot-design-uni'

defineOptions({
  name: 'Home',
})

uni.hideTabBar()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()
const message = useMessage()

const toast = useToast()
const interStore = useInterStore()
const globalPageControl = useGlobalPageControlStore()

const userInfo = ref<IUserInfo>(userStore.userInfo)
// const currProgress = ref<number>(2)
const currProgress = ref<number>(userStore.userInfo.currProgress % 8)

const curInter = ref<number>(interStore.interInfo.interId % 8)

const checkTimeFlag = ref(false)
// const checkTimeFlag = ref(true)

const waitingTime = ref(1)

const journeySteps = ref([
  { icon: '../../static/images/home/journey0.png', text: '导入：开启你的旅程', progress: 0 },
  { icon: '../../static/images/home/journey1.png', text: '第一站：认识你的情绪', progress: 1 },
  { icon: '../../static/images/home/journey2.png', text: '第二站：观察你的思维', progress: 2 },
  { icon: '../../static/images/home/journey3.png', text: '第三站：回到此时此刻', progress: 3 },
  { icon: '../../static/images/home/journey4.png', text: '第四站：面对你的痛苦', progress: 4 },
  { icon: '../../static/images/home/journey5.png', text: '第五站：接纳当下的你', progress: 5 },
  { icon: '../../static/images/home/journey6.png', text: '第六站：开始你的行动', progress: 6 },
  { icon: '../../static/images/home/journey7.png', text: '第七站：发现你的价值', progress: 7 },
])

onShow(() => {
  currProgress.value = userStore.userInfo.currProgress % 8
  curInter.value = interStore.interInfo.interId % 8
})
// 测试 uni API 自动引入
onLoad(() => {
  const currentTime = new Date().getTime()

  // userInfo.value.lockTime = new Date().getTime() + 3 * 60 * 60 * 1000 // 设置锁定时间为当前时间加3小时
  console.log('userInfo', userInfo.value)
  const leftTime = calculateHour()
  console.log('leftTime', leftTime)
  if (leftTime > 0) {
    waitingTime.value = Math.floor(leftTime) + 1
  } else {
    console.log('请求后端，更新下一站')
    waitingTime.value = 0
    checkTimeFlag.value = true
  }
})

const calculateHour = () => {
  const currentTime = new Date().getTime() + 24 * 1000 * 60 * 60
  const lockTime = userInfo.value.lockTime
  const remainingTime = (lockTime - currentTime) / (1000 * 60 * 60) // 转化为小时

  return remainingTime
}

const enterJourney = async (progress: number) => {
  uni.requestSubscribeMessage({
    tmplIds: ['kAcfm-7a4wnQ03jYBqa_rplhsYjfJXNN71MhlMGADPg'], // 模板ID
    success(res) {
      console.log('interStore.value', interStore.interInfo)
      if (userInfo.value.groupId === 1) {
        progress += 8
      }

      // 检查是否有干预记录
      if (interStore.interInfo.interId === -1) {
        console.log('没有干预记录')
        interStore.clearInternfo()
        globalPageControl.clearInternfo()
        const numberStr = progress.toString()

        uni.redirectTo({
          url: '/pages/journey_common/start_journey?progress=' + encodeURIComponent(numberStr),
        })
        // 如果不是导入，跳转到站前测量
        if (numberStr === '0' || numberStr === '1') {
          uni.redirectTo({
            url:
              '/pages/journey_common/start_journey?progress=' +
              encodeURIComponent(progress.toString()),
          })
        }
        if (numberStr !== '0' && numberStr !== '1') {
          uni.redirectTo({
            url: '/pages/inquiry/before?progress=' + encodeURIComponent(progress.toString()),
          })
        }
      } else if (interStore.interInfo.interId === progress) {
        uni.navigateTo({
          url: '/pages/journey_common/common',
        })
      } else {
        message
          .confirm({
            msg: '是否开始新的干预，这会清除上次干预缓存，建议先完成上次干预',
            title: '检测到上次其他干预未完成',
            closeOnClickModal: false,
            type: 'confirm',
          })
          .then(() => {
            console.log('进入干预')
            const numberStr = progress.toString()
            interStore.clearInternfo()
            globalPageControl.clearInternfo()
            uni.redirectTo({
              url: '/pages/journey_common/start_journey?progress=' + encodeURIComponent(numberStr),
            })
            if (numberStr === '0' || numberStr === '1') {
              uni.redirectTo({
                url:
                  '/pages/journey_common/start_journey?progress=' + encodeURIComponent(numberStr),
              })
            }
            if (numberStr !== '0' && numberStr !== '1') {
              uni.redirectTo({
                url: '/pages/inquiry/before?progress=' + encodeURIComponent(numberStr),
              })
            }
          })
          .catch(() => {
            console.log('取消')
          })
      }
    },
    fail(err) {
      console.log('fail', err)
    },
  })
}
</script>

<style>
.main-title-color {
  color: #d14328;
}
/* .bg_image {
  position: absolute;
  top:0;
  height: 200rpx;
} */

.header {
  position: fixed;
  top: 3.75rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.back-button {
  margin-right: 20px;
  font-size: 24px;
  color: #333;
  text-decoration: none;
}
.title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 15px;

  padding-top: 1.25rem;
  /* margin-top: 3rem; */
  overflow-y: scroll;
  background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6);
}
.card {
  display: flex;
  align-items: center;
  height: auto;
  padding: 15px;
  /* background-color: white; */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.card-text {
  flex: 1;
}
.intro-card {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
}
.intro-card .card-icon {
  color: #1890ff;
}
</style>
