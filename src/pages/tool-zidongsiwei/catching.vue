<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '导览',
  },
}
</route>
<template>
  <view class="" w-full h-full>
    <wd-navbar fixed safeAreaInsetTop title="自动思维" left-arrow @click-left="goBack"></wd-navbar>

    <!-- 第一步 -->
    <view class="main-container" v-show="currIndex === 0">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey2/renwu7.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">回想你最近情绪不佳的一个时刻，那时候发生了什么？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="content1" placeholder="什么时候，什么地点，发生了什么事情?" />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">你有什么样的感受？</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="content2"
            placeholder="情绪是什么样的？沮丧，自责，失去希望，焦虑，生气……"
          />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">背后的自动思维是什么？</view>
        <view style="margin-top: 5px">
          <wd-textarea
            v-model="content3"
            placeholder="仔细想想，之所以有上面的感受，是因为产生了什么与自己有关的想法或解释？，你可以用“我是……的”为开头，来描述自动思维"
          />
        </view>
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 15px">产生了什么后续影响？</view>
        <view style="margin-top: 5px">
          <wd-textarea v-model="content4" placeholder="有什么行为结果或后续影响？" />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一步</view>
      </view>
    </view>

    <!-- 第二步 -->
    <view class="main-container" v-show="currIndex === 1">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey2/renwu8.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 5px">
          <wd-textarea v-model="content5" placeholder="..." />
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一步</view>
      </view>
    </view>

    <!-- 第三步 -->
    <view class="main-container" v-show="currIndex === 2">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/journey2/renwu9.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area">
        <view class="select-btns">
          <view
            v-for="(monster, index) in selectUrls"
            :key="index"
            class="select-btn"
            :class="{ selected: selectedItem === index }"
            @click="selectItem(index)"
          >
            <image :src="monster" mode="aspectFit" style="width: 100%" />
          </view>
        </view>
      </view>
      <view @click="toNext" class="operation-area">
        <img src="http://115.159.83.61:9000/common/next.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">下一步</view>
      </view>
    </view>

    <!-- 第四步 -->
    <view class="main-container" v-show="currIndex === 1">
      <view style="height: 15%"></view>
      <view class="middle-img-input">
        <image
          src="http://115.159.83.61:9000/tool/zidongsiwei/step4.png"
          mode="widthFix"
          style="width: 100%"
        />
      </view>
      <view class="input-area px-2">
        <view style="margin-top: 5px">
          <wd-textarea v-model="content6" placeholder="..." />
        </view>
      </view>
      <view @click="submit" class="operation-area">
        <img src="http://115.159.83.61:9000/common/finish.png" style="width: 50px; height: 50px" />
        <view style="width: 100%; font-size: 18px; text-align: center">完成，存入封印册！</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const currIndex = ref<number>(0)
const selectUrls = ref([
  'http://115.159.83.61:9000/journey2/renwu10.png',
  'http://115.159.83.61:9000/journey2/renwu11.png',
  'http://115.159.83.61:9000/journey2/renwu12.png',
  'http://115.159.83.61:9000/journey2/renwu13.png',
  'http://115.159.83.61:9000/journey2/renwu14.png',
  'http://115.159.83.61:9000/journey2/renwu18.png',
  'http://115.159.83.61:9000/journey2/renwu19.png',
  'http://115.159.83.61:9000/journey2/renwu20.png',
  'http://115.159.83.61:9000/journey2/renwu21.png',
  'http://115.159.83.61:9000/journey2/renwu22.png',
])
const selectedItem = ref<number>()
const content1 = ref<string>('')
const content2 = ref<string>('')
const content3 = ref<string>('')
const content4 = ref<string>('')
const content5 = ref<string>('')
const content6 = ref<string>('')

const selectItem = (index) => {
  selectedItem.value = index
}
const toNext = () => {
  currIndex.value = currIndex.value + 1
}
const goBack = () => {
  uni.navigateBack()
}
const submit = () => {
  const res =
    content1.value +
    '%' +
    content2.value +
    '%' +
    content3.value +
    '%' +
    content4.value +
    '%' +
    content5.value +
    '%' +
    selectUrls.value[selectedItem.value] +
    '%' +
    content6.value

  console.log(res)
  uni.redirectTo({
    url: '/pages/tool-zidongsiwei/zidongsiwei',
  })
}
</script>

<style>
.main-container {
  box-sizing: content-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(to bottom right, #e6f7ff, #fffbe6);
}

.middle-img-input {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  /* margin-top: 30rpx; */
  /* padding: 10px; */
}

.input-area {
  width: 100%;
  height: auto;
}

.operation-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 15px 0 20px 0;
}

.select-btns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  overflow-x: hidden;
}
.select-btn {
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  opacity: 0.6;
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.select-btn:hover,
.select-btn.selected {
  opacity: 1;
  transform: scale(1.1);
}
.select-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
