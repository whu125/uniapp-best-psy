<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '打卡',
  },
}
</route>
<template>
  <view class="" w-full h-full>
    <wd-navbar fixed safeAreaInsetTop title="打卡彩蛋"></wd-navbar>

    <view class="con px-2">
      <view style="height: 15%"></view>
      <text class="title">这一站旅程你的体验感如何？</text>
      <text class="subtitle">请根据你的真实感受进行评分！</text>

      <view class="rating-box">
        <view class="rating-item">
          <text class="rating-label">体验感</text>
          <text class="rating-desc ml-2">1代表"不好"，10代表"非常好"</text>
          <view class="">
            <wd-slider v-model="tiyan" min="0" max="10" />
          </view>
        </view>

        <view class="rating-item">
          <text class="rating-label">收获度</text>
          <text class="rating-desc ml-2">1代表"没有收获"，10代表"很有收获"</text>
          <view class="">
            <wd-slider v-model="shouhuo" min="0" max="10" />
          </view>
        </view>
      </view>

      <view class="helpful-box">
        <text class="helpful-title">本章对你最有帮助的部分有（可多选）：</text>
        <view class="helpful-options">
          <view
            class="option-item"
            v-for="(item, index) in helpfulOptions"
            :key="index"
            :class="{ selected: selectedOptions.includes(item) }"
            @click="toggleOption(item)"
          >
            {{ item }}
          </view>
        </view>
        <view v-if="selectedOptions.includes('其他......')" class="">
          <wd-input v-model="helpText" placeholder="请输入其他对你最有帮助的部分" />
        </view>
      </view>

      <text class="footer-text">3天后，我们将开启下一段旅程，敬请期待......</text>

      <wd-button type="success" size="large" @click="submit">返回主地图</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()
const tiyan = ref(9)
const shouhuo = ref(9)
const helpfulOptions = ref([
  '认识到想法影响情绪',
  '对自动思维的探索',
  '识别自动思维的练习',
  '学习认知解离的练习',
  '其他......',
])

const selectedOptions = ref([])
const helpText = ref('')

const toggleOption = (item: string) => {
  if (selectedOptions.value.includes(item)) {
    selectedOptions.value = selectedOptions.value.filter((option) => option !== item)
  } else {
    selectedOptions.value.push(item)
  }
  console.log(selectedOptions.value)
}

const submit = () => {
  if (helpText.value.trim() !== '') {
    const otherIndex = selectedOptions.value.indexOf('其他......')
    if (otherIndex !== -1) {
      selectedOptions.value.splice(otherIndex, 1, helpText.value.trim())
    } else {
      selectedOptions.value.push(helpText.value.trim())
    }
  }
  const help = selectedOptions.value.join('、')
  console.log(help)
  console.log('提交的数据:', {
    tiyan: tiyan.value,
    shouhuo: shouhuo.value,
    help,
  })
  uni.redirectTo({ url: '/pages/home/home' })
}
</script>

<style>
.con {
  display: flex;
  flex: 1;
  flex-direction: column;
  /* gap: 15px; */
  height: 100vh;
  overflow: hidden;
  /* padding-top: 1.25rem;
  margin-top: 3rem; */
  /* overflow-y: scroll; */
  background: linear-gradient(90deg, rgba(171, 236, 214, 0.29) 0%, rgba(251, 237, 150, 0.29) 100%);
}

.container {
  padding: 20px;
  background-color: #f0f8ff;
}

.title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.subtitle {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.rating-box {
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
}

.rating-item {
  margin-bottom: 15px;
}

.rating-label {
  font-size: 16px;
  font-weight: bold;
}

.rating-desc {
  margin-top: 5px;
  font-size: 12px;
  color: #999;
}

.stars {
  display: flex;
  margin-top: 5px;
}

.rating-score {
  margin-top: 5px;
  font-size: 14px;
  color: #666;
}

.helpful-box {
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
}

.helpful-title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}

.helpful-options {
  display: flex;
  flex-wrap: wrap;
}

.option-item {
  padding: 8px 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  background-color: #f0f0f0;
  border-radius: 20px;
}

.footer-text {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.return-btn {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
}

.selected {
  color: white;
  background-color: #4caf50;
}
</style>
