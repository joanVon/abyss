<template>
  <div class="guide">
    <el-scrollbar wrap-class="layout-article" :size="5" :opcity="0.2" tag="article">
      <!-- <section v-for="(sec, $index) in sections" class="guide-section" :class="'section-floor-'+($index+1)">{{sec.title}}</section> -->

      <el-button>主要按钮</el-button>
    </el-scrollbar>
  </div>
</template>

<script>
import './style.less'
export default {
  name: 'Guide',
  // components: { Layout },
  data () {
    return {
      userItems: [
        { name: 'User Name', disabled: false },
        { name: 'User Information', disabled: false },
        { name: 'Logout', disabled: false }
      ],
      sections: [
        { 'title': this.$t('m.title'), 'desc': 'aaaaaaaaaaa' },
        { 'title': 'B', 'desc': 'bbbbbbbbbbb' },
        { 'title': 'C', 'desc': 'ccccccccccc' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
