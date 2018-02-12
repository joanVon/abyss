<template>
  <div id="app">
    <Layout></Layout>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Layout from '@/components/layout/index'
export default {
  name: 'app',
  components: { Layout }
}
</script>

<style>
#app {
  position: relative;
  font-family: Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  height: 100%;
  width: 100%;
  /* margin-top: 60px; */
}
</style>
