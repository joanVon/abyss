<template>
  <div class="page-content guide">
    <div class="table-operate-bar">
      <el-button type="text" icon="el-icon-plus" @click="newProject">新建工程</el-button>
    </div>
    <div class="table-operate-column">
      <!-- <el-checkbox class="check-all-columns" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
      <!-- <el-checkbox-group v-model="checkedColumns" @change="handleCheckedChange">
        <el-checkbox v-for="(column, $index) in columns" :label="column" :key="$index">{{column}}</el-checkbox>
      </el-checkbox-group> -->

      <el-checkbox v-for="(column, $index) in columns" checked :label="column" :key="$index" @change="handleSingleChecked($event, column)">{{column}}</el-checkbox>
    </div>
    <el-table ref="guideTableRef" :data="guideTable" border stripe style="width: 100%" max-height="800">
      <el-table-column prop="projectNumber" label="工程编号">
        <template slot-scope="scope">
          <el-button @click="updaeInfo(scope.$index, scope.row)" type="text" size="small">
            {{ scope.row.projectNumber }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份">
      </el-table-column>
      <el-table-column prop="city" label="城市">
      </el-table-column>
      <el-table-column prop="county" label="区/县/镇">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="brandName" label="品牌名称">
      </el-table-column>
      <el-table-column prop="customerName" label="客户姓名">
      </el-table-column>
      <el-table-column prop="customerPhone" label="客户电话">
      </el-table-column>
      <el-table-column prop="builtArea" label="店铺面积">
      </el-table-column>
      <el-table-column prop="projectAttribute" label="工程属性">
      </el-table-column>
      <el-table-column prop="storeAttribute" label="店铺属性">
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
    handleSingleChecked (checked, label) {
      let tableColumns = this.$refs.guideTableRef.columns

      tableColumns.forEach(col => {
        let columnClass = document.getElementsByClassName(col.id)
        if (checked === false && col.label === label) {
          for (let idx = 0; idx < columnClass.length; idx++) {
            let ccls = columnClass[idx]
            ccls.style.display = 'none'
          }
        } else if (checked === true && col.label === label) {
          for (let idx = 0; idx < columnClass.length; idx++) {
            let ccls = columnClass[idx]
            ccls.style.display = 'table-cell'
          }
        }
      })
    },
    /* handleCheckedChange (value) {
      let tableColumns = this.$refs.guideTableRef.columns
      let colLabels = []
      tableColumns.forEach(col => {
        colLabels.push(col.label)
      })
      let difference = colLabels.concat(value).filter(v => !colLabels.includes(v) || !value.includes(v))
      console.log(difference)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length
    }, */
    queryTable () {
      proxy.getTotalPage().then(res => {
        this.guideTable = res.data && res.data
      })
    },
    newProject () {
      this.$router.push({ name: 'UpdateInfo', params: { id: 'add' } })
    },
    updaeInfo (index, row) {
      this.$router.push({ name: 'UpdateInfo', params: { id: row.id } })
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
  }
}
</script>