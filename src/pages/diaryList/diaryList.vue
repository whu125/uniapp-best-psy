<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '心情日记',
  },
  needLogin: true,
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    w-full
    h-full
  >
    <wd-navbar
      fixed
      safeAreaInsetTop
      title="心情日记"
      left-arrow
      @click-left="handleClickLeft"
    ></wd-navbar>
    <view class="main-container" v-for="(diary, index) in diaryList" :key="index">
      <view class="card">
        <img class="emoji" :src="imageMap.get(diary.diaryMood)" />
        <view class="info">
          <view class="date">{{ diary.dateDay }}</view>
          <view class="mood">{{ diary.diaryMood }}</view>
          <view class="time">{{ diary.dateTime }}</view>
        </view>
        <wd-popover mode="menu" :content="operationMenu" @menuclick="doOperation" placement="right">
          <wd-button type="icon" icon="view-list"></wd-button>
        </wd-popover>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useToast, useNotify } from 'wot-design-uni'
import { useUserStore } from '@/store/user'
import {
  addMoodDiary,
  editMoodDiary,
  IAddFeelingItem,
  IEditFeelingItem,
  IGetFeelingItem,
  getAllMoodDiary,
} from '@/service/index/feeling'

defineOptions({
  name: 'feeling',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const { showNotify, closeNotify } = useNotify()
const diaryList = ref<IGetFeelingItem[]>()
const imageMap = new Map([
  ['开心', '../../static/images/tool/moodDiary/mood-happy.png'],
  ['平静', '../../static/images/tool/moodDiary/mood-calm.png'],
  ['生气', '../../static/images/tool/moodDiary/mood-angry.png'],
  ['沮丧', '../../static/images/tool/moodDiary/mood-upset.png'],
  ['焦虑', '../../static/images/tool/moodDiary/mood-anxious.png'],
  ['悲伤', '../../static/images/tool/moodDiary/mood-sad.png'],
])
const operationMenu = ref<Array<Record<string, any>>>([
  {
    iconClass: 'edit',
    content: '编辑',
  },
  {
    iconClass: 'delete',
    content: '删除',
  },
])

onShow(async () => {
  const res = await getAllMoodDiary()
  if (res.code === 200) {
    diaryList.value = res.data
    console.log(diaryList.value)
  } else {
    showNotify({ type: 'danger', message: '出了一些小问题' })
  }
})

const handleClickLeft = () => {
  uni.navigateBack()
}

const doOperation = (e) => {
  if (e.item.content === '编辑') {
    console.log(e.item.content)
  } else if (e.item.content === '删除') {
    console.log(e.item.content)
  }
}

const ToFeeling = () => {
  uni.navigateTo({
    url: '/pages/feeling/feeling',
  })
}
</script>

<style>
.main-title-color {
  color: #d14328;
}

.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 45px 0 20px 0;
}
.card {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.emoji {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
.info {
  flex: 1;
}
.date {
  font-size: 14px;
  color: #666;
}
.mood {
  font-size: 16px;
  font-weight: bold;
}
.time {
  font-size: 12px;
  color: #999;
}
.icon {
  font-size: 20px;
  color: #999;
}
</style>
