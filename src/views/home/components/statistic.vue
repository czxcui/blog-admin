<template>
  <div class="statistic-box">
    <div class="statistic-card">
      <el-statistic :value="data.dayLive">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            日活跃用户数
            <el-tooltip
              effect="dark"
              content="一天内登录产品的用户数"
              placement="top"
            >
              <el-icon style="margin-left: 4px" :size="12">
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-statistic>
      <div class="statistic-footer">
        <div class="footer-item" >
          <span>比较昨日</span>
          <span :class="data.compareYesterday>=0?'green':'red'">
            {{ data.compareYesterday }}%
            <el-icon>
                 <CaretTop v-if="data.compareYesterday>0"/>
                <CaretBottom v-else-if="data.compareYesterday<0"/>
            </el-icon>
          </span>

        </div>
      </div>
    </div>
    <div class="statistic-card">
      <el-statistic :value="data.monthLive">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            月活跃用户数
            <el-tooltip
              effect="dark"
              content="一个月内登录该产品的用户数"
              placement="top"
            >
              <el-icon style="margin-left: 4px" :size="12">
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-statistic>
      <div class="statistic-footer">
        <div class="footer-item" >
          <span>比较上个月</span>
          <span :class="data.compareLastMonth>=0?'green':'red'" >
            {{ data.compareLastMonth }}%
            <el-icon>
              <CaretTop v-if="data.compareLastMonth>0"/>
                    <CaretBottom v-else-if="data.compareLastMonth<0"/>
            </el-icon>
          </span>
         
        </div>
      </div>
    </div>
    <div class="statistic-card">
      <el-statistic :value="data.todayNewLive" title="今日新增访问用户数">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            今日新增访问用户数
          </div>
        </template>
      </el-statistic>
      <div class="statistic-footer">
        <div class="footer-item" >
          <span>比较昨日</span>
          <span :class="data.compareYesterdayNew>=0?'green':'red'">
            {{ data.compareYesterdayNew }}%
            <el-icon>
            <CaretTop v-if="data.compareYesterdayNew>0"/>
                    <CaretBottom v-else-if="data.compareYesterdayNew<0"/>
            </el-icon>
          </span>
  
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from "@element-plus/icons-vue";
import homeApi from "@/api/modules/home/homeApi.ts";
import { onMounted, onUpdated, reactive, ref } from "vue";

interface Statistic {
  compareLastMonth: number;
  compareYesterday: number;
  compareYesterdayNew: number;
  dayLive: number;
  monthLive: number;
  todayNewLive: number;
}

//  let data =  reactive<Statistic>({
//       compareLastMonth: 0,
//       compareYesterday: 0,
//       compareYesterdayNew: 0,
//       dayLive: 0,
//       monthLive: 0,
//       todayNewLive: 0,

//  });
 let data =ref({})

const initData = () => {
  homeApi.getThisLastLiveNum().then((r) => {
    // let {dayLive,monthLive,todayNewLive}={...r.data};
    // console.log(dayLive,monthLive,todayNewLive)
    data.value={...r.data};

  });
};
onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}
.statistic-box {
  height: 240px;
  width: 520px;
  padding: 10px;
  border-radius: 30px;
  box-shadow: 1px 1px 4px 1px rgb(233, 228, 228);
  background-color: var(--el-bg-color-overlay);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  // box-sizing: border-box;
}
.statistic-card:hover /deep/.el-statistic__number {
}

.statistic-footer {

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
