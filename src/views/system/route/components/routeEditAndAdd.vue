<template>
  <el-dialog v-model="dialogFormVisible" :title="formTitle">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      :label-width="formLabelWidth"
      class="demo-ruleForm"
      :size="formSize"
      :label-position="labelPosition"
      status-icon
    >
      <el-form-item label="权限名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入system，route等" />
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input
          v-model="ruleForm.title"
          placeholder="展示名，可以用于页面标题展示"
        />
      </el-form-item>
      <el-form-item label="路由地址" prop="url">
        <el-input v-model="ruleForm.url" placeholder="建议与权限名同名" />
      </el-form-item>

      <!-- <el-form-item label="重定向" prop="icon">
        <el-input v-model="ruleForm.name" />
      </el-form-item> -->
      <!-- <el-form-item label="组件路径" prop="component">
        <el-input
          v-model="ruleForm.component"
          placeholder="页面存放路径存放在views下与权限名同名"
        />
      </el-form-item> -->
      <!-- <el-form-item label="权限标识" prop="permission" placeholder="">
        <el-input v-model="ruleForm.permission" />
      </el-form-item> -->

      <el-form-item label="权限类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1" name="type">页面</el-radio>
          <el-radio :label="2" name="type">目录</el-radio>
          <el-radio :label="3" name="type">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="接口访问方式" prop="method">
        <el-radio-group v-model="ruleForm.method">
          <el-radio :label="0">GET</el-radio>
          <el-radio :label="1">POST</el-radio>
          <el-radio :label="2">PUT</el-radio>
          <el-radio :label="3">DELETE</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="ruleForm.sort" />
      </el-form-item>
      <el-form-item label="父级菜单" prop="parentId">
        <el-tree-select
          placeholder="请选择父级菜单"
          v-model="ruleForm.parentId"
          ref="treeRef"
          :data="treeData"
          node-key="value"
          check-on-click-node
          show-checkbox
          check-strictly
          :render-after-expand="false"
          @node-click="handleNodeClick"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ formTitle }}
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer"> </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose, onMounted, watch, onUpdated } from "vue";
import type { FormInstance, FormRules, ElTree } from "element-plus";
import { SystemRoute, Permission } from "./SystemRoute";
const dialogFormVisible = ref(false);
const formLabelWidth = "150px";
const formTitle = ref("");
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const labelPosition = ref("right");
const systemRoute = new SystemRoute();
const ruleForm = reactive({
  name: "",
  title: "",
  url: "",
  icon: "gallery-view",
  // redirect: "",
  component: "",
  type: 1,
  permission: "",
  method: 0,
  sort: 0,
  parentId: "",
});
interface Tree {
  value: number;
  label: string;
  children?: Tree[];
}
const treeRef = ref<InstanceType<typeof ElTree>>();
const handleNodeClick = (data: Tree) => {
  console.log(data);
  console.log(treeRef.value.getCurrentNode());
  console.log(treeRef.value.getHalfCheckedNodes());
};

onUpdated(() => {});
onMounted(() => {
  //父级菜单的显示
  funTreeData();
});
// onUpdated(() => {
//   funTableData();
// });

//x修改或者添加时的父级菜单
let treeData: Tree[] = reactive([]);
const funTreeData = () => {
  systemRoute.getPermissionList().then((r) => {
    treeData.push(...recursionTree(r));
  });
};
const recursionTree = (d: unknown) => {
  let res: Tree[] = [];
  d.forEach((element) => {
    let tmp: Tree = {
      value: element.id,
      label: element.title,
      children:
        element.children.length > 0 ? recursionTree(element.children) : [],
    };
    res.push(tmp);
  });
  return res;
};

const showDialogFormVisible = (isVisible: number, id: number) => {
  dialogFormVisible.value = !dialogFormVisible.value;
  if (isVisible === 1) {
    formTitle.value = "添加";
  } else {

    systemRoute.getPermission(id).then((r) => {

      Object.assign(ruleForm, r, {
        parentId: r.parentId === 0 ? "" : r.parentId,
      });
    });
    formTitle.value = "修改";
  }
};

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入权限名", trigger: "blur" },
    { min: 3, max: 9, message: "长度为3~9", trigger: "blur" },
  ],
  title: [
    {
      required: true,
      message: "请输入标题",
      trigger: "blur",
    },
  ],
  url: [
    {
      required: true,
      message: "请输入路由地址",
      trigger: "blur",
    },
  ],
  icon: [
    {
      required: true,
      message: "请选择图标",
      trigger: "change",
    },
  ],
  // component: [
  //   {
  //     required: true,
  //     message: "请输入组件存放路径",
  //     trigger: "blur",
  //   },
  // ],
  // permission: [
  //   {
  //     required: true,
  //     message: "请输入权限标识",
  //     trigger: "blur",
  //   },
  // ],
  type: [
    {
      required: true,
      message: "请输入权限类型",
      trigger: "change",
    },
  ],

  method: [{ required: true, message: "请选择接口访问类型", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!ruleForm.url.startsWith("/")) {
        ruleForm.url = "/" + ruleForm.url;
      }
      // if(ruleForm.parentId){
      //   ruleForm.parentId="0";
      // }
      if (formTitle.value === "修改") {
        console.log("修改");
        systemRoute.edit(ruleForm);
      } else {
        systemRoute.add(ruleForm);
      }
      location.reload();
      // window.location.reload();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

defineExpose({
  showDialogFormVisible,
  ruleForm,
});
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
