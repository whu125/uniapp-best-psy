<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'login',
  },
}
</route>
<template>
  <div class="app-container">
    <div class="content">
      <h1 class="title">
        <span>每一刻</span>
        <span>悦心相伴</span>
      </h1>
      <h2 class="subtitle">MindEase</h2>

      <div class="buttons">
        <!-- <wd-button type="info" class="login-btn counselor">咨询师登录</wd-button>
        <wd-button type="info" class="login-btn user">用户登录</wd-button> -->
        <wd-button type="info" size="large" @click="adminLogin()">咨询师登录</wd-button>
        <view v-show="agreed" class="flex">
          <wd-button
            type="info"
            size="large"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
          >
            用户登录
          </wd-button>
        </view>
        <view v-show="!agreed" class="flex">
          <wd-button type="info" size="large" clickable="false" @click="check()">
            用户登录
          </wd-button>
        </view>
      </div>

      <div class="agreement">
        <wd-checkbox v-model="agreed" @change="handleAgreementChange">
          同意用户协议、隐私协议
        </wd-checkbox>
      </div>

      <p class="note">注：该小程序非商业应用，仅为科学研究使用，用户为参与研究人员，请勿转载</p>
    </div>
  </div>
  <!-- <wd-message-box></wd-message-box> -->
  <!-- <wd-button @click="alert">alert</wd-button> -->
</template>

<script setup>
import PLATFORM from '@/utils/platform'
import { useMessage, useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { getUserInfo, getPhoneNumberApi } from '@/service/index/user'

const toast = useToast()

const message = useMessage()

const agreed = ref(false)

const passwd = ref()
defineOptions({
  name: 'login',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const loginInfo = ref({
  wechatId: null,
  wechatPassword: null,
})

const login = () => {
  // 实现登录逻辑
  console.log('登录123')
}

// const openid = ref()
const check = () => {
  message.alert('请先同意用户协议、隐私协议')
}
const adminLogin = () => {
  message.prompt({
    title: '请输入密钥',
    inputValue: passwd.value,
  })
}
const getPhoneNumber = async (e) => {
  if (e.errMsg === 'getPhoneNumber:fail user deny') {
    return
  }
  // 在bindgetphonenumber回调中获取code动态令牌
  toast.loading('登录中...')
  const res = await weixinLogin()

  await new Promise((resolve) => setTimeout(resolve, 2000))
  // todo:如果点了拒绝

  console.log('获取手机号的动态令牌:', e) // 动态令牌
  const openid = userStore.userInfo.userId
  const code = e.code

  getPhoneNumberApi(openid, code).then((res2) => {
    // 服务端获取手机号
    console.log('res2', res2)
    toast.close()
    if (res2.code == 200) {
      uni.showToast({
        title: '登录成功',
      })
      // 判断是否是第一次登录
      if (res2.data == true) {
        uni.navigateTo({
          url: '/pages/inquiry/first',
        })
      } else {
        ToHome()
      }
    } else {
      uni.showToast({
        title: '登录失败,请重试',
      })
    }
  })
  //   // console.log(res, '接口换取的openid')
  //   console.log('获取手机号的动态令牌:', e.detail.code) // 动态令牌
  //   getPhoneNumberFn(e.detail.code, res.openid).then((res2) => {
  //     // 服务端获取手机号
  //     if (res2.code == 0) {
  //       uni.setStorageSync('phoneNumber', res.content.phone_info.phoneNumber)
  //       uni.showToast({
  //         title: '登录成功',
  //       })
  //     }
  //   })
  // })
}

const weixinLogin = async () => {
  console.log('weixin login')
  uni.login({
    provider: 'weixin',
    onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      console.log(event)
      const { code } = event
      console.log(code)

      // 客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      uni.request({
        url: 'http://localhost:8081/loginByWechat',
        method: 'POST',
        data: {
          code: event.code,
        },
        success: async (res) => {
          console.log('res', res)
          // 获得token完成登录
          const token = res.data.data
          userStore.setUserToken(token)
          const getInfoRes = await getUserInfo(userStore.userInfo.token)
          userStore.setUserInfo(getInfoRes.data)
          userStore.setUserToken(token)
          console.log('-----------------userinfo------------------')
          console.log(userStore.userInfo)
          console.log(userStore.userInfo.token)
        },
      })
    },
    fail: function (err) {
      // 登录授权失败 err.code是错误码
      console.log(err)
    },
  })
}
const handleAgreementChange = () => {
  // console.log('agreed:', agreed.value)
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-image: url('http://115.159.83.61:9000/mindease/login.jpg');
  background-position: center;
  background-size: cover;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  font-weight: bold;
  color: #000;
}

.status-icons {
  display: flex;
  gap: 5px;
}

.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.3);
}

.title {
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

.subtitle {
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
  max-width: 300px;
}

.login-btn {
  padding: 12px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  background-color: #5f9ea0;
  border: none;
  border-radius: 5px;
}

.agreement {
  margin-top: 20px;
  font-size: 14px;
}

.note {
  position: absolute;
  bottom: 20px;
  padding: 0 20px;
  font-size: 12px;
  color: #666;
  text-align: center;
}
</style>
