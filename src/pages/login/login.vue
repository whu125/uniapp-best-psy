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
      <wd-toast />
      <!-- <h1 class="title">
        <span>每一刻</span>
        <span>悦心相伴</span>
      </h1>
      <h2 class="subtitle">MindEase</h2> -->

      <div class="buttons">
        <!-- <wd-button type="info" class="login-btn counselor">咨询师登录</wd-button>
        <wd-button type="info" class="login-btn user">用户登录</wd-button> -->

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

        <wd-button type="info" size="large" open-type="getPhoneNumber" @getphonenumber="adminLogin">
          咨询师登录
        </wd-button>
      </div>

      <div class="agreement">
        <wd-checkbox
          v-model="agreed"
          @change="handleAgreementChange"
          style="width: 20px"
        ></wd-checkbox>
        <view class="c-white">
          同意
          <span
            @click="showRule"
            style="
              color: skyblue; /* 文字颜色设置为蓝色 */
              text-decoration: underline; /* 下划线效果 */
              cursor: pointer;
            "
          >
            用户协议
          </span>
          <span>、</span>
          <span
            @click="showPrivacy"
            style="
              color: skyblue; /* 文字颜色设置为蓝色 */
              text-decoration: underline; /* 下划线效果 */
              cursor: pointer;
            "
          >
            隐私协议
          </span>
        </view>
      </div>

      <!-- <p class="note">注：该小程序非商业应用，仅为科学研究使用，用户为参与研究人员，请勿转载</p> -->
    </div>
  </div>
  <wd-message-box></wd-message-box>
  <!-- <wd-button @click="alert">alert</wd-button> -->
</template>

<script setup>
import PLATFORM from '@/utils/platform'
import { useMessage, useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { useInterStore } from '@/store/inter'
import { useGlobalPageControlStore } from '@/store/globalPageControl'
import { getUserInfo, getPhoneNumberApi, evalRole, setRole } from '@/service/index/user'
import { url } from '@/interceptors/request'

const toast = useToast()
const phonecode = ref('')
const message = useMessage()

const agreed = ref(false)
const ruleFlag = ref(false)
const passwd = ref()
defineOptions({
  name: 'login',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()
const interStore = useInterStore()
const globalPageControl = useGlobalPageControlStore()

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}

const loginInfo = ref({
  wechatId: null,
  wechatPassword: null,
})

// const openid = ref()
const check = () => {
  message.alert('请先同意用户协议、隐私协议')
}

const showPrivacy = () => {
  ruleFlag.value = true
  uni.navigateTo({
    url: '/pages/login/privacyRule',
  })
}

const showRule = () => {
  ruleFlag.value = true
  uni.navigateTo({
    url: '/pages/login/userRule',
  })
  //   message.alert({
  //     msg: `
  // 武汉次元科技有限公司（以下简称"我们"）依据本协议为用户（以下简称"你"）提供心旅奇遇服务。本协议对你和我们均具有法律约束力。\n
  // 一、本服务的功能\n
  // 你可以使用本服务进行自主化心理干预。\n
  // 二、责任范围及限制\n
  // 你使用本服务得到的结果仅供参考，实际情况以官方为准。\n
  // 三、隐私保护\n
  // 我们重视对你隐私的保护，你的个人隐私信息将根据《隐私政策》受到保护与规范，详情请参阅《隐私政策》。\n
  // 四、其他条款\n
  // 4.1 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。\n
  // 4.2 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。\n

  // `,
  //     title: '用户协议',
  //   })
}

const loginApi = async () => {
  toast.loading('登录中...')
  const res = await weixinLogin()

  await new Promise((resolve) => setTimeout(resolve, 2000))
  // todo:如果点了拒绝

  const openid = userStore.userInfo.userId
  const code = phonecode.value

  getPhoneNumberApi(openid, code).then(async (res2) => {
    // 服务端获取手机号
    console.log('res2', res2)
    toast.close()
    if (res2.code === 200) {
      // 更改role

      await setRole('admin')
      userStore.setRole('admin')

      toast.success('登录成功')
      // 判断是否是第一次登录
      if (res2.data === true) {
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
}

const adminLogin = (e) => {
  phonecode.value = e.code
  console.log('phonecode', phonecode.value)
  message
    .prompt({
      title: '请输入密钥',
      inputValue: passwd.value,
    })
    .then(async (resp) => {
      // 向后端发送验证
      const res = await evalRole(resp.value)
      console.log(res)
      if (res.code === 200) {
        if (res.data === 1) {
          loginApi()
        } else {
          message.alert('密钥错误')
        }
      }
    })
    .catch((error) => {
      console.log(error)
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
    if (res2.code === 200) {
      uni.showToast({
        title: '登录成功',
      })

      // 重新设置groupId
      userStore.setGroupId(res2.data.groupId)

      // 判断是否是第一次登录
      if (res2.data.firstLogin === true) {
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
}

const weixinLogin = async () => {
  console.log('weixin login')
  userStore.clearUserInfo()
  uni.login({
    provider: 'weixin',
    onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      // 客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      uni.request({
        url: 'https://mindease.online:28081/loginByWechat',
        // url: 'https://localhost:443/loginByWechat',
        method: 'POST',
        data: {
          code: event.code,
        },
        success: async (res) => {
          console.log('res', res)
          interStore.clearInternfo()
          globalPageControl.clearInternfo()
          // 获得token完成登录
          const token = res.data.data
          userStore.setUserToken(token)
          const getInfoRes = await getUserInfo()
          console.log(getInfoRes)
          userStore.setUserInfo(getInfoRes.data)
          userStore.setUserToken(token)
          console.log('-----------------userinfo------------------')
          console.log(userStore.userInfo)
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
  background-image: url('http://115.159.83.61:9000/common/login-bg.png');
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
  /* background: rgba(255, 255, 255, 0.3); */
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
  gap: 20px;
  width: 80%;
  max-width: 300px;
  transform: translateY(150rpx);
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
  display: flex;
  margin-top: 20px;
  font-size: 14px;
  transform: translateY(150rpx);
}

.note {
  position: absolute;
  bottom: 20px;
  padding: 0 20px;
  font-size: 12px;
  color: #666;
  text-align: center;
}

.login-btn {
  width: 150rpx;
}
</style>
