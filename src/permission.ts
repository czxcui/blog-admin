import router from "@/routers/index";
//加载进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import usePermissionStore from "@/stores/modules/permission";
import { useUserStore } from "./stores/modules/user";

NProgress.configure({ showSpinner: false}); // NProgress Configuration

//权限路由
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start();

  if (typeof to.meta.title === "string") {
    document.title = to.meta.title || "Blog-Admin";
  }
  const userStore = useUserStore();
  const token = userStore.token;
  //token存在就代表登录
  if (token) {
    // 登录过就不能访问登录界面，需要中断这一次路由守卫，执行下一次路由守卫，并且下一次守卫的to是主页
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      try {
        const permissionStore = usePermissionStore();
        //判断是否已生成过动态路由
        if (!permissionStore.addRoutes.length) {
          // 异步操作，获取用户的权限，与已设置好的路由进行对比，筛选出用户可访问的动态路由，存放在store的addRoutes变量中
          const accessedRoutes =await permissionStore.generateRoutes()

          // 动态添加可访问路由表
          accessedRoutes.forEach((r) => {
            router.addRoute(r);
          });
          //重新访问一次路由表
          next({ ...to, replace: true });
        } else {
          next();
        }
      } catch (error) {
        next(`/login?redirect=${to.path}`);
      }
    }
  } else {
    //未登录
    //判断未登录时访问的是否是登录页
    if (to.path === `/login`) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
