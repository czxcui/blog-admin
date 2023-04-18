<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item to="/" v-if="url[0].meta.title!=='首页'"> 首页 </el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item,index) in url" :key="item.name">
      <a :href="item.meta.path">{{item.meta.title}}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter,useRoute } from "vue-router";
const route=useRoute()
const router=useRouter()


// console.log(route.matched)
const url=computed(()=>{
 return  route.matched.filter(item=>{
  
    return item.meta
  })
})

// console.log(url)
</script>

<style>
</style>