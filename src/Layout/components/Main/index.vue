<template>
  <div class="app-main">
    <router-view
      :key="settingsStore.isReload"
      v-if="settingsStore.isReload"
      v-slot="{ Component }"
    >
      <transition name="scale" mode="out-in" appear>
        <keep-alive>
          <component :is="Component"  />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, provide, nextTick } from "vue";
import SettingsStore from "@/stores/modules/settings";

const settingsStore=SettingsStore()
const isRouterAlive = ref(true);
/**
 * 重载方法
 */
function reload(data) {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
  return data;
}
/**
 * 抛出重载方法,这里懒的改了
 */
provide("reload", settingsStore.reload);
</script>

<style lang="less" scoped>
.app-main {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  // background: rgb(255, 255, 255);
}
/* 路由动画 幻灯片 */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>