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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入电话号码" />
      </el-form-item>
      <el-form-item label="角色" prop="roleId" required>
        <el-select
          v-model="ruleForm.roleId"
          class="m-2"
          placeholder="请选择角色"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="ruleForm.birthday"
          type="date"
          placeholder="请输入出身日期"
        />
      </el-form-item>
      <!-- <el-form-item label="权限标识" prop="permission" placeholder="">
        <el-input v-model="ruleForm.permission" />
      </el-form-item> -->

      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="ruleForm.status"
          inline-prompt
          active-text="启用"
          inactive-text="禁用"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ formTitle }}
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer"> </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  reactive,
  ref,
  defineExpose,
  onMounted,
  watch,
  onUpdated,
  inject,
} from "vue";
import { FormInstance, FormRules, ElMessage } from "element-plus";
import roleApi from "@/api/modules/system/SystemRole.ts";
import userApi from "@/api/modules/system/SystemUser.ts";
import {formatDateToTimestamp} from "@/utils/dateUtil.ts"

const systemRole = roleApi;
const systemUser = userApi;
const dialogFormVisible = ref(false);
const formLabelWidth = "150px";
const formTitle = ref("");
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const labelPosition = ref("right");
const ruleForm = reactive({
  username: "",
  roleId: 2,
  email: "",
  phone: "",
  sex: 0,
  birthday: "",
  status: 1,
});

/**
 * 获取用户的可选择的角色列表
 */
const roleList = [];
systemRole.list().then((r) => {
  roleList.push(...r);
});

onUpdated(() => {});
onMounted(() => {});

/**
 * 控制表单是否为添加或者修改
 *
 */
const showDialogFormVisible = (isVisible: number, id: number) => {
  dialogFormVisible.value = !dialogFormVisible.value;
  if (isVisible === 1) {
    formTitle.value = "添加";
  } else {
    formTitle.value = "修改";
    systemUser.getUserInfo(id).then((r) => {
      console.log(r)
      Object.assign(ruleForm, r);

    });
  }
};

/**
 * 监听表单关闭，清空表单
 */
watch(dialogFormVisible, (newValue, oldValue) => {
  if (!newValue) {
    ruleFormRef.value.resetFields();
  }
});

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 9, message: "长度为3~9", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: "用户名只允许数据加英文",
      trigger: "blur",
    },
  ],

  email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "blur",
    },
    {
      type: "email",
      message: "请输入正确的邮箱格式",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入电话号码",
      trigger: "change",
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "手机号码格式不正确",
      trigger: "blur",
    },
  ],
});

const reloadPage: any = inject("reloadPage");

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {

      let formDate=ruleForm;
      formDate.birthday=formatDateToTimestamp(formDate.birthday)
      console.log(formDate)
      if (formTitle.value === "修改") {
        systemUser.updateUser(ruleForm).then((r) => {
          if (r.code === 666) {
            ElMessage.success("修改成功");
            reloadPage();
          }
        });
      } else {
        systemUser.addUser(ruleForm).then((r) => {
          if (r.code === 666) {
            ElMessage.success("添加成功");
            ruleFormRef.value.resetFields();
            reloadPage();
          }
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

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
