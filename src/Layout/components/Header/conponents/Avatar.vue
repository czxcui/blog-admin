<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        class="avatar"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      {{ userInfo.username }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Plus"
          >当前角色：{{
           userRole
          }}</el-dropdown-item
        >
        <el-dropdown-item divided :icon="CirclePlusFilled"
          ><sicon type="account" style="margin-right: 4px" /> 个人信息
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout"
          ><sicon type="poweroff" style="margin-right: 4px" />
          退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/modules/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { computed } from "vue";
import { useRouter } from "vue-router";
import usePermissionStore from "../../../../stores/modules/permission";

const permissionStore = usePermissionStore();
const router = useRouter();
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const userRole = computed(() => {
  let tmp;
  switch (userStore.roles[0]) {
    case "ADMIN":
      tmp = "超级管理员";
      break;
    case "USER":
      tmp = "用户";
      break;
    case "MANAGER":
      tmp = "管理员";
      break;
  }

  return tmp;
});
const logout = async () => {
  ElMessageBox.confirm("是否退出登录？", "退出登录", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(async () => {
      ElMessage({
        type: "success",
        message: "退出成功！",
      });
      await userStore.logout();
      await permissionStore.clearRoutes();
      await router.push({ path: "/login" });
    })
    .catch(() => {
      ElMessage({
        type: "success",
        message: "取消退出！",
      });
    });
  // userStore.logout();
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;

  .avatar {
    margin-right: 6px;
  }
}
</style>