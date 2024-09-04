<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '工具箱',
  },
  // needLogin: true,
}
</route>
<template>
  <tabbar selected="1"></tabbar>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar title="工具箱"></wd-navbar>
    <view class="main-container">
      <view>
        <img src="../../static/images/tool/tool_logo.png" style="width: 200px; height: 200px" />
      </view>

      <view class="card-container">
        <view
          class="card"
          v-for="(tool, index) in toolList"
          :key="index"
          @click="ToTool(tool.toolName)"
        >
          <img class="img" :src="tool.iconUrl" />
          <view class="grid-font">{{ tool.toolName }}</view>
        </view>
      </view>
    </view>
  </view>

  <!-- <view class="text-center text-lg main-title-color">
    这是zwh写的视频测试
    <player-component id="tvp-id" playerid="tvp" vid="t3560gug9kt"></player-component>
  </view> -->
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import tabbar from '@/pages/tabbar/tabbar.vue'

defineOptions({
  name: 'tool',
})
uni.hideTabBar()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const toolList = ref([
  {
    toolName: '心情日记',
    iconUrl: '../../static/images/tool/xinqingriji.png',
  },
  {
    toolName: '能量日记',
    iconUrl: '../../static/images/tool/nengliangriji.png',
  },
  {
    toolName: '自动思维',
    iconUrl: '../../static/images/tool/zidongsiwei.png',
  },
  {
    toolName: '认知解离',
    iconUrl: '../../static/images/tool/renzhijieli.png',
  },
])

const ToTool = (toolNmae: string) => {
  if (toolNmae === '心情日记') {
    uni.navigateTo({
      url: '/pages/mood/mood',
    })
  }
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
}

.img {
  width: 45px;
  height: 45px;
}

.grid-font {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
}

.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}

.card {
  display: flex;
  align-items: center;
  width: 40%;
  height: 60px;
  padding: 10px;
  margin: 18px 0 18px 0;
  border-color: darkgrey;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgb(139, 139, 139);
}
</style>
