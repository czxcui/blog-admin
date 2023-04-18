<template>
  <div class="route-container">
    <div class="route-header-box">
      <routeHeaderVue />
    </div>
    <div class="route-table-box">
      <routeTable />
    </div>
  </div>
</template>

<script lang="ts" setup>
import routeHeaderVue from "./components/routeHeader.vue";
import routeTable from "./components/routeTable.vue";
</script>


<style lang="less" scoped>
.route-container {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & > * {
    box-shadow: 1px 1px 4px 1px rgb(211, 208, 208);
    border-radius: 20px;
    background-color: white;
  }

  .route-header-box {

    width: 98%;
    height: 80px;
    margin: 9px;
    border: 1px solid #ebeef5;
  }
  .route-table-box {
    width: 98%;
    display: flex;
     height: 700px;
    align-items: center;
    justify-content: center;
  }
}
</style>