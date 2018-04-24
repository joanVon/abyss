<template>
  <header class="layout-header">
    <div class="layout-header-logo">ERP</div>
    <div class="layout-header-btns">
      <el-button icon="el-icon-setting" circle></el-button>
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
