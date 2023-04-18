import { defineStore } from "pinia";
import router from "@/routers";

const useTagsViewStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "useTagsViewState",
  // state: 返回对象的函数
  state: () => ({
    //激活的tabs标签路径
    activeTabsValue: "/home",
    //当前已经打开的tabs值
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {
    //获取拥有的路由信息
  },

  // 可以同步 也可以异步
  actions: {
    //设置激活的tab值
    setTabsMenuValue(val) {
      this.activeTabsValue = val;
    },

    addVisitedViews(val) {
      //设置打开的menu为激活tabs
      this.setTabsMenuValue(val.path);
      //排除相同项
      if (
        this.visitedViews.some((v) => {
          return v.path === val.path;
        })
      )
        return;
      //添加
      this.visitedViews.push(
        Object.assign({}, val, {
          title: val.meta.title || "?",
        })
      );
    },

    //删除tab
    deleteVisitedViews(val) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.path !== val || v.meta.affix;
        });

        resolve;
      });
    },

    /**
     * 删除其他页面
     * @param path
     */
    deleteOrderViews(path: string) {
      console.log(path, this.visitedViews);
      this.visitedViews = this.visitedViews.filter(
        (x) => x.path === path || x.meta.affix
      );
    },

    deleteAllViews() {
      this.visitedViews = this.visitedViews.filter((x) => x.meta.affix);
      router.push(this.visitedViews[0].path)
    },

    /**
     * 关闭时跳到临近的标签
     * @param targetName
     * @returns
     */
    findNextTab(targetName: string) {
      let index = this.visitedViews.findIndex((v) => v.path === targetName);
      const next = this.visitedViews[index + 1] || this.visitedViews[index - 1];
      if (!next) return;
      router.push(next.path);
      this.addVisitedViews(next);
    },
  },
});

export default useTagsViewStore;
