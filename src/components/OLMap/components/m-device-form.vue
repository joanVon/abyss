<template>
  <el-form :model="deviceForm" label-width="65px" style="width:260px">
    <el-form-item label="设备类型:">
      <el-radio-group v-model="deviceForm.type">
        <el-radio label="video">监控点设备</el-radio>
        <el-radio label="env">环境量设备</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="设备名称:">
      <el-select v-model="deviceForm.deviceId" placeholder="请选择" @change="hdChange">
        <el-option v-for="item in deviceOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="坐标集合:">
      <el-scrollbar>
        {{JSON.stringify(deviceData.point)}}
      </el-scrollbar>
    </el-form-item>
    <el-row style="text-align: right;">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="save">保存</el-button>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'm-device-form',
  props: {
    deviceData: {
      point: '',
      deviceId: '',
      deviceType: ''
    }
  },
  data () {
    return {
      deviceOptions: [{
        name: '设备1',
        id: 'v1111'
      }, {
        name: '设备2',
        id: 'v1112'
      }, {
        name: '设备3',
        id: 'v1113'
      }],
      deviceForm: {
        deviceId: '',
        type: 'video'
      }
    }
  },
  watch: {

  },
  mounted () {

  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    save () {
      let filterItem = this.deviceOptions.filter((item) => { return item.id === this.deviceForm.deviceId })
      this.deviceForm.name = filterItem.length ? filterItem[0].name : ''
      this.$emit('save', this.deviceForm)
    },
    hdChange (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

