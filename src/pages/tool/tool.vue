<!--
 * @Author: wenhao zhang zhangwenhao@answerai.pro
 * @Date: 2024-08-12 11:12:02
 * @LastEditors: wenhao zhang zhangwenhao@answerai.pro
 * @LastEditTime: 2024-08-15 21:46:21
 * @FilePath: /my-project/src/pages/tool/tool.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '工具箱',
  },
  needLogin: true,
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    工具
  </view>

  <view class="text-center text-lg main-title-color">
    这是zwh写的视频测试

    <player-component id="tvp-id" playerid="tvp" vid="t3560gug9kt">
      <!-- 里面可以放插槽 -->
    </player-component>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'tool',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
