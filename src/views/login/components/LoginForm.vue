<template>
  <div class="login-from">
    <div class="login-title">
      <h1 class="title">Blog-Admin</h1>
    </div>
    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      label-width="0px"
      class="dynamicFrom"
    >
      <el-form-item prop="username" label="" :rules="rules.username">
        <el-input
          minlength="6"
          autoComplete="on"
          v-model.trim="dynamicValidateForm.username"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <!-- v-model.trim会自动去除空格 -->
      <el-form-item prop="password" :rules="rules.password">
        <el-input
          minlength="6"
          autoComplete="on"
          v-model.trim="dynamicValidateForm.password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
      </el-form-item>
      <div class="btns">
        <span class="tips" @click="resetForm(formRef)">Recovery Password</span>
        <el-button
          type="primary"
          @click="submitForm(formRef)"
          :loading-icon="Eleme"
          :loading="loading"
        >
          登录</el-button
        >
      </div>
    </el-form>

    <div class="other-login">
      <div class="divider">
        <span class="line"></span>
        <!-- <span class="divider-text">or continue with</span> -->
        <span class="divider-text">Welcome</span>

        <span class="line"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Eleme } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "../../../stores/modules/user";
import service from "../../../api/request";

import { useRouter } from "vue-router";
const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive({
  username: "admin",
  password: "123456",
});

const router = useRouter();

const userStore = useUserStore();
const loading = ref(false);
//表单验证
const checkUserName = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    // dynamicValidateForm.username = "";
    return callback(new Error("请输入用户名"));
  }
  return true;
};
const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    return callback(new Error("请输入密码"));
  }
  if (value.trim().length < 6) {
    return callback(new Error("密码不能小于6个字符"));
  }
  return true;
};
const rules = reactive<FormRules>({
  username: [{ validator: checkUserName, trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      userStore
        .login({ ...dynamicValidateForm })
        .then(async (r) => {
     
          await router.push({
            path: "/",
          });
          if (r.data.code !== 66666) {
            setTimeout(() => {
              loading.value = false;
            }, 1000);
          } else {
          }
        })
        .catch((e) => {
          loading.value = false;
        });
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
@import "../style/index.less";
</style>