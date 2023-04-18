<template>
  <div class="barRace-box">
    <div id="barRace"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  barRaceInit();
});

onUnmounted(() => {
  echarts.dispose;
});

const barRaceInit = () => {
  var chartDom = document.getElementById("barRace");
  var myChart = echarts.init(chartDom);
  var option;

  const data = [];
  for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
  }
  option = {
    xAxis: {
      max: "dataMax",
    },
    yAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E"],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2, // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        name: "X",
        type: "bar",
        data: data,
        label: {
          show: true,
          position: "right",
          valueAnimation: true,
        },
      },
    ],
    legend: {
      show: true,
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };
  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000);
      } else {
        data[i] += Math.round(Math.random() * 200);
      }
    }
    myChart.setOption({
      series: [
        {
          type: "bar",
          data,
        },
      ],
    });
  }
  setTimeout(function () {
    run();
  }, 0);
  setInterval(function () {
    run();
  }, 3000);

  option && myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.barRace-box {
  box-sizing: content-box;
  padding: 20px;
  box-shadow: 1px 1px 4px 1px rgb(233, 228, 228);

  border-radius: 30px;
  background-color: white;
  height: 470px;
  #barRace {
    margin-top: 20px;
    height: 470px;
    width: 100%;
  }
}
</style>