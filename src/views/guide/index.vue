<template>
  <div class="guide">
    <!-- <el-scrollbar wrap-class="layout-article" tag="article"> -->
      <!-- <section v-for="(sec, $index) in sections" class="guide-section" :class="'section-floor-'+($index+1)">{{sec.title}}</section> -->

      <el-button>主要按钮</el-button>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import './style.less'
import proxy from './proxy'
export default {
  name: 'Guide',
  // components: { Layout },
  data () {
    return {

    }
  },

  mounted () {
    proxy.getTotalPage().then(res => {
      console.log(res.data.data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
