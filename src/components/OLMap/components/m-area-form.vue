<template>
  <el-form :model="areaForm" label-width="65px" style="width:240px">
    <el-form-item label="区域名称:">
      <el-input v-model="areaForm.name"></el-input>
    </el-form-item>
    <el-form-item label="区域面积:">
      <el-input v-model="areaData.areaValue"></el-input>
    </el-form-item>
    <el-form-item label="区域类型:">
      <el-radio-group v-model="areaForm.type">
        <el-radio label="generalArea">普通区域</el-radio>
        <el-radio label="dangerArea">危险区域</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="坐标集合:">
      <el-scrollbar>
        {{JSON.stringify(areaData.areaPoints)}}
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
  name: 'm-area-form',
  props: {
    areaData: {
      areaPoints: '',
      areaValue: ''
    }
  },

  data () {
    return {
      areaForm: {
        name: '',
        areaValue: '',
        type: 'generalArea',
        areaPoints: ''
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
      this.$emit('save', Object.assign({}, this.areaForm, { saveId: '10001' }))
    }
  }
}
</script>
<style lang="less" scoped>
</style>

