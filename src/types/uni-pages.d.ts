/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "/pages/home/home" |
       "/pages/home/home origin" |
       "/pages/admin/admin" |
       "/pages/feeling/feeling" |
       "/pages/ganyu/ganyu" |
       "/pages/inquiry/inquiry" |
       "/pages/inquiry/inquiry_new" |
       "/pages/inquiry/start" |
       "/pages/login/login" |
       "/pages/login/login_origin" |
       "/pages/mood/mood" |
       "/pages/my/my" |
       "/pages/my/my_new" |
       "/pages/my/my_origin" |
       "/pages/record/record" |
       "/pages/tabbar/tabbar" |
       "/pages/test2/test2" |
       "/pages/tool/tool";
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
