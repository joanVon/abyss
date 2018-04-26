<template>
  <!-- <Container></Container> -->

  <div class="layout-view">
    <Header></Header>
    <el-button class="collapse-menu-btn" :class="isCollapse===false ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'" @click="isCollapse = !isCollapse"></el-button>
    <nav class="layput-sidebar">
      <el-menu default-active="/guide" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#333744" text-color="#f8f8f8" active-text-color="#fff">
        <el-menu-item index="/guide">
          <i class="el-icon-menu"></i>
          <span slot="title">工程信息概览</span>
        </el-menu-item>
        <!-- <el-submenu index="/guide">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-menu-item index="2" disabled>
          <i class="el-icon-news"></i>
          <!-- <span slot="title">导航二</span> -->
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <!-- <span slot="title">导航三</span> -->
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-setting"></i>
          <!-- <span slot="title">导航四</span> -->
        </el-menu-item>
      </el-menu>
    </nav>

    <div class="layout-container" :class="{'container-collapse': isCollapse}">
      <div class="page"><router-view></router-view></div>
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
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.layout-view {
  position: relative;
  height: 100%;
}
.collapse-menu-btn {
  position: absolute;
  bottom: 32px;
  left: 0;
  color: #f8f8f8;
  z-index: 2;
  font-size: 20px;
  padding: 0 0 0 20px;
  background: none;
  border: 0 none;

  &:hover {
    color: #fff;
  }
}
.layput-sidebar {
  max-width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 60px;
  z-index: 1;

  .el-menu {
    height: inherit;
  }
}
.layout-container {
  padding-top: 60px;
  padding-left: 210px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &.container-collapse {
    padding-left: 75px;
  }

  .page {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-left: inherit;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
