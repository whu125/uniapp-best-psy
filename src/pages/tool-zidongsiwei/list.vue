<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view class="" w-full h-full>
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="自动思维"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></wd-navbar>
    <view class="main-container">
      <view v-for="(siwei, index) in siweiList" :key="index">
        <view class="box" @click="selectSiWei(index)">
          <image :src="siwei.icon" style="width: 45px; height: 45px" />
          <view class="text-area">
            <view style="font-size: 16px; color: gray">{{ siwei.date }}</view>
            <view style="font-size: 20px; font-weight: bold">{{ siwei.title }}</view>
          </view>
          <image
            src="http://115.159.83.61:9000/tool/tool-list.png"
            style="width: 45px; height: 45px"
          />
        </view>
      </view>
    </view>

    <view style="height: 10rpx"></view>
  </view>
</template>

<script lang="ts" setup>
const siweiList = ref([
  {
    icon: 'http://115.159.83.61:9000/journey2/renwu22.png',
    date: '8月15日',
    title: '焦虑兔子',
    text: [
      '例会中突然接到一个紧急任务，我之前没有接触过，对我来说有点难',
      '担心、焦虑、压力好大',
      '这对我来说太难了，时间又紧，我肯定做不好，而且会在这个过程中崩溃的',
      '失眠、拖延、无法集中注意力、超级焦虑',
      '当我在非常担心一件事的时候，焦虑兔子就会告诉我“你肯定会搞砸”，所以，我可以在下次感到焦虑的时候，先看看是否是焦虑兔子作祟',
    ],
  },
  {
    icon: 'http://115.159.83.61:9000/journey2/renwu21.png',
    date: '8月15日',
    title: '焦虑兔子',
    text: [
      '例会中突然接到一个紧急任务，我之前没有接触过，对我来说有点难',
      '担心、焦虑、压力好大',
      '这对我来说太难了，时间又紧，我肯定做不好，而且会在这个过程中崩溃的',
      '失眠、拖延、无法集中注意力、超级焦虑',
      '当我在非常担心一件事的时候，焦虑兔子就会告诉我“你肯定会搞砸”，所以，我可以在下次感到焦虑的时候，先看看是否是焦虑兔子作祟',
    ],
  },
  { icon: 'http://115.159.83.61:9000/journey2/renwu20.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu20.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu19.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu22.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu21.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu20.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu20.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu19.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu22.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu21.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu20.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu20.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu19.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu22.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu21.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu20.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu20.png', date: '8月15日', title: '焦虑兔子' },
  { icon: 'http://115.159.83.61:9000/journey2/renwu19.png', date: '8月15日', title: '焦虑兔子' },
])
const goBack = () => {
  uni.navigateBack()
}
const selectSiWei = (index: number) => {
  const detailObject = encodeURIComponent(JSON.stringify(siweiList.value[index]))
  uni.navigateTo({
    url: `/pages/tool-zidongsiwei/siweiDetail?detail=${detailObject}`,
  })
}
</script>

<style>
.main-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.box {
  box-sizing: content-box;
  display: flex;
  justify-content: space-evenly;
  width: 85%;
  height: auto;
  padding: 12px;
  margin: 15px auto;
  border-radius: 20px;
  box-shadow: 0px 0px 8px gray;
}

.text-area {
  display: flex;
  flex-direction: column;
}
</style>
