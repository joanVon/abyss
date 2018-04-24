<template>
  <!-- <Container></Container> -->

  <div class="layout-view">
    <Header></Header>
    <!-- <nav class="layput-sidebar"></nav> -->
    <div class="layout-container">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>

import Header from './Header'
export default {
  name: 'Layout',
  components: { Header },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.layout-container {
  padding-top: 60px;
}
</style>
