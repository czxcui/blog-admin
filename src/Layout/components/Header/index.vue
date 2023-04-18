<template>
  <div class="header-box">
    <div class="header-left">
      <BreadCrumb />
    </div>
    <div class="header-rigtr">
      <InformVue />
      <AvatarVue />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarVue from "./conponents/Avatar.vue";
import BreadCrumb from "./conponents/BreadCrumb.vue";
import InformVue from "./conponents/Inform.vue";
</script>
<style lang="less" scoped>
.header-box {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #dcdfe6;
  .header-left {
    position: absolute;
    display: flex;
    margin-left: 10px;
    justify-content: left;
  }
  .header-rigtr {
    position: absolute;
    width: 30%;
    right: 0;
    display: flex;
    justify-content: right;
    align-items: center;
    flex-direction: row;
    &>*{
      margin-right: 30px;
    }
  }
}
</style>