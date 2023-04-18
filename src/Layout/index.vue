<template>
  <div class="layout-container">
    <div class="layout-box">
      <LayoutVertical />
    </div>
  </div>
</template>


<script lang="ts" setup>
import LayoutVertical from "./LayoutVertical/index.vue";
</script>

<style lang="less" scoped>
.layout-container {
  position: absolute;

  width: 100% ; 
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  .layout-box {
    width: 98%;
    position:  relative;
    height: 98%;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 1px 3px 7px 1px rgba(92, 92, 92, 0.315);
    border-radius: 30px;
    display: flex;
    align-content: space-between;
  }
}
</style>