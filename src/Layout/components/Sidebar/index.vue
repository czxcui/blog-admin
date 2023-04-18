<template>
  <div class="scrollbar-box fixed-scrollbar">
    <el-scrollbar>
      <Logo @updateCollapse="updateCollapse"  :isCollapse="!isCollapse" />
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-z"
        :unique-opened="true"
        :collapse-transition="true"
        :collapse="isCollapse"
      >
        <SubMenu  :menuList="routes"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { onUpdated, ref,reactive, computed } from "vue";
import Logo from "./components/Logo.vue";
import SubMenu from "../SubMenu/SubMenu.vue";
import usePermissionStore from '../../../stores/modules/permission';
import { useRoute } from 'vue-router'

const permissionStore=usePermissionStore();
const route=useRoute();
//是否折叠
let isCollapse = ref(false);
let updateCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const routes=computed(()=>permissionStore.getRoutes);
// console.log(routes)
//监听路由打开菜单
const activeMenu=computed(()=>{
    const {path}=route
    return path;
})

</script>

<style lang="less" scoped>
.scrollbar-box {
  height: 100%;
  // position: fixed;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #dcdfe6;

}
.el-menu-vertical-z:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-z {
  top: 50px;

}
/deep/ .el-menu {
  background-color: transparent;
  border-right: none;
}
// /deep/.el-sub-menu__title{
//   background-color: red;
// }
.fixed-scrollbar {
  // position: absolute;
}
</style>