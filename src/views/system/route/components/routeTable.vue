<template>
  <div class="route-table">
    <el-table
      :data="tableData"
      row-key="id"
      border
      default-expand-all
      height="640"
      style="width: 100%"
      lazy
    >
      <el-table-column prop="name" label="权限名称" />
      <el-table-column prop="title" label="权限名称" />
      <el-table-column prop="type" label="权限类型" />
      <el-table-column prop="url" label="权限路由" />
      <el-table-column prop="permission" label="权限标识" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
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
    <routeEdit ref="editObject" />
    <el-dialog v-model="centerDialogVisible" title="警告" width="20%" center>
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
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, reactive, ref } from "vue";
import { SystemRoute, Permission } from "./SystemRoute";
import routeEdit from "./routeEditAndAdd.vue";

const systemRoute = new SystemRoute();

let tableData: Permission[] = reactive([]);
const editObject = ref(null);
onMounted(() => {
  funTableData();
});


const funTableData = () => {
  systemRoute.getPermissionList().then((r) => {
    tableData.push(...r);
  });
};
const handleEdit = (index: number, row: Permission) => {
  editObject.value.showDialogFormVisible(2,row.id);
};

let deleteId = 0;
const centerDialogVisible = ref(false);
const handleDelete = (index: number, row: Permission) => {
  // console.log(index, row);
  deleteId = row.id;
  centerDialogVisible.value = !centerDialogVisible.value;
};

const cancelDialogVisible = () => {
  deleteId = 0;
  centerDialogVisible.value = false;
};
const confirmDialogVisible = () => {
  systemRoute.delete(deleteId);
  deleteId = 0;
  centerDialogVisible.value = false;
};

// const load = (
//   row: Permission,
//   treeNode: unknown,
//   resolve: (date: Permission[]) => void
// ) => {
//   setTimeout(() => {
//     resolve([
//       {
//         id: 31,
//         date: "2016-05-01",
//         name: "wangxiaohu",
//         address: "No. 189, Grove St, Los Angeles",
//       },
//       {
//         id: 32,
//         date: "2016-05-01",
//         name: "wangxiaohu",
//         address: "No. 189, Grove St, Los Angeles",
//       },
//     ]);
//   }, 1000);
// };
</script>


<style lang="less" scoped>
.route-table {
  width: 96%;
  //   flex: 1;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
/deep/ .el-dialog--center .el-dialog__body {
  text-align: center;
}
</style>