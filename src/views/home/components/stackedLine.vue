<template>
  <div class="line-box">
    <div id="line"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, reactive } from "vue";
import homeApi from "@/api/modules/home/homeApi.ts";
import { formatTimestampToDate } from "@/utils/dateUtil.ts";
const dayLive = reactive([]);
const dayNewLive = reactive([]);

onMounted(() => {
  homeApi.getWeekLiveList().then((r) => {
    r.data.forEach((e) => {
      let { visitCount, type } = e;
      if (type === 1) {
        // {
        //   // visitDate: formatTimestampToDate(e.visitDate),
        //   visitCount,
        //   // type,
        // }
        dayNewLive.push(visitCount);
      } else {
        dayLive.push(visitCount);
      }
    });

    console.log(dayLive,dayNewLive)
    lineInit();
  });
});

onUnmounted(() => {
  echarts.dispose;
});

const lineInit = () => {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById("line")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: "周用户活跃",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["日用户数", "新用户数"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "1%",
      containLabel: true,
    },
    toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["一", "二", "三", "四", "五", "六", "天"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "日用户数",
        type: "line",
        stack: "Total",
        data: dayLive,
      },
      {
        name: "新用户数",
        type: "line",
        stack: "Total",
        data: dayNewLive,
      },
    ],
  };

  option && myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.line-box {
  // margin-left: 10px;
  padding: 10px;
  height: 240px;
  box-shadow: 1px 1px 4px 1px rgb(233, 228, 228);
  width: 520px;
  border-radius: 30px;
  background-color: white;

  #line {
    // margin-top: 20px;
    // margin-left: 10px;
    width: 100%;
    height: 100%;
  }
}
</style>