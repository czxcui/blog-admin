<template>
  <div>
    <div class="header-container">
      <Header />
    </div>
    <TagsView />
  </div>
</template>
<script lang="ts" setup>
import Header from "../../components/Header/index.vue";
import TagsView from "../../components/TagsView/index.vue";
</script>

<style lang="less" setup>
.header-container {
  // position: relative;
  width: 100%;
}
</style>