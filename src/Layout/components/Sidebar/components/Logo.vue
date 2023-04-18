<template>
  <div class="logo-box">
    <img src="../../../../assets/image/t2.svg" alt="" @click="updateWidth" />
    <transition name="sidebar">
      <router-link v-if="isCollapse" to="/"> Blog-Admin </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
//在vue3中使用defineProps来定义props
import { ref } from "vue";
//在vue3中使用defineProps来定义props
defineProps<{isCollapse:boolean,default:false}>();
//defineEmits子调用父的方法
const emits = defineEmits(["updateCollapse"]);
// let isCollapse=ref(true);
let updateWidth = () => {
 emits("updateCollapse");
};
</script>

<style lang="less" scoped>
.sidebar-enter-active {
  transition: opacity 2s;
}
.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}
.logo-box {
  // width: 100%;
  position: fixed;
  width: 200px;
  z-index: 99;
  height: 50px;
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid #dcdfe6;
  
  a {
   
    color: black;
    text-decoration: none;
    line-height: 50px;
    display: block;
    font-size: 16px;
    font-weight: bold;
  }
  img {

    padding: 0 18px;
    width: 30px;
    cursor: pointer;
  }
}
</style>