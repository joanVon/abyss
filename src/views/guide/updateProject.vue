<template>
  <div class="page-content update-project">
    <el-button class="page-back" icon="el-icon-arrow-left" circle @click="pageBack" size="small"></el-button>
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="工程信息" name="0">
        <el-form ref="infoForm" :model="form" label-width="200px">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-form-item label="工程名称">
                <el-cascader :options="cityInfo" v-model="form.selectedOptions" :props="props" :change-on-select="true" :clearable="true" @change="handleChange">
                </el-cascader>
              </el-form-item>
              <el-form-item label="工程属性">
                <el-select v-model="form.projectProperty">
                  <el-option label="老店类" value="0"></el-option>
                  <el-option label="新店类" value="1"></el-option>
                  <el-option label="改造类" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="店铺属性">
                <el-select v-model="form.storeProperty">
                  <el-option label="商场类" value="0"></el-option>
                  <el-option label="专卖店类" value="1"></el-option>
                  <el-option label="品牌展厅类" value="2"></el-option>
                  <el-option label="会所类" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="营业面积">
                <el-input placeholder="请输入内容" v-model="form.storeSquare">
                  <template slot="append">m</template>
                </el-input>
              </el-form-item>
              <el-form-item label="定金标准">
                <el-input placeholder="请输入内容" v-model="form.price">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="接单日期">
                <el-date-picker type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="测量日期">
                <el-date-picker type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="预开日期">
                <el-date-picker type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="客户属性">
                <el-select>
                  <el-option label="新客户" value="0"></el-option>
                  <el-option label="老客户" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户全名">
                <el-input placeholder="请输入内容" v-model="form.customerName"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input placeholder="请输入内容" v-model="form.customerTel"></el-input>
              </el-form-item>
              <el-form-item label="客户QQ">
                <el-input placeholder="请输入内容" v-model="form.qq"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="地名">
                <el-input placeholder="请输入内容" v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item label="甲方经理">
                <el-input placeholder="请输入内容" v-model="form.jiaManager"></el-input>
              </el-form-item>
              <el-form-item label="联系电话(甲方)">
                <el-input placeholder="请输入内容" v-model="form.telephone"></el-input>
              </el-form-item>
              <el-form-item label="商场经理">
                <el-input placeholder="请输入内容" v-model="form.marketManager"></el-input>
              </el-form-item>
              <el-form-item label="联系电话(商场)">
                <el-input placeholder="请输入内容" v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item label="接单人员">
                <el-input placeholder="请输入内容" v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item label="联系电话(接单)">
                <el-input placeholder="请输入内容" v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item label="测量人员">
                <el-input placeholder="请输入内容" v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item label="联系电话(测量)">
                <el-input placeholder="请输入内容" v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item label="设计部门">
                <el-input placeholder="请输入内容" v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item label="设计主管">
                <el-input placeholder="请输入内容" v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item label="联系电话(设计主管)">
                <el-input placeholder="请输入内容" v-model="form.tel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-alert title="尊敬的客户您好：" :description="alertTxt" center type="info" :closable="false">
          </el-alert>

          <el-form-item class="form-bottom-toolbar">
            <el-button type="primary" @click="submitForm('infoForm')" size="medium">保存</el-button>
            <el-button @click="resetForm('infoForm')" size="medium">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="工程造价" :disabled="!projectId" name="1">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="8">
            <div class="project-info">
              <span>工程名称：</span>
              <span>{{projectGrid.projectName}}</span>
            </div>

            <div class="project-info">
              <span>工程编号：</span>
              <span>{{projectGrid.projectNum}}</span>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="project-info">
              <span>工程地址：</span>
              <span>{{projectGrid.address}}</span>
            </div>
          </el-col>
        </el-row>

        <el-table :data="priceTable" border style="width: 100%" height="400" :summary-method="getSummaries" show-summary v-if="!isNextTable">
          <el-table-column label="序号" type="index" width="56">
          </el-table-column>
          <el-table-column label="单项名称">
            <template slot-scope="scope">
              <el-button v-if="scope.$index===0" @click="moveToNext(scope.$index, priceTable)" type="text">
                LOGO标识类造价表
              </el-button>
              <span v-else>
                税金
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="金额">
          </el-table-column>
          <el-table-column prop="unit" label="单位">
            <template slot-scope="scope">
              元
            </template>
          </el-table-column>
        </el-table>

        <!-- 下一阶段表格 -->
        <el-table :data="logoPriceTable" border style="width: 100%" max-height="700" :span-method="arraySpanMethod" sum-text="合计" show-summary v-if="isNextTable">
          <el-table-column label="序号" type="index" width="56">
          </el-table-column>
          <el-table-column prop="part" label="应用部位">
            <template slot-scope="scope">
              <el-select v-model="scope.part">
                <el-option label="头门LOGO" value="0"></el-option>
                <el-option label="收银台LOGO" value="1"></el-option>
                <el-option label="主形象LOGO" value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="duty" label="责任">
            <template slot-scope="scope">
              <el-select v-model="scope.duty">
                <el-option label="甲供甲装" value="0"></el-option>
                <el-option label="乙供乙装" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称">
            <template slot-scope="scope">
              <el-select v-model="scope.name">
                <el-option label="图边字" value="0"></el-option>
                <el-option label="迷你字" value="1"></el-option>
                <el-option label="刺绣字" value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="thick" label="字厚">
          </el-table-column>
          <el-table-column prop="border" label="边框工艺">
          </el-table-column>
          <el-table-column label="LOGO标识费">
            <el-table-column prop="logoNumber" label="数量">
            </el-table-column>
            <el-table-column prop="logoUnit" label="单位">
            </el-table-column>
            <el-table-column prop="logoUnivalent" label="单价">
            </el-table-column>
            <el-table-column prop="logoSubtotal" label="小计">
            </el-table-column>
          </el-table-column>

          <el-table-column label="电源费">
            <el-table-column prop="model" label="型号">
            </el-table-column>
            <el-table-column prop="powerNumber" label="数量">
            </el-table-column>
            <el-table-column prop="powerUnit" label="单位">
            </el-table-column>
            <el-table-column prop="powerUnivalent" label="单价">
            </el-table-column>
            <el-table-column prop="powerSubtotal" label="小计">
            </el-table-column>
          </el-table-column>

          <el-table-column label="安装费">
            <el-table-column prop="fixUnit" label="单位">
            </el-table-column>
            <el-table-column prop="fixUnivalent" label="单价">
            </el-table-column>
            <el-table-column prop="fixSubtotal" label="小计">
            </el-table-column>
          </el-table-column>
        </el-table>

        <div v-if="isNextTable" class="form-bottom-toolbar" style="line-height: 59px;">
          <el-button type="primary" @click="submitTable" size="medium">保存</el-button>
          <el-button @click="cancelTable" size="medium">取消</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cityData from '@/libs/city-data'
export default {
  name: 'UpdateInfo',
  data () {
    return {
      alertTxt: '我方将尽快安排工程负责人员落实好现场勘查、方案设计等事宜，望贵方积极配合我方人员的工作实施，祝您生意兴隆万事顺利！',
      activeName: 0,
      // projectId: '',  // add || id
      cityInfo: cityData,
      form: {
        city: '',
        erae: '',
        minerae: '',
        selectedOptions: [] // 地区筛选数组
      },
      props: {
        value: 'label',
        children: 'children'
      },

      // 工程造价
      projectGrid: {
        projectName: 'ddddd',
        address: '文一路1000号',
        projectNum: 'GC2018020701'
      },
      priceTable: [
        {
          price: '200'
        },
        {
          price: '30'
        }
      ],
      isNextTable: false,
      logoPriceTable: []
    }
  },
  computed: {
    projectId () {
      if (this.$route.params.id && this.$route.params.id !== 'add') {
        return this.$route.params.id
      } else {
        return ''
      }
    }
  },
  methods: {
    pageBack () {
      this.$router.push({name: 'Guide'})
    },
    tabClick () { },
    handleChange (value) {
      /* for (let y in this.cityInfo) {
        if (this.cityInfo[y].value === value) {
          this.form.selectedOptions = this.cityInfo[y].label
        }
      } */
      // console.log(this.form.selectedOptions)
      this.form.city = this.form.selectedOptions[0]
      this.form.erae = this.form.selectedOptions[1]
      this.form.minerae = this.form.selectedOptions[2]
    },
    // 计算总价
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },

    // 进入下个阶段
    moveToNext (index, data) {
      this.isNextTable = !this.isNextTable
    },

    cancelTable () {
      this.$confirm('确认离开此页操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isNextTable = false
      }).catch(() => { })
    }
  },
  mounted () {}
}
</script>



  