<template>
  <div class="container">
    <div class="s"><chartVue /></div>
    <div class="r1"><barRaceVue /></div>
    <div class="c1">
      <div class="c1-box"><statisticVue /> <gradientVue /> <lineVue/></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import infoVue from "./components/info.vue";
import chartVue from "./components/chart.vue";
import statisticVue from "./components/statistic.vue";
import lineVue from "./components/stackedLine.vue"
import gradientVue from "./components/gradient.vue";
import barRaceVue from "./components/barRace.vue";




</script>

<style lang="less" scoped>
.home-box {
  // position: relative;
  & > :first-child {
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    // justify-content: space-evenly;
  }
  padding: 10px;
  box-sizing: border-box;
}
.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.5fr 0.5fr;
  gap: 13px 13px;
  grid-auto-flow: row;
  grid-template-areas:
    "c1 c1 c1"
    "s s r1";
}

.s {
  grid-area: s;
}

.r1 {
  grid-area: r1;
}

.c1 {
  grid-area: c1;
}
.c1-box {
  display: flex;
  justify-content: space-between;
}


</style>