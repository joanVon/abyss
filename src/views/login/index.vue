<template>
  <div class="login-page">
    <div class="login-content">

      <el-form ref="loginForm" :model="loginForm" label-width="80px">
        <el-form-item label="">
          <el-input disabled v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input type="password" disabled v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button @click="login" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  // components: { Layout },
  data () {
    return {
      loginForm: {
        userName: 'username',
        password: 'dddddd'
      }
    }
  },
  methods: {
    login () {
      this.$router.push({ name: 'Guide' })
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  height: 100%;
  .login-content {
    width: 460px;
    height: inherit;
    margin: 0 auto;
    transform: translate(0, 30%);
  }
}
</style>