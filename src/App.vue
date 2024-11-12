<script setup lang="ts">
import { onLaunch, onShow, onHide, onExit } from '@dcloudio/uni-app'
import { useUserStore } from './store'
import { url } from '@/interceptors/request'

const userStore = useUserStore()
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
  // 如果是已登陆状态 建立连接
  if (userStore.userInfo.userId !== '1') {
    uni.connectSocket({
      url: `wss://${url}/websocket/` + userStore.userInfo.userId,
      success: () => {
        console.log('websocket connect success')
      },
      fail: () => {
        console.log('websocket connect fail')
      },
    })
    uni.onSocketOpen((res) => {
      console.log('websocket open')
    })
    uni.onSocketError((res) => {
      console.log('websocket open error')
    })
  }
})
onHide(() => {
  console.log('App Hide')
  uni.closeSocket({
    success: (res) => {
      console.info('websocket close success')
    },
    fail: (res) => {
      console.info('websocket close fail')
    },
  })
})
onExit(() => {
  console.log('App Exit')
  uni.closeSocket({
    success: (res) => {
      console.info('websocket close success')
    },
    fail: (res) => {
      console.info('websocket close fail')
    },
  })
})
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
