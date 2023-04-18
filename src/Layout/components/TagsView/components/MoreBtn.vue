<template>
  <el-dropdown>
    <el-badge class="item">
      <el-icon><sicon type="all" /></el-icon>
    </el-badge>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <sicon type="sync-alt" style="margin-right: 4px" />
          刷新当前页
        </el-dropdown-item>
        <el-dropdown-item
          divided
          :icon="CirclePlusFilled"
          @click="closeCurrentView"
        >
          <sicon type="close-view" style="margin-right: 4px" />关闭当前
        </el-dropdown-item>

        <el-dropdown-item
          divided
          :icon="CirclePlusFilled"
          @click="closeOrderViews"
        >
          <sicon type="close-order" style="margin-right: 4px" /> 关闭其他
        </el-dropdown-item>
        <el-dropdown-item divided  @click="closeAllViews"
          ><sicon
            type="close-views"
            style="margin-right: 4px"
          />关闭所有</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useTagsViewStore from "@/stores/modules/tagsView";
import SettingsStore from "@/stores/modules/settings";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();
const settingsStore = SettingsStore();

const refresh = () => {
  settingsStore.reload();
};

const closeCurrentView = () => {
  tagsViewStore.findNextTab(route.path);
  tagsViewStore.deleteVisitedViews(route.path);
};

const closeOrderViews = () => {
  tagsViewStore.deleteOrderViews(route.path);
};

const closeAllViews = () => {
  tagsViewStore.deleteAllViews();
};
</script>

<style >
</style>