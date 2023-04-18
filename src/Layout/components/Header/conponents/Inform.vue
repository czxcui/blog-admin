<template>
  <el-dropdown>
    <el-badge :value="12" class="item">
      <el-icon><sicon type="bell" /></el-icon>
    </el-badge>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Plus">通知</el-dropdown-item>
        <el-dropdown-item divided :icon="CirclePlusFilled">
          Action 2
        </el-dropdown-item>

        <el-dropdown-item divided :icon="CirclePlusFilled">
          Action 2
        </el-dropdown-item>
        <el-dropdown-item divided :icon="CirclePlus">Action 3</el-dropdown-item>
        <el-dropdown-item divided :icon="Check">Action 4</el-dropdown-item>
        <el-dropdown-item divided :icon="CircleCheck"
          >Action 5</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
</script>

<style lang="less" scoped>
.inform-item-title {
}
</style>