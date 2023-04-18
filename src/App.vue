
<template>
  <router-view  v-slot="{ Component }">

    <component  :is="Component" />

  </router-view>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted ,ref} from "vue";

const isLoaded=ref(false)

onMounted(()=>{

  // setTimeout(()=>{

  //   isLoaded.value=true
  // },2000)
})
</script>


<style scoped>
#app {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* 路由动画 幻灯片 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}
.slide-enter-from {
  position: absolute;
  right: -100%;
}
.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
