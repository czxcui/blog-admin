<template>
  <el-menu-item :index="subItem.path" @click="handleClickMenu(subItem)">
    <el-icon><sicon :type="subItem.meta.icon" /></el-icon>
    <template #title>{{subItem.meta.title}}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
  subItem: {
    type: Object,
    default: () => {},
  },
});
let router = useRouter();
let handleClickMenu = (subItem) => {
  // console.log(subItem)
  router.push(subItem.path);
};
</script>

<style>
</style>