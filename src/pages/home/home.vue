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
  <wd-toast />
  <view class="" h-full w-full>
    <wd-navbar fixed safeAreaInsetTop title="我的旅程"></wd-navbar>

    <view class="content px-4" style="min-height: 100vh">
      <view style="height: 150rpx"></view>
      <view class="h-40 w-full">
        <image src="http://115.159.83.61:9000/home/home.png" mode="scaleToFill" />
      </view>
      <!-- <view v-if="loadingSocket">获取进度中....</view> -->
      <view>
        <view class="card flex justify-center" v-show="curInter != -1">
          <span class="font-800 text-2xl">正在完成</span>
          <view v-show="curInter == 0">
            <span class="font-800 text-2xl ml-4">导入</span>
          </view>
          <view v-show="curInter != 0">
            <span class="font-800 text-2xl ml-4">第 {{ curInter }} 站</span>
          </view>
        </view>
        <view class="card flex justify-center" v-show="waitingTime > 0">
          <span class="font-800 text-xl">剩余 {{ waitingTime }} 小时 解锁</span>
          <span class="font-800 text-xl ml-4">第 {{ currProgress }} 站</span>
        </view>
        <view class="card flex justify-center" v-show="waitingTime <= 0">
          <view v-show="currProgress != 0 && currProgress != 999">
            <span class="font-800 text-xl">已解锁 第 {{ currProgress }} 站</span>
          </view>
          <view v-show="currProgress == 0">
            <span class="font-800 text-xl">已解锁 导入</span>
          </view>
          <!-- <span class="font-800 text-xl ml-4">下一站</span> -->
        </view>

        <view v-if="curGroupId !== 2">
          <view class="card" v-for="(journey, index) in journeySteps" :key="index">
            <img class="card-icon" :src="journey.icon" />
            <view class="card-text">{{ journey.text }}</view>
            <!-- 体验版 -->
            <!-- <img
            style="width: 60rpx; height: 60rpx"
            mode="aspectFit"
            src="http://115.159.83.61:9000/home/icon/finish.png"
          /> -->

            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="http://115.159.83.61:9000/home/icon/finish.png"
              v-show="currProgress > journey.progress"
              @click="enterJourney(journey.progress)"
            />
            <image
              style="width: 60rpx; height: 60rpx"
              mode="aspectFit"
              src="http://115.159.83.61:9000/home/icon/startJourney.png"
              v-show="currProgress == journey.progress && waitingTime <= 0"
              @click="enterJourney(journey.progress)"
            />
            <image
              style="width: 60rpx; height: 60rpx"
              src="http://115.159.83.61:9000/home/icon/lockJourney.png"
              mode="aspectFit"
              v-show="currProgress == journey.progress && waitingTime > 0"
            />
            <image
              style="width: 60rpx; height: 60rpx"
              src="http://115.159.83.61:9000/home/icon/lockJourney.png"
              mode="aspectFit"
              v-show="currProgress < journey.progress"
            />
          </view>
        </view>

        <view v-if="curGroupId === 2">
          <p>抱歉，您不属于实验对象，请联系相关负责人</p>
        </view>
        <view style="height: 150rpx"></view>
      </view>
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
import { url } from '@/interceptors/request'
import Success from '../inquiry/success.vue'

defineOptions({
  name: 'Home',
})

uni.hideTabBar()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const curGroupId = ref()
const userStore = useUserStore()
const message = useMessage()
const toast = useToast()
const interStore = useInterStore()
const globalPageControl = useGlobalPageControlStore()
// const userInfo = ref<IUserInfo>(userStore.userInfo)
// const currProgress = ref<number>(2)
const currProgress = ref<number>(0)
const curInter = ref<number>(interStore.interInfo.interId % 8)
// const checkTimeFlag = ref(false)
// const checkTimeFlag = ref(true)
const waitingTime = ref(0)
const journeySteps = ref([])
const loadingSocket = ref(true)
const journeySteps0 = ref([
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey0.png',
    text: '导入：开启你的旅程',
    progress: 0,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey1.png',
    text: '第一站：认识你的情绪',
    progress: 1,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey2.png',
    text: '第二站：观察你的思维',
    progress: 2,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey3.png',
    text: '第三站：回到此时此刻',
    progress: 3,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey4.png',
    text: '第四站：面对你的痛苦',
    progress: 4,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey5.png',
    text: '第五站：接纳当下的你',
    progress: 5,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey6.png',
    text: '第六站：开始你的行动',
    progress: 6,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey7.png',
    text: '第七站：发现你的价值',
    progress: 7,
  },
])
const journeySteps1 = ref([
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey0.png',
    text: '导入：开启你的旅程',
    progress: 0,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey1.png',
    text: '第一站：认识情绪困扰',
    progress: 1,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey2.png',
    text: '第二站：探索情绪源头',
    progress: 2,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey3.png',
    text: '第三站：调整消极认知',
    progress: 3,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey4.png',
    text: '第四站：情绪调节驿站',
    progress: 4,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey5.png',
    text: '第五站：寻找社会支持',
    progress: 5,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey6.png',
    text: '第六站：探索幸福之路',
    progress: 6,
  },
  {
    icon: 'http://115.159.83.61:9000/home/icon/journey7.png',
    text: '第七站：自我关怀指南',
    progress: 7,
  },
])
const finishFlag = ref(false) // 记录是否是完成干预后跳转过来的

onMounted(() => {
  console.log('loadingSocket', loadingSocket.value)
  // 需要有5s建立连接
  toast.loading('请求进度中...')
  setTimeout(() => {
    loadingSocket.value = false
    toast.close()
  }, 5000)
})

onShow(() => {
  currProgress.value = userStore.userInfo.currProgress % 8
  curInter.value = interStore.interInfo.interId % 8
  curGroupId.value = userStore.userInfo.groupId
  if (curGroupId.value === 0) {
    journeySteps.value = journeySteps0.value
  } else if (curGroupId.value === 1) {
    journeySteps.value = journeySteps1.value
  }

  // 判断前端有无连接
  if (JSON.stringify(userStore.websocket) === '{}' && userStore.userInfo.userId !== '1') {
    // 已登录情况下无 websocket 连接 进行重连
    console.log('websocket empty')
    // 建立 websocket 连接
    userStore.websocket = uni.connectSocket({
      url: `wss://${url}/websocket/` + userStore.userInfo.userId,
      success: () => {
        console.log('websocket connect success')
      },
      fail: () => {
        console.log('websocket connect fail')
      },
    })
    console.log(userStore.websocket)
    userStore.websocket.onOpen((res) => {
      console.log('websocket open')
    })
    userStore.websocket.onError((res) => {
      console.log('websocket error')
    })
    userStore.websocket.onClose((res) => {
      console.log('websocket close')
    })
    // userStore.websocket.onMessage((res) => {
    //   console.log('收到服务器内容：' + res.data)
    //   // 后端 websocket 发来的数据形如 waitingTime # currProgress
    //   // userStore.websocketMsg = res.data

    //   waitingTime.value = Number(res.data.split('#')[0])
    //   userStore.userInfo.currProgress = Number(res.data.split('#')[1])
    //   currProgress.value = userStore.userInfo.currProgress % 8

    //   console.log(waitingTime.value)
    //   console.log(currProgress.value)
    // })
  } else if (JSON.stringify(userStore.websocket) !== '{}') {
    // 假如 websocket 连接失效 进行重连
    console.log('websocket not empty')
    let websocketAvailability = false
    uni.sendSocketMessage({
      data: 'test websocket',
      success: () => {
        console.log('websocket connect avail')
        websocketAvailability = true
      },
      fail: () => {
        console.log('websocket connect unavail')
      },
    })
    if (websocketAvailability === false) {
      // 建立 websocket 连接
      userStore.websocket = uni.connectSocket({
        url: `wss://${url}/websocket/` + userStore.userInfo.userId,
        success: () => {
          console.log('websocket connect success')
        },
        fail: () => {
          console.log('websocket connect fail')
        },
      })
      console.log(userStore.websocket)
      userStore.websocket.onOpen((res) => {
        console.log('websocket open')
      })
      userStore.websocket.onError((res) => {
        console.log('websocket error')
      })
      userStore.websocket.onClose((res) => {
        console.log('websocket close')
      })
      // userStore.websocket.onMessage((res) => {
      //   console.log('收到服务器内容：' + res.data)
      //   // 后端 websocket 发来的数据形如 waitingTime # currProgress
      //   // userStore.websocketMsg = res.data
      //   waitingTime.value = Number(res.data.split('#')[0])
      //   userStore.userInfo.currProgress = Number(res.data.split('#')[1])
      //   currProgress.value = userStore.userInfo.currProgress % 8
      // })
    }
  }
  uni.onSocketMessage((res) => {
    console.log('收到服务器内容：' + res.data)
    // 后端 websocket 发来的数据形如 waitingTime # currProgress
    waitingTime.value = Number(res.data.split('#')[0])
    userStore.userInfo.currProgress = Number(res.data.split('#')[1])
    currProgress.value = userStore.userInfo.currProgress % 8
  })
})

// uni.onSocketMessage((res) => {
//   console.log('收到服务器内容：' + res.data)
//   // 后端 websocket 发来的数据形如 waitingTime # currProgress
//   waitingTime.value = Number(res.data.split('#')[0])
//   userStore.userInfo.currProgress = Number(res.data.split('#')[1])
//   currProgress.value = userStore.userInfo.currProgress % 8
// })

const calculateHour = () => {
  // 这个函数应该用不到了
  const currentTime = new Date().getTime()
  const lockTime = userStore.userInfo.lockTime
  const remainingTime = (lockTime - currentTime) / (1000 * 60 * 60) // 转化为小时
  return remainingTime
}

const enterJourney = async (progress: number) => {
  uni.requestSubscribeMessage({
    tmplIds: ['kAcfm-7a4wnQ03jYBqa_rplhsYjfJXNN71MhlMGADPg'], // 模板ID
    success(res) {
      console.log('interStore.value', interStore.interInfo)
      if (curGroupId.value === 1) {
        console.log('第二套，对照组')
        progress += 8
      }

      // 检查是否有干预记录
      if (interStore.interInfo.interId === -1) {
        console.log('没有干预记录')
        interStore.clearInternfo()
        globalPageControl.clearInternfo()

        const numberStr = progress.toString()
        console.log('numberStr', numberStr)

        // uni.redirectTo({
        //   url: '/pages/journey_common/start_journey?progress=' + encodeURIComponent(numberStr),
        // })
        // 如果不是导入，跳转到站前测量
        if (numberStr === '0' || numberStr === '1' || numberStr === '8' || numberStr === '9') {
          uni.redirectTo({
            url:
              '/pages/journey_common/start_journey?progress=' +
              encodeURIComponent(progress.toString()),
          })
        }
        if (numberStr !== '0' && numberStr !== '1' && numberStr !== '8' && numberStr !== '9') {
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
            // uni.redirectTo({
            //   url: '/pages/journey_common/start_journey?progress=' + encodeURIComponent(numberStr),
            // })
            if (numberStr === '0' || numberStr === '1' || numberStr === '8' || numberStr === '9') {
              uni.redirectTo({
                url:
                  '/pages/journey_common/start_journey?progress=' +
                  encodeURIComponent(progress.toString()),
              })
            }
            if (numberStr !== '0' && numberStr !== '1' && numberStr !== '8' && numberStr !== '9') {
              uni.redirectTo({
                url: '/pages/inquiry/before?progress=' + encodeURIComponent(progress.toString()),
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
  gap: 40rpx;

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
  margin-bottom: 20rpx;
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
