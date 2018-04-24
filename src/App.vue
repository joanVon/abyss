<template>
  <div id="app">
    <Layout v-if="noHeader"></Layout>
    <router-view v-else />
  </div>
</template>

<script>
import Layout from '@/components/layout'
export default {
  name: 'app',
  components: { Layout },
  data () {
    return {
      noHeader: false
    }
  },
  watch: {
    '$route' (to, from) {
      let module = to.path.split('/')[1]
      // console.log(module)
      switch (module) {
        case undefined: this.noHeader = false
          break
        case '': this.noHeader = false
          break
        default: this.noHeader = true
          break
      }
    }
  },
  beforeMount () {
    let module = this.$route.path.split('/')[1]
    switch (module) {
      case undefined: this.noHeader = false
        break
      case '': this.noHeader = false
        break
      default: this.noHeader = true
        break
    }
  }
}
</script>

<style>
#app {
  position: relative;
  font-family: Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  height: 100%;
  width: 100%;
}
</style>
