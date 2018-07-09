<template>
  <div class='handle-box'>
    <ul class='operate'>
      <li v-for="(item, index) in buttons" :key="index" @click="opClick(item.bt)">
        <el-button :type="returnBtType(item.bt)">{{item.name}}</el-button>
      </li>
    </ul>
    <ul class="legends">
      <li v-for="(item, index) in legends" :key="index" @click="legendClick(item.type)" :class="[item.type, actives.indexOf(item.type) > -1 ? 'active': '']">
        <i :class="item.iClass"></i>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'm-handle-new',
  data () {
    return {
      actives: [],
      activeButton: '',
      buttons: [
        { name: '区域添加', bt: 'areaAdd' },
        // { name: '区域修改', bt: 'areaEdit' },
        { name: '设备点添加', bt: 'devicePointAdd' }
        // { name: '设备点修改', bt: 'devicePointEdit' },
      ],
      legends: [
        { name: '普通区域', type: 'generalArea', iClass: 'square' },
        { name: '危险区域', type: 'dangerArea', iClass: 'square' },
        { name: '监控点', type: 'video', iClass: 'mapIcon map-video' },
        { name: '环境量设备', type: 'env', iClass: 'mapIcon map-env' }
      ]
    }
  },
  methods: {
    opClick (curActive) {
      let lastActive = this.activeButton
      if (curActive === lastActive) {
        curActive = ''
      }
      this.activeButton = curActive
      this.$emit('opClick', { lastActive, curActive })
    },
    returnBtType (curBt) {
      return curBt === this.activeButton ? 'primary' : ''
    },
    legendClick (item) {
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
  display: block;
  margin: 0 -20px 20px 0;
  li {
    float: left;
    margin: 0 20px 20px 0;
  }
}
.legends {
  width: 250px;
  float: right;
  box-sizing: border-box;
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
      &.generalArea i {
        background: green;
      }
      &.dangerArea i {
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
