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
      <el-table-column fixed="left" prop="projectNumber" label="工程编号" v-if="showColumn">
        <template slot-scope="scope">
          <el-button @click="updaeInfo(scope.$index, scope.row)" type="text" size="small">
            {{ scope.row.projectNumber }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" v-if="showColumn">
      </el-table-column>
      <el-table-column prop="city" label="城市" v-if="showColumn">
      </el-table-column>
      <el-table-column prop="county" label="区/县/镇" v-if="showColumn">
      </el-table-column>
      <el-table-column prop="address" label="地址" v-if="showColumn">
      </el-table-column>
      <el-table-column prop="brandName" label="品牌名称" v-if="showColumn">
      </el-table-column>
      <el-table-column prop="customerName" label="客户姓名" v-if="showColumn">
      </el-table-column>
      <el-table-column prop="customerPhone" label="客户电话" v-if="showColumn">
      </el-table-column>
      <el-table-column prop="builtArea" label="店铺面积" v-if="showColumn">
      </el-table-column>
      <el-table-column prop="projectAttribute" label="工程属性" v-if="showColumn">
      </el-table-column>
      <el-table-column fixed="right" prop="storeAttribute" label="店铺属性" v-if="showColumn">
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
      showColumn: true,
      guideTable: [],
      checkAll: true,
      checkedColumns: [],
      columns: [],
      isIndeterminate: true
    }
  },

  watch: {
    // checkedColumns (nList) {
    //   console.log(nList)
    //   let tableColumns = this.$refs.guideTableRef.columns
    //   console.log(this.$refs.guideTableRef)

    //   let colLabels = []

    //   tableColumns.forEach(col => {
    //     colLabels.push(col.label)
    //     // if(col.label) {}
    //   })
    //   let difference = colLabels.concat(nList).filter(v => !colLabels.includes(v) || !nList.includes(v))
    //   console.log(difference)
    // }
  },
  methods: {
    // handleCheckAllChange (val) {
    //   this.checkedColumns = val ? this.columns : []
    //   this.isIndeterminate = false
    // },
    handleSingleChecked (checked, label) {
      console.log(checked)
      console.log(label)

      let tableColumns = this.$refs.guideTableRef.columns

      tableColumns.forEach(col => {
        let columnClass = document.getElementsByClassName(col.id)
        if (checked === false && col.label === label) {
          console.log(col)
          returnfalse
          // columnClass.forEach(cls => {
          //   cls.style.display = 'none'
          // })
          // for (let i in columnClass) {
          //   // columnClass[i].style.display = 'none'
          //   columnClass[i].hidden = true
          // }
        } else if (checked === true && col.label === label) {
          columnClass.forEach(cls => {
            cls.style.display = 'table-cell'
          })
        }
/* else {
          for (let j in columnClass) {
            // columnClass[j].style.display = 'table-cell'
            columnClass[j].hidden = false
          }
        } */
        // if(col.label) {}
      })

      // if(checked)
    },
    handleCheckedChange (value) {
      console.log(value)
      let tableColumns = this.$refs.guideTableRef.columns
      let colLabels = []
      tableColumns.forEach(col => {
        colLabels.push(col.label)
      })
      let difference = colLabels.concat(value).filter(v => !colLabels.includes(v) || !value.includes(v))
      console.log(difference)

      /* tableColumns.forEach(column => {
        if (difference.includes(column.label)) {  // 包含一样的标签
          console.log(document.querySelectorAll('.' + column.id))
          for (let i in document.querySelectorAll('.' + column.id)) {
            document.querySelectorAll('.' + column.id)[i].hidden = true
          }
        }
      }) */

      let checkedCount = value.length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length
    },
    queryTable () {
      proxy.getTotalPage().then(res => {
        this.guideTable = res.data && res.data
      })
    },
    newProject () {
      this.$router.push({ name: 'UpdateInfo', params: { id: 'add' } })
    },
    updaeInfo (index, row) {
      console.log(row)
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

    // this.handleCheckAllChange(true)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
