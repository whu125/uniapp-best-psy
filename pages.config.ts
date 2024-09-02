import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1296db',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/home/home',
        text: '我的旅程',
      },
      {
        iconPath: 'static/tabbar/tool.png',
        selectedIconPath: 'static/tabbar/toolHL.png',
        pagePath: 'pages/tool/tool',
        text: '工具箱',
      },
      // {
      //   iconPath: 'static/tabbar/record.png',
      //   selectedIconPath: 'static/tabbar/recordHL.png',
      //   pagePath: 'pages/record/record',
      //   text: '旅程记录',
      // },
      {
        iconPath: 'static/tabbar/person.png',
        selectedIconPath: 'static/tabbar/personHL.png',
        pagePath: 'pages/my/my',
        text: '个人信息',
      },
    ],
  },
})
