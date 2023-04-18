<template>
  <div class="calender-box">
    <div id="gradient"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, reactive } from "vue";
import homeApi from "@/api/modules/home/homeApi.ts";
import {formatTimestampToDate} from "@/utils/dateUtil.ts"
const data=reactive([])



onMounted(() => {
  homeApi.getWith15DayVisit().then(r=>{
    r.data.forEach(element => {
      const {visitDate,visitCount}=element
      data.push({
        visitDate: formatTimestampToDate(visitDate),
        visitCount
      })
        gradientInit();
    });
  })
});
onUnmounted(() => {
  echarts.dispose;
});
const gradientInit = () => {
  var chartDom = document.getElementById("gradient");
  var myChart = echarts.init(chartDom);
  var option;

  // prettier-ignore
  const dateList = data.map(function (item) {
    return item.visitDate;
  });
  const valueList = data.map(function (item) {
    return item.visitCount;
  });
  option = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,   
        dimension: 0,
        min: 0,
        max: data.length-1,
      },
    ],
    title: [
      {
        left: "center",
        text: "15天内的用户活跃数",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        data: dateList,
      },
    ],
    yAxis: [{}],
    grid: [{}],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: valueList,
      },
    ],
  };

  option && myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.calender-box {
  // margin-left: 10px;
  padding: 10px;
  height: 240px;
  box-shadow: 1px 1px 4px 1px rgb(233, 228, 228);
  width: 520px;
  border-radius: 30px;
  background-color: white;

  #gradient {
    margin-top: 20px;
    margin-left: 10px;
    width: 100%;
    height: 100%;
  }
}
</style>