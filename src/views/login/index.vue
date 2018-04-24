<template>
  <div class="login-page">
    <el-button @click="login">跳转</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  // components: { Layout },
  data () {
    return {
    }
  },
  methods: {
    login () {
      this.$router.push({name: 'Guide'})
    }
  }
}
</script>