<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <template v-if="!item.hidden">
      <!--菜单项-->
      <template v-if="hasChild(item)">
        <!-- {{item.meta.title}} -->
        <MenuItem :subItem="item" />
      </template>

      <!-- 菜单项是否有子菜单 -->
      <SubMenu  v-else-if="item.name === 'short'" :menuList="hasChild(item.children)" />
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <el-icon><sicon :type="item.meta.icon" /></el-icon>
          <span> {{ item.meta.title }}</span>
        </template>
        <!-- 递归渲染菜单 -->
        <SubMenu :menuList="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>



<script lang="ts" setup>
import MenuItem from "./MenuItem.vue";
defineProps<{ menuList: { type: Array; default: () => [] } }>();

const hasChild = (parent) => {
  //直接排除不显示菜单的路由

  if (parent.hidden) {
    return false;
  }
  //排除home路由的父路由，只要子路由
  if (parent.path === "/") {
    // console.log(parent.children[0])
    return parent.children[0];
  }
  if (!parent.children) {

    return parent;
  }
  return false;
};
</script>

<style>
</style>
