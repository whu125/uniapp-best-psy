<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'login',
  },
}
</route>
<template>
  <view class="container">
    <p class="title">用户协议</p>
    <view class="content">
      <p>
        武汉次元科技有限公司（以下简称"我们"）依据本协议为用户（以下简称"你"）提供心旅奇遇服务。本协议对你和我们均具有法律约束力。
      </p>
      <p class="section">一、本服务的功能</p>
      <p>你可以使用本服务进行自主化心理干预。</p>
      <p class="section">二、责任范围及限制</p>
      <p>你使用本服务得到的结果仅供参考，实际情况以官方为准。</p>
      <p class="section">三、隐私保护</p>
      <p>
        我们重视对你隐私的保护，你的个人隐私信息将根据《隐私政策》受到保护与规范，详情请参阅《隐私政策》。
      </p>
      <p class="section">四、其他条款</p>
      <p>4.1 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
      <p>4.2 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
    </view>
    <button class="confirm-button" @click="confirmAgreement">确认</button>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    confirmAgreement() {
      // 这里可以加入确认逻辑，比如跳转到下一个页面
      uni.showToast({
        title: '协议已确认',
        icon: 'success',
      })
    },
  },
}
</script>

<style>
.container {
  /* padding: 20px; */
  width: 95%;
  padding-left: 20rpx;
  margin-top: 200rpx;
}
.title {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
}
.content {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}
.section {
  margin-top: 10px;
  font-weight: bold;
}
.confirm-button {
  width: 80%;
  padding: 5px;
  color: #fff;
  text-align: center;
  background-color: #007aff;
  border-radius: 5px;
}
</style>
