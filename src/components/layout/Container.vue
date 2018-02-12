<template>
  <div class="layout-container">
    <Header></Header>
    <nav class="layput-sidebar"></nav>
    <router-view></router-view>
    
  </div>
</template>

<script>
import Header from './Header'
export default {
  name: 'Container',
  components: { Header },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  height: inherit;
}
</style>
