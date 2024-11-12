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
    <p class="title">隐私政策</p>
    <p class="date">更新日期：2024/11/12</p>
    <p class="date">生效日期：2024/11/12</p>

    <view class="content">
      <p class="section-title">导言</p>
      <p>
        “悦心一刻”是一款由武汉次元科技有限公司（以下简称"我们"）提供的产品。您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存和分享这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。本《隐私政策》与您所使用的“悦心一刻”服务息息相关，希望您仔细阅读，在需要时，按照本《隐私政策》的指引，做出您认为适当的选择。本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，并提供进一步说明的链接，以便您的理解。
      </p>
      <p>
        您使用或继续使用我们的服务，即意味着同意我们按照本《隐私政策》收集、使用、储存和分享您的相关信息。
      </p>
      <p>如对本《隐私政策》或相关事宜有任何问题，请通过zhaoziyizy@126.com与我们联系。</p>

      <p class="section-title">1. 我们收集的信息</p>
      <p>
        我们或我们的第三方合作伙伴提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。
      </p>
      <p>
        1.1 个人信息，您在注册账户或使用我们的服务时，向我们提供的相关个人信息，例如电话号码等。
      </p>
      <p>
        1.2
        日志信息，指您使用我们的服务时，系统可能通过cookies、标识符及相关技术收集的信息包括您的设备信息、浏览信息、点击信息，并将该等信息储存为日志信息，为您提供个性化的用户体验、保障服务安全。您可以通过浏览器设置拒绝或管理cookie、标识符或相关技术的使用。
      </p>

      <p class="section-title">2. 信息的存储</p>
      <p>2.1 信息存储的方式和期限</p>
      <p>
        我们会通过安全的方式存储您的信息，包括本地存储（例如利用APP进行数据缓存）、数据库和服务器日志。一般情况下，我们只会在为实现服务目的所必需的时间内或法律法规规定的条件下存储您的个人信息。
      </p>
      <p>2.2 信息存储的地域</p>
      <p>
        我们会按照法律法规规定将境内收集的用户个人信息存储于中国境内。目前我们不会跨境传输或存储您的个人信息。将来如需跨境传输或存储的我们会向您告知信息出境的目的、接收方、安全保证措施和安全风险，并征得您的同意。
      </p>
      <p>2.3 产品或服务停止运营时的通知</p>
      <p>
        当我们的产品或服务发生停止运营的情况时，我们将以推送通知、公告等形式通知您，并在合理期限内删除您的个人信息或进行匿名化处理，法律法规另有规定的除外。
      </p>

      <p class="section-title">3. 信息安全</p>
      <p>
        我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用加密技术（例如SSL）来保护您提供的个人信息。但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。
      </p>

      <!-- 继续添加其余条款内容 -->
    </view>

    <button class="confirm-button" @click="confirmAgreement">确认</button>
  </view>
</template>

<script>
export default {
  methods: {
    confirmAgreement() {
      // 这里可以加入确认逻辑，比如跳转到下一个页面
      uni.showToast({
        title: '隐私政策已确认',
        icon: 'success',
      })
    },
  },
}
</script>

<style>
.container {
  width: 95%;
  padding-left: 20rpx;
  margin-top: 200rpx;
}
.title {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
}
.date {
  font-size: 14px;
  color: #666;
}
.content {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}
.section-title {
  margin-top: 10px;
  font-weight: bold;
}
.confirm-button {
  width: 80%;

  color: #fff;
  text-align: center;
  background-color: #007aff;
  border-radius: 5px;
}
</style>
