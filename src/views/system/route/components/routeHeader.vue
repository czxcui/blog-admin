<template>
  <div class="route-header">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="路由名称">
        <el-input v-model="formInline.user" placeholder="请搜索路由名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          查询
        </el-button>
        <el-button type="info" @click="reset">
          重置
        </el-button>
        <el-button type="success" @click="addForm">
          添加组件
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <routeEdit ref="editObject"/>
</template>

<script lang="ts" setup>
import routeEdit from "./routeEditAndAdd.vue"
import { onMounted, reactive, ref ,inject } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const editObject=ref(null)
onMounted(()=>{
})

const formInline = reactive({
  user: "",
  region: "",
});



const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

//局部刷新页面
 const reload:any = inject('reload')
const reset = () => {

  reload()// (调用)
};
const addForm=()=>{
  editObject.value.showDialogFormVisible(1)
}


</script>

<style lang="less" scoped>
.route-header {
  display: flex;
  align-items: center;

  height: 100%;
  margin-top: 7px;
  vertical-align: middle;
  margin-left: 30px;
}
</style>