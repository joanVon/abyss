<template>
  <div class="page-content update-project">
    <el-button class="page-back" icon="el-icon-arrow-left" circle @click="pageBack" size="small"></el-button>
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="工程信息" name="0">
        <el-form ref="infoForm" :model="form" label-width="200px" style="padding-bottom: 12px;">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-form-item label="品牌名称" :rules="[{ required: true, message: '请输入品牌名称', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.brandName">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-form-item label="工程名称" :rules="[{ required: true, message: '请输入工程名称', trigger: 'blur' }]">
                <el-cascader :options="cityInfo" placeholder="省(直辖市)/市/区" v-model="selectedOptions" :props="props" :change-on-select="true" :clearable="true" @change="handleChange">
                </el-cascader>
              </el-form-item>
              <el-form-item label="工程属性" :rules="[{ required: true, message: '请选择属性', trigger: 'blur' }]">
                <el-select v-model="form.projectAttribute">
                  <el-option label="老店类" value="老店类"></el-option>
                  <el-option label="新店类" value="新店类"></el-option>
                  <el-option label="改造类" value="改造类"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="店铺属性" :rules="[{ required: true, message: '请选择属性', trigger: 'blur' }]">
                <el-select v-model="form.storeAttribute">
                  <el-option label="商场类" value="商场类"></el-option>
                  <el-option label="专卖店类" value="专卖店类"></el-option>
                  <el-option label="品牌展厅类" value="品牌展厅类"></el-option>
                  <el-option label="会所类" value="会所类"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="营业面积" :rules="[{ required: true, message: '请输入面积', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.builtArea">
                  <template slot="append">㎡</template>
                </el-input>
              </el-form-item>
              <el-form-item label="定金标准" :rules="[{ required: true, message: '请输入定金标准', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.depositStandard">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="接单日期" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.orderAcceptTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="测量日期" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.measuringTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="预开日期" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.predictStartTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="客户属性" :rules="[{ required: true, message: '请选择客户属性', trigger: 'blur' }]">
                <el-select v-model="form.customerAttribute">
                  <el-option label="新客户" value="新客户"></el-option>
                  <el-option label="老客户" value="老客户"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户全名" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.customerName"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" :rules="[{ required: true, message: '请输入电话', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.customerPhone"></el-input>
              </el-form-item>
              <el-form-item label="客户QQ" :rules="[{ required: true, message: '请输入QQ', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.customerQq"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="地名" :rules="[{ required: true, message: '请输入地名', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item label="甲方经理" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.firstPartManagerName"></el-input>
              </el-form-item>
              <el-form-item label="电话(甲方)" :rules="[{ required: true, message: '请输入电话', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.firstPartManagerPhone"></el-input>
              </el-form-item>
              <el-form-item label="商场经理" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.mallManagerName"></el-input>
              </el-form-item>
              <el-form-item label="电话(商场)" :rules="{ required: true, message: '请输入电话', trigger: 'blur' }">
                <el-input placeholder="请输入内容" v-model="form.mallManagerPhone"></el-input>
              </el-form-item>
              <el-form-item label="接单人员" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
                <el-input placeholder="请输入内容" v-model="form.orderPersonnelName"></el-input>
              </el-form-item>
              <el-form-item label="电话(接单)" :rules="{ required: true, message: '请输入电话', trigger: 'blur' }">
                <el-input placeholder="请输入内容" v-model="form.orderPersonnelPhone"></el-input>
              </el-form-item>
              <el-form-item label="测量人员" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
                <el-input placeholder="请输入内容" v-model="form.measuringStaffName"></el-input>
              </el-form-item>
              <el-form-item label="电话(测量)" :rules="{ required: true, message: '请输入电话', trigger: 'blur' }">
                <el-input placeholder="请输入内容" v-model="form.measuringStaffPhone"></el-input>
              </el-form-item>
              <el-form-item label="设计部门" :rules="{ required: true, message: '请输入部门名称', trigger: 'blur' }">
                <el-input placeholder="请输入内容" v-model="form.designDepartment"></el-input>
              </el-form-item>
              <el-form-item label="设计主管" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
                <el-input placeholder="请输入内容" v-model="form.designDepartmentManagerName"></el-input>
              </el-form-item>
              <el-form-item label="电话(设计主管)" :rules="{ required: true, message: '请输入电话', trigger: 'blur' }">
                <el-input placeholder="请输入内容" v-model="form.designDepartmentManagerPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-alert class="info-form-alert" title="尊敬的客户您好：" :description="alertTxt" center type="info" :closable="false">
          </el-alert>
          <!-- 更新工程信息表单操作 add -->
          <el-form-item class="form-bottom-toolbar" v-if="!projectId">
            <el-button type="primary" @click="newProjectInfo('infoForm')" size="medium">保存</el-button>
            <el-button @click="cancelPanel" size="medium">取消</el-button>
          </el-form-item>
          <el-form-item class="form-bottom-toolbar" v-if="projectId">
            <el-button type="primary" @click="modifyInfo" size="medium">保存</el-button>
            <el-button @click="cancelPanel" size="medium">取消</el-button>
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
              <span>{{projectGrid.projectNumber}}</span>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="project-info">
              <span>工程地址：</span>
              <span>{{projectGrid.address}}</span>
            </div>
          </el-col>
        </el-row>

        <el-table :data="projectGrid.itemList" border style="width: 100%" height="400" :summary-method="getSummaries" show-summary v-if="!isNextTable">
          <el-table-column label="序号" type="index" width="56">
          </el-table-column>
          <el-table-column prop="name" label="单项名称">
            <template slot-scope="scope">
              <span v-if="scope.$index === projectGrid.itemList.length-1">
                税金
              </span>
              <el-button v-else @click="moveToNext(scope.$index, priceTable)" type="text">
                {{scope.row.name}}
              </el-button>
            </template>

          </el-table-column>
          <el-table-column prop="price" label="金额">
          </el-table-column>
          <el-table-column label="单位">
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
import _ from 'lodash'
import cityData from '@/libs/city-data'
import proxy from './proxy'
export default {
  name: 'UpdateInfo',
  data () {
    return {
      alertTxt: '我方将尽快安排工程负责人员落实好现场勘查、方案设计等事宜，望贵方积极配合我方人员的工作实施，祝您生意兴隆万事顺利！',
      activeName: 0,
      cityInfo: cityData,
      selectedOptions: [], // 地区筛选数组
      form: {
        province: '', city: '', county: '', address: '', builtArea: 0, brandName: '', customerAttribute: '', customerName: '', customerPhone: '', customerQq: '', depositStandard: 0, designDepartment: '', designDepartmentManagerName: '', designDepartmentManagerPhone: '', firstPartManagerName: '', firstPartManagerPhone: '', mallManagerName: '', mallManagerPhone: '', measuringStaffName: '', measuringStaffPhone: '', measuringTime: '', orderAcceptTime: '', orderPersonnelName: '', orderPersonnelPhone: '', predictStartTime: '', projectAttribute: '', storeAttribute: ''
      },
      originKeys: [],
      // 区域对应配置参数
      props: {
        value: 'label',
        children: 'children'
      },

      // 工程造价
      projectGrid: {
        projectName: '',
        address: '',
        projectNumber: '',
        itemList: [
          {name: 'LOGO标识类造价表', price: 200},
          {name: 'LOGO标识类造价表1', price: 10},
          {name: 'LOGO标识类造价表2', price: 60}
        ],
        tax: 0,
        total: 0
      },
      /* priceTable: [
        {
          price: '200'
        },
        {
          price: '30'
        }
      ], */
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
  watch: {
    activeName (nActive) {
      if (nActive === '1') {
        this.getCostById()
      }
    }
  },
  methods: {
    pageBack () {
      this.$router.push({ name: 'Guide' })
    },
    // Tab 切换
    tabClick (e) {
      // console.log(e)
    },
    // 造价详情
    getCostById () {
      proxy.getCostDetailById(this.projectId).then(res => {
        let resData = res.data
        console.log(resData)
        Object.assign(this.projectGrid, resData)
        this.projectGrid.itemList.push({name: '税金', price: resData.tax})
      })
      // this.projectGrid.itemList.push({name: '税金', price: 99})
    },
    // 获取单个工程详情
    getProjectById () {
      proxy.getDetailById(this.projectId).then(res => {
        let resData = res.data
        Object.assign(this.form, resData)
        this.form = _.pick(resData, this.originKeys)
        // console.log(this.form)

        this.selectedOptions = [this.form.province, this.form.city, this.form.county]
      })
    },
    // 新建表单
    newProjectInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          proxy.addProject(this.form).then(res => {
            // console.log(res.data.ret)
            this.$router.push({ name: 'Guide' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    modifyInfo () {
      proxy.modifyProject(this.projectId, this.form).then(res => {
        console.log(res.data)
      })
    },
    cancelPanel () {
      this.$confirm('确认离开此页操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ name: 'Guide' })
      }).catch(() => { })
    },
    // 省市区选择
    handleChange (value) {
      this.form.province = this.selectedOptions[0]
      this.form.city = this.selectedOptions[1]
      this.form.county = this.selectedOptions[2]
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
  mounted () {
    this.originKeys = Object.keys(this.form)
    if (this.projectId) {
      this.getProjectById()
    }
  }
}
</script>



  