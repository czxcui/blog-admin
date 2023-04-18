<template>
  <div class="tags-box">
    <div class="tags-view">
      <el-tabs
        v-model="activeTabsValue"
        type="card"
        class="demo-tabs"
        @tab-remove="removeTab"
        @tab-click="cilckTab"
      >
        <el-tab-pane
          v-for="item in visitedViews"
          :key="item.path"
        :path="item.path"
          :label="item.title"
          :name="item.path"
          :closable="!(item.meta && item.meta.affix)"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tags-right-btn"><MoreBtnVue /></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import MoreBtnVue from "./components/MoreBtn.vue";
import { useRoute, useRouter } from "vue-router";
import usePermissionStore from "@/stores/modules/permission";
import useTagsViewStore from "@/stores/modules/tagsView";
// import path from "path-browserify";
const tagsViewStore = useTagsViewStore();
const permissionStore = usePermissionStore();
const route = useRoute();
const router = useRouter();

// console.log(route,router)

//被使用computed的属性都是要进行计算才能显示
const routes = computed(() => permissionStore.routes);
const visitedViews = computed(() => tagsViewStore.visitedViews);
let tabIndex = 2;

//计算tabs是否被激活
const activeTabsValue = computed({
  get: () => {
    // console.log("123 ", tagsViewStore.activeTabsValue);
    return tagsViewStore.activeTabsValue;
  },
  set: (v) => {
    tagsViewStore.setTabsMenuValue(v.path);
  },
});

const affixTags = ref([]);
const filterAffixTabs = (routes) => {
  let tabs = [];
  routes.forEach((item) => {
    if (item.meta && item.meta.affix) {
      tabs.push({
        path: item.path,
        name: item.name,
        meta: { ...item.meta },
      });
    }
    if (item.children) {
      const tmps = filterAffixTabs(item.children);
      if (tmps.length > 0) {
        tabs.push(...tmps);
      }
    }
  });
  return tabs;
};
//初始化标签，过滤出始终在tabs栏上的标签，如首页
const initTabs = () => {
  let rsName = routes.value;
  let affixTag = (affixTags.value = filterAffixTabs(rsName));

  for (let r of affixTag) {
    if (r.name) {
      tagsViewStore.addVisitedViews(r);
    }
  }
};

const addTabs = () => {
  const { name } = route;
  //添加登录路由
  if (name === "Login") {
    return;
  }
  if (name) {
    tagsViewStore.addVisitedViews(route);
  }
  return false
};

const cilckTab = (targetName: string) => {
    // console.log(targetName.props.name)
    
    router.push(targetName.props.name)
};

//删除时自动切换到左边或者右边的tab
const findNextTab=(targetName)=>{
  let index=visitedViews.value.findIndex(v=>v.path===targetName);
  const next=visitedViews.value[index+1]||visitedViews.value[index-1];
  if(!next)return
  router.push(next.path)
  tagsViewStore.addVisitedViews(next)
}
const isActive=(path)=>{
  return path===route.path;
}
const removeTab =async (targetName: string) => {
  if(isActive(targetName)){
    tagsViewStore.findNextTab(targetName);
  }
  await tagsViewStore.deleteVisitedViews(targetName)
};

onMounted(() => {
  initTabs();
  addTabs();
});
watch(route, () => {

  addTabs();
});
</script>

<style lang="less" scoped>
.tags-box {
  position: relative;

  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;

  .tags-right-btn {
    height: 40px;
    width: 95px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--el-border-color-light);
  }
}

.tags-view {
  // width: 30px;
  width: 1px;
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;

  /deep/.el-tabs {
    .el-tabs__nav {
      border: none;
    }

    .el-tabs__item {
      color: #9c9999;
    }
    .el-tabs__header .el-tabs__item.is-active {
      color: rgb(98, 205, 255);
      border-bottom: 1px solid rgb(98, 205, 255);
    }
    .el-tabs__header {
      margin: 0;
    }
  }
}
</style>