import service from "@/api/request";
import { defineStore } from "pinia";
import router from "@/routers/index";
export const useUserStore = defineStore({
  id: "userState",
  state: () => ({
    //登录token
    token: null,
    //用户信息
    userInfo: {},
    //角色
    roles: localStorage.roles ? JSON.parse(localStorage.roles) : [],
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    async login(data: object) {
      return await new Promise(async (resolve, reject) => {
        service({
          url: "/login",
          method: "POST",
          data,
        })
          .then((r) => {
            
            let { token, username, roleName } = r.data;
            this.token = token || null;
            this.userInfo = { username, roleName };
            this.roles=[roleName]
            resolve(r);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    async logout() {
      return await new Promise((resovle, reject) => {
        service({
          url: "/logout",
          method: "post",
        })
          .then((r) => {
            (this.token = null), (this.userInfo = {}), (this.roles = []);
            resovle(null);
          })
          .catch((e) => {});
      });
    },
  },
  persist: {
    enabled: true,
    //本地存储的名称
    key: "userState",
    //存储位置
    storage: window.localStorage,
  },
});
