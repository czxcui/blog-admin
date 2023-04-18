<template>
  <Sideblar />
  <div class="main-container">
    <HeaderVertical />
    <Main />
    <Footer></Footer>
  </div>
</template>

<script lang="ts" setup>
import Sideblar from "../components/Sidebar/index.vue";
import HeaderVertical from "./HeaderVertical/index.vue";
import Footer from "../components/Footer/index.vue";
import Main from "../components/Main/index.vue";



</script>

<style lang="less" scoped>
.main-container {

  width: 100%;
  height: 100%;
  display: flex;
  // flex: 1;
  flex-direction: column;
  justify-content: space-between;
}
</style>