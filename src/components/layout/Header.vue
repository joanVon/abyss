<template>
  <header class="layout-header">
    <div class="layout-header-btns">
      <!-- <el-button type="iconButton" icon="h-icon-about"></el-button>
      <el-button type="iconButton" icon="h-icon-help"></el-button>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-button type="iconButton" icon="h-icon-user"></el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, $index) in userItems" :key="$index" :divided="$index === 2" :disabled="item.disabled">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </header>
</template>

<script>
import './style.less'
export default {
  name: 'Header',
  data () {
    return {
      userItems: [
        { name: 'User Name', disabled: false },
        { name: 'User Information', disabled: false },
        { name: 'Logout', disabled: false }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
