import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory,
  Router,
} from "vue-router";

import layout from "@/Layout/index.vue";

import systemRouter from "./modules/system";

//异步路由(需要镶嵌左右布局)
// export const asyncRoutes = [...systemRouter];

/**
 * path ==> 路由路径
 * name ==> 路由名称
 * component ==> 路由组件
 * redirect ==> 路由重定向
 * alwaysShow ==> 如果设置为true，将始终显示根菜单，无论其子路由长度如何
 * hidden ==> 如果“hidden:true”不会显示在侧边栏菜单中（默认值为false）
 * keepAlive ==> 设为true 缓存
 * meta ==> 路由元信息
 * meta.title ==> 路由标题
 * meta.icon ==> 菜单icon
 * meta.affix ==> 如果设置为true将会出现在 标签栏中
 * meta.breadcrumb ==> 如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
 */
//全局路由(无需镶嵌在左右布局上，有自己独立的页面)
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
    meta: { title: "登录" },
  },
  {
    path:"/404",
    name:"404",
    component:()=>import("@/views/error/404.vue"),
    hidden:true
  },
//   {
//     path: '/:pathMatch(.*)',
//     redirect: '/404',
//     hidden:true
// },
  {
    path: "/",
    name: "layout",
    component: ()=>import("@/Layout/index.vue"),
    redirect: "/home", //当访问时/时重定向到/home
    meta: { title: "首页",icon:"home",type:1},
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "首页",affix:true,icon:"home",type:1},
      },
    ],
  },
];

/**
 * notFoundRouter(找不到路由)
 */
// export const notFoundRouter = {
//   path: '/:pathMatch(.*)',
//   name: 'notFound',
//   redirect: '/404',
// }
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL), // history
  history: createWebHashHistory(), // hash
  routes: constantRoutes,
});
export default router;
