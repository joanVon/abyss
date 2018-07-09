<template>
  <div class='handle-box'>
    <div class='operate'>
      <el-button @click="editArea" :type="editAreaActive? 'primary': ''">区域编辑</el-button>
      <el-button @click="bindDevice" :type="bindDeviceActive? 'primary': ''">设备标记</el-button>
    </div>
    <div class="legends">
      <ul>
        <li class="normal" :class="{active: actives.indexOf('generalArea')> -1}" @click="hdLegendClick('generalArea')">
          <i class="square"></i>
          <span>普通区域</span>
        </li>
        <li class="danger" :class="{active: actives.indexOf('dangerArea')> -1}" @click="hdLegendClick('dangerArea')">
          <i class="square"></i>
          <span>危险区域</span>
        </li>
        <li class="video" :class="{active: actives.indexOf('video')> -1}" @click="hdLegendClick('video')">
          <i class="mapIcon map-video"></i>
          <span>监控点</span>
        </li>
        <li class="env" :class="{active: actives.indexOf('env')> -1}" @click="hdLegendClick('env')">
          <i class="mapIcon map-env"></i>
          <span>环境量设备</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'm-handle',
  data () {
    return {
      editAreaActive: false,
      bindDeviceActive: false,
      actives: []
    }
  },
  methods: {
    editArea () {
      this.editAreaActive = !this.editAreaActive
      if (this.bindDeviceActive && this.editAreaActive) {
        this.bindDevice()
      }
      this.$emit('editArea', this.editAreaActive)
    },
    bindDevice () {
      this.bindDeviceActive = !this.bindDeviceActive
      if (this.editAreaActive && this.bindDeviceActive) {
        this.editArea()
      }
      this.$emit('bindDevice', this.bindDeviceActive)
    },
    hdLegendClick (item) {
      let index = this.actives.indexOf(item)
      if (index > -1) {
        this.actives.splice(index, 1)
      } else {
        this.actives.push(item)
      }
      this.$emit('legendClick', this.actives)
    }
  }
}
</script>
<style lang="less" scoped>
.operate {
  margin-bottom: 20px;
}
.legends {
  width: 250px;
  box-sizing: border-box;
  margin-left: -25px;
  border-radius: 15px;
  padding: 20px 25px 12px 25px;
  background: rgba(243, 241, 241, 0.67);
  overflow: hidden;
  li {
    float: left;
    width: 100px;
    color: #333;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 8px;
    cursor: pointer;
    * {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
    }
    i {
      width: 20px;
      height: 20px;
    }
    &.active {
      color: #9e680c;
      &.normal i{
        background: green;
      }
      &.danger i{
        background: red;
      }
    }
  }
  .square {
    width: 12px;
    height: 12px;
    border: 1px solid #666;
    background: #eee;
    margin-right: 5px;
  }
}
</style>
