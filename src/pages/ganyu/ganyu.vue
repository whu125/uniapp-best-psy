<!--
 * @Author: wenhao zhang zhangwenhao@answerai.pro
 * @Date: 2024-08-12 11:12:02
 * @LastEditors: wenhao zhang zhangwenhao@answerai.pro
 * @LastEditTime: 2024-08-19 00:12:50
 * @FilePath: /my-project/src/pages/ganyu/ganyu.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '干预测试',
  },
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    工具
  </view>

  <view>
    <wd-button type="info" size="medium" @click="ToHome()">返回</wd-button>
  </view>

  <!-- 根据全局状态判断是问卷还是干预 -->
  <view>
    <view v-for="(question, index) in questions" :key="question.id">
      <!-- 显示题目标题 -->
      <h3>{{ index + 1 }}. {{ question.title }}</h3>

      <!-- 生成对应的单选框组 -->
      <wd-radio-group v-model="value" inline shape="button">
        <wd-radio v-for="option in question.options" :key="option.value" :value="option.value">
          {{ option.text }}
        </wd-radio>
      </wd-radio-group>

      <view>
        <wd-button type="info" size="medium" @click="ToHome()">下一页</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'tool',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const ToHome = () => {
  uni.switchTab({ url: '/pages/home/home' })
}
const value = ref()
const answers = ref([])
const questions = ref([
  {
    id: 1,
    title: '你喜欢什么颜色？',
    options: [
      { value: 'a', text: '红色' },
      { value: 'b', text: '蓝色' },
      { value: 'c', text: '黄色' },
      { value: 'd', text: '绿色' },
    ],
  },
  {
    id: 2,
    title: '你喜欢什么水果？',
    options: [
      { value: 'a', text: '苹果' },
      { value: 'b', text: '香蕉' },
    ],
  },
])
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
