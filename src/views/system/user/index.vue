<template>
  <div class="user-container">
    <div class="user-header-box">
      <div class="user-header">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <!-- <div class="search-box">
              <el-input
                v-model="formInline.keyword"
                placeholder="请输入关键字"
              />
              <el-tooltip
                class="box-item"
                effect="dark"
                content="请使用用户名，电话号码或邮箱作为关键字来查询"
                placement="top-start"
              >
                <sicon type="question-circle" />
              </el-tooltip>
            </div> -->
            <el-input
              v-model="formInline.keyword"
              placeholder="请输入关键字查询用户"
              class="input-with-select"
              size="large"
            >
              <template #prepend>
                <!-- <el-button :icon="Search" /> -->
                <sicon type="search" />
              </template>
              <template #append>
                <el-select
                  v-model="formInline.searchType"
                  placeholder="选择条件"
                  style="width: 115px"
                >
                  <el-option label="用户名" :value="1" />
                  <el-option label="邮箱" :value="2" />
                  <el-option label="电话号码" :value="3" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              查询
            </el-button>
            <el-button type="info" @click="reset"> 重置 </el-button>
            <el-button type="success" @click="dialogFormVisible(1)">
              添加用户
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="user-table-box">
      <div class="user-table">
        <el-table
          :data="tableData"
          row-key="id"
          stripe
          default-expand-all
          height="620"
          style="width: 100%"
          lazy
        >
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="roleName" label="角色" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="phone" label="电话号码" />
          <el-table-column prop="sex" width="60" label="性别" />
          <el-table-column prop="birthday" width="110" label="出生日期" />
          <el-table-column prop="createTime" label="创建日期" />
          <el-table-column prop="updateTime" label="最新修改日期" />
          <el-table-column prop="lastActiveTime" label="最后活动日期" />
          <el-table-column prop="status" width="80" label="账号状态">
            <template #default="scope">
              <el-switch
                inline-prompt
                active-text="启用"
                inactive-text="禁用"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status"
                @change="changeStatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                @click="dialogFormVisible(2, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          v-model="centerDialogVisible"
          title="警告"
          width="20%"
          center
        >
          <span>确定是否要删除路由？</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancelDialogVisible">取消</el-button>
              <el-button type="primary" @click="confirmDialogVisible">
                确定
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <el-pagination
        class="table-pagination"
        v-model:current-page="formInline.currentPage"
        v-model:page-size="formInline.pageSize"
        :page-sizes="[10, 30, 50, 60, 100]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        prev-text="上一页"
        next-text="下一页"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <UserEditVue ref="userEditObj" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, inject, onMounted, provide, defineAsyncComponent } from "vue";
import userApi from "@/api/modules/system/SystemUser.ts";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import {formatDateToTimestamp} from "@/utils/dateUtil.ts"

const UserEditVue=defineAsyncComponent(()=>import("./components/UserEdit.vue"))

const router = useRouter();
const systemUser = userApi;
const formInline = reactive({
  keyword: "",
  currentPage: 1,
  pageSize: 10,
  searchType: 1,
});
const total = ref(null);
const tableData = reactive([]);
const userEditObj = ref(null);
const centerDialogVisible = ref(false);
onMounted(() => {
  getPage(formInline);
});

/**
 * 页面
 */
const getPage = (data) => {
  systemUser.page(data).then((r) => {
    tableData.length = 0;
    tableData.push(...mapPage(r.records));
    total.value = r.total;
  });
};
const mapPage = (list: []) => {
  if (list.length == 0) {
    return [];
  }
  return list.map((x) => {
    return Object.assign({}, x,
     {
      birthday: x.birthday
        ? new Date(x.birthday)
            .toLocaleDateString()
            .replace("/", "-")
            .replace("/", "-")
        : "",
      createTime: x.createTime
        ? new Date(x.createTime)
            .toLocaleString()
            .replace("/", "-")
            .replace("/", "-")
        : "",
      lastActiveTime: x.lastActiveTime
        ? new Date(x.lastActiveTime)
            .toLocaleString()
            .replace("/", "-")
            .replace("/", "-")
        : "",
      updateTime: x.updateTime
        ? new Date(x.updateTime)
            .toLocaleString()
            .replace("/", "-")
            .replace("/", "-")
        : "",
      roleName: setRoleName(x.roleName) ,
      sex: x.sex === 0 ? "男" : "女",
    });
  });
};
const setRoleName=(name:string)=>{
    let tmp;
  switch (name) {
    case "ADMIN":
      tmp = "超级管理员";
      break;
    case "USER":
      tmp = "用户";
      break;
    case "MANAGER":
      tmp = "管理员";
      break;
  }

  return tmp;

}


/**
 * 分页切换
 */
const handleSizeChange = (val: number) => {
  getPage({
    currentPage: formInline.currentPage,
    pageSize: formInline.pageSize,
  });
};
const handleCurrentChange = (val: number) => {
  getPage({
    currentPage: formInline.currentPage,
    pageSize: formInline.pageSize,
  });
};

/**
 * 搜索用户
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  getPage({ ...formInline });

  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
    } else {
    }
  });
};

/**
 * 改变用户状态
 */
const changeStatus = (row) => {

  let tmp = Object.assign({}, row, {
    sex: row.sex === "男" ? 0 : 1,
    birthday:formatDateToTimestamp(row.birthday),
    createTime:formatDateToTimestamp(row.createTime),
    lastActiveTime:formatDateToTimestamp(row.lastActiveTime),
    updateTime:formatDateToTimestamp(row.updateTime),
  });

  systemUser.updateUserStatus(tmp).then((r) => {
    getPage(formInline);
  });
};

/**
 * 删除
 */
let deleteId = null;
const handleDelete = (index: number, row: Object) => {
  console.log(index, row);

  deleteId = row.id;
  centerDialogVisible.value = true;
};
const cancelDialogVisible = () => {
  deleteId = null;
  centerDialogVisible.value = false;
};
const confirmDialogVisible = () => {
  systemUser.deleteUser(deleteId);

  deleteId = null;
  centerDialogVisible.value = false;
  getPage(formInline);
};

/**
 *编辑对话框的显示
 */
const dialogFormVisible = (i: number, row: {}) => {
  userEditObj.value.showDialogFormVisible(i, row ? row.id : null);
  if (i === 2) {
  }
};

/**
 * 重置，局部刷新页面
 */
const reload: any = inject("reload");
const reset = () => {
  reload(); // (调用)
};
const reloadPage = () => {
  getPage(formInline);
};
provide("reloadPage", reloadPage);

onMounted(() => {});
</script>

<style lang="less" scoped>
@import url("./index.less");

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.input-with-select {
}
/deep/ .el-input .el-input--suffix {
  height: 40px;
}
</style>