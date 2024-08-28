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
    :style="{ marginTop: safeAreaInsets?.top + 30 + 'px' }"
  >
    <!-- <view>
      <wt-botton type="info">微信一键登陆</wt-botton>
      <view>
        <wd-button type="info" size="medium" @click="ToHome()">返回</wd-button>
      </view>
    </view> -->
    <wd-tabs animated>
      <block>
        <wd-tab title="登录">
          <view class="content">
            <view style="display: flex; justify-content: center; margin-top: 50px">
              <wd-img
                :width="120"
                :height="120"
                src="https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon64_appwx_logo.png"
              />
            </view>

            <view style="margin-top: 20px">
              <wd-divider>授权登录</wd-divider>
            </view>

            <view style="margin-top: 20px">
              <wd-button block @click="wiexinLogin" type="success">微信一键登陆</wd-button>
            </view>
          </view>
        </wd-tab>
        <wd-tab title="注册">
          <view class="content">注册页面</view>
        </wd-tab>
      </block>
    </wd-tabs>
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
        url: 'http://localhost:8081/loginByWechat',
        method: 'POST',
        data: {
          code: event.code,
        },
        success: async (res) => {
          // 获得token完成登录
          const token = res.data.data
          userStore.setUserToken(token)
          const getInfoRes = await getUserInfo(userStore.userInfo.token)
          userStore.setUserInfo(getInfoRes.data)
          userStore.setUserToken(token)
          console.log('-----------------userinfo------------------')
          console.log(userStore.userInfo)
          console.log(userStore.userInfo.token)
          ToHome()
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
</style>
