<template>
  <div class="page-content guide">
    <div class="table-operate-bar">
      <el-button type="text" icon="el-icon-plus" @click="newProject">新建工程</el-button>
    </div>
    <div class="table-operate-column">
      <el-checkbox class="check-all-columns" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedColumns" @change="handleCheckedChange">
        <el-checkbox v-for="(column, $index) in columns" :label="column" :key="$index">{{column}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <el-table ref="guideTableRef" :data="guideTable" border stripe style="width: 100%" max-height="800">
      <el-table-column fixed="left" prop="projectNo" label="工程编号" width="100">
        <template slot-scope="scope">
        <el-button
          @click="updaeInfo(scope.$index, scope.row)"
          type="text"
          size="small">
          {{ scope.row.projectNo }}
        </el-button>
      </template>
      </el-table-column>
      <el-table-column prop="prov" label="省份">
      </el-table-column>
      <el-table-column prop="city" label="城市">
      </el-table-column>
      <el-table-column prop="area" label="区/县/镇">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="brandName" label="品牌名称">
      </el-table-column>
      <el-table-column prop="customerName" label="客户姓名">
      </el-table-column>
      <el-table-column prop="customerTel" label="客户电话">
      </el-table-column>
      <el-table-column prop="storeSquare" label="店铺面积">
      </el-table-column>
      <el-table-column prop="projectProperty" label="工程属性">
      </el-table-column>
      <el-table-column fixed="right" prop="storeProperty" label="店铺属性">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import './style.less'
import proxy from './proxy'
export default {
  name: 'Guide',
  data () {
    return {
      guideTable: [],
      checkAll: true,
      checkedColumns: [],
      columns: [],
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedColumns = val ? this.columns : []
      this.isIndeterminate = false
    },
    handleCheckedChange (value, event) {
      let tableColumns = this.$refs.guideTableRef.columns
      let colLabels = []
      tableColumns.forEach(col => {
        colLabels.push(col.label)
      })
      // let difference = colLabels.concat(value).filter(v => !colLabels.includes(v) || !value.includes(v))
      // console.log(difference)

      let checkedCount = value.length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length
    },
    queryTable () {
      proxy.getTotalPage().then(res => {
        // console.log(res.data)
        this.guideTable = res.data && res.data.rows
      })
    },
    newProject () {
      this.$router.push({name: 'UpdateInfo', params: {id: 'add'}})
    },
    updaeInfo (index, row) {
      console.log(row)
      this.$router.push({name: 'UpdateInfo', params: {id: row.projectId}})
    }
  },
  beforeMount () {
    this.queryTable()
  },
  mounted () {
    let tableCols = this.$refs.guideTableRef.columns
    this.columns = []
    tableCols.forEach(col => {
      this.columns.push(col.label)
    })

    this.handleCheckAllChange(true)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
