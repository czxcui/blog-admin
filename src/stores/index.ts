import { createPinia, defineStore } from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'
//引入持久化插件
export const Store = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "globalState",
  // state: 返回对象的函数
  state: () => ({}),
  getters: {},
  actions: {},
  persist: {
    //要开启enabled才能进行持久化
    enabled:true,
    // 本地存储的名称
    key: "globalState",
    //保存的位置
    storage: window.sessionStorage, //localstorage
  },
});

const pinia = createPinia();
//使用持久化插件
pinia.use(piniaPluginPersist);

export default pinia;
