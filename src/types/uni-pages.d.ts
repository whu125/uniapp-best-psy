/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "/pages/home/home" |
       "/pages/admin/admin" |
       "/pages/admin/inquiry" |
       "/pages/diaryList/diaryDetail" |
       "/pages/diaryList/diaryList" |
       "/pages/feeling/feeling" |
       "/pages/ganyu/ganyu" |
       "/pages/ganyu/ganyu_temp" |
       "/pages/home/home_old" |
       "/pages/inquiry/before" |
       "/pages/inquiry/end" |
       "/pages/inquiry/eval" |
       "/pages/inquiry/first" |
       "/pages/inquiry/huigu" |
       "/pages/inquiry/inquiry" |
       "/pages/inquiry/start" |
       "/pages/inquiry/success" |
       "/pages/journey_common/common" |
       "/pages/journey_common/daolanHome" |
       "/pages/journey_common/daolanStart" |
       "/pages/journey_common/start_journey" |
       "/pages/login/login" |
       "/pages/login/login_origin" |
       "/pages/mood/mood" |
       "/pages/my/my" |
       "/pages/my/my_new" |
       "/pages/my/my_origin" |
       "/pages/record/record" |
       "/pages/tabbar/tabbar" |
       "/pages/test2/test2" |
       "/pages/tool/tool" |
       "/pages/tool-huibidangan/huibiDetail" |
       "/pages/tool-huibidangan/huibidangan" |
       "/pages/tool-huibidangan/input" |
       "/pages/tool-huibidangan/list" |
       "/pages/tool-jiazhishouce/catching" |
       "/pages/tool-jiazhishouce/jiazhiDetail" |
       "/pages/tool-jiazhishouce/jiazhishouce" |
       "/pages/tool-jiazhishouce/list" |
       "/pages/tool-jiazhishouce/startCatching" |
       "/pages/tool-jienalianxi/input" |
       "/pages/tool-jienalianxi/jienaDetail" |
       "/pages/tool-jienalianxi/jienalianxi" |
       "/pages/tool-jienalianxi/list" |
       "/pages/tool-xingdongjihua/catching" |
       "/pages/tool-xingdongjihua/list" |
       "/pages/tool-xingdongjihua/xingdongDetail" |
       "/pages/tool-xingdongjihua/xingdongjihua" |
       "/pages/tool-yingduijihua/catching" |
       "/pages/tool-yingduijihua/list" |
       "/pages/tool-yingduijihua/yingduiDetail" |
       "/pages/tool-yingduijihua/yingduijihua" |
       "/pages/tool-zhengnianlianxi/input" |
       "/pages/tool-zhengnianlianxi/list" |
       "/pages/tool-zhengnianlianxi/startPractise" |
       "/pages/tool-zhengnianlianxi/zhengnianDetail" |
       "/pages/tool-zhengnianlianxi/zhengnianlianxi" |
       "/pages/tool-zidongsiwei/catching" |
       "/pages/tool-zidongsiwei/list" |
       "/pages/tool-zidongsiwei/siweiDetail" |
       "/pages/tool-zidongsiwei/startCatching" |
       "/pages/tool-zidongsiwei/zidongsiwei";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  url: "/pages/home/home" | "/pages/tool/tool" | "/pages/my/my"
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
