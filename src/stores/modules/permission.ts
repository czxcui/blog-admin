import { defineStore } from "pinia";
import { asyncRoutes, constantRoutes } from "@/routers/index";
import { fillerAsyncRouters, fillerAsyncRouters2 } from "@/utils/routers";
import service from "@/api/request";
const usePermissionStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "permissionState",
  // state: 返回对象的函数
  state: () => ({
    //路由
    routes: [],
    //动态路由
    addRoutes: [],
    //缓存路由
    cacheRoutes: [],
  }),
  getters: {
    //获取拥有的路由信息
    getRoutes: (state) => {
      return state.routes;
    },
  },

  // 可以同步 也可以异步
  actions: {
    //异步生成路由
     generateRoutes() {
      return new Promise((resolve,reject) => {
        service({
          url: "/permiss/list",
          method: "POST",

        })
          .then((r) => {
            let accessedRoutes;
            accessedRoutes = fillerAsyncRouters(r.data);
            this.routes = constantRoutes.concat(accessedRoutes);
            this.addRoutes = accessedRoutes;
            resolve(accessedRoutes);
          })
          .catch((e) => {
            // console.log(e);
            reject(e)
          });
      });
    },

    clearRoutes(){
      this.routes=[]
      this.addRoutes=[]
      this.cacheRoutes=[]
    }
  },
  // persist: {
  //   enabled:true,
  //   //本地存储的名称
  //   key: "permissionState",
  //   //存储位置
  //   storage: window.localStorage,
  // },
});

export default usePermissionStore;
