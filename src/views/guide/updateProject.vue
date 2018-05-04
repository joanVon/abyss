<template>
  <div class="page-content update-project">
    <el-button class="page-back" icon="el-icon-arrow-left" circle @click="pageBack" size="small"></el-button>
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="工程信息" name="0">
        <el-form ref="infoForm" :model="form" label-width="200px" style="padding-bottom: 12px;">
          <!-- <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-form-item label="品牌名称" :rules="[{ required: true, message: '请输入品牌名称', trigger: 'blur' }]">
                <el-input placeholder="请输入内容" v-model="form.brandName">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row> -->
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-form-item label="工程名称" :rules="[{ required: true, message: '请输入工程名称', trigger: 'blur' }]">
                <el-cascader :options="cityInfo" placeholder="省(直辖市)/市/区" v-model="selectedOptions" :props="props" :change-on-select="true" :clearable="true" @change="handleChange">
                </el-cascader>
              </el-form-item>
              <el-form-item label="品牌名称" :rules="[{ required: true, message: '请选择品牌名称', trigger: 'blur' }]">
                <el-select v-model="form.brandName">
                  <el-option label="中国黄金" value="中国黄金"></el-option>
                  <el-option label="六桂福" value="六桂福"></el-option>
                </el-select>
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
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.orderAcceptTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="测量日期" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.measuringTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="预开日期" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.predictStartTime">
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
          <el-form-item class="form-bottom-toolbar" v-if="!projectId" label-width="0px">
            <el-button type="primary" @click="newProjectInfo('infoForm')" size="medium">保存</el-button>
            <el-button @click="cancelPanel" size="medium">取消</el-button>
          </el-form-item>
          <el-form-item class="form-bottom-toolbar" v-if="projectId" label-width="0px">
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
          <el-table-column prop="itemName" label="单项名称">
            <template slot-scope="scope">
              <span v-if="scope.$index === projectGrid.itemList.length-1">
                税金
              </span>
              <el-button v-else @click="moveToNext(scope.$index, scope.row)" type="text">
                {{scope.row.itemName}}
              </el-button>
            </template>

          </el-table-column>
          <el-table-column prop="costMoney" label="金额">
          </el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              元
            </template>
          </el-table-column>
        </el-table>

        <!-- LOGO造价 -->
        <el-table :data="logoProjectTable" style="width: 100%" border height="700px" :span-method="arraySpanMethod" header-row-class-name="table-header-center" sum-text="合计" show-summary v-show="isNextTable&&itemType===1">
          <el-table-column label="#" width="56" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-plus" @click="newTableRow(scope.$index)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="applyPart" label="应用部位" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.applyPart">
                <el-option v-for="apply in applyPartEnums" :key="apply.name" :label="apply.name" :value="apply.name"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="response" label="责任" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.response">
                <el-option v-for="response in responseEnums" :key="response.name" :label="response.name" :value="response.name"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="fontName" label="名称" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.fontName">
                <el-option v-for="fontName in fontNameEnums" :key="fontName.name" :label="fontName.name" :value="fontName.name"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="wordThickness" label="字厚" width="80">
          </el-table-column>
          <el-table-column prop="borderCraft" label="边框工艺">
          </el-table-column>
          <el-table-column label="LOGO标识费">
            <el-table-column prop="logoCount" label="数量" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.logoCount" @change="calculateLogo(scope.$index, scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="80">
            </el-table-column>
            <el-table-column prop="logoUnitPrice" label="单价" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.logoUnitPrice" @change="calculateLogo(scope.$index, scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="logoCostSummary" label="小计" width="80">
            </el-table-column>
          </el-table-column>

          <el-table-column label="电源费">
            <el-table-column prop="powerModel" label="型号">
              <template slot-scope="scope">
                <el-select v-model="scope.row.powerModel">
                  <el-option v-for="powerModel in powerModelEnums" :key="powerModel.name" :label="powerModel.name" :value="powerModel.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="powerCount" label="数量" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.powerCount" @change="calculatePower(scope.$index, scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="80">
            </el-table-column>
            <el-table-column prop="powerUnitPrice" label="单价" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.powerUnitPrice" @change="calculatePower(scope.$index, scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="powerCostSummary" label="小计" width="80">
            </el-table-column>
          </el-table-column>

          <el-table-column label="安装费">
            <el-table-column label="单位" width="80">
            </el-table-column>
            <el-table-column prop="installationUnitPrice" label="单价" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.installationUnitPrice" @change="calculateInstallation(scope.$index, scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="installationCostSummary" label="小计" width="80">
            </el-table-column>
          </el-table-column>
        </el-table>

        <!-- 灯具类 -->
        <el-table :data="logoProjectTable" style="width: 100%" border height="700px" :span-method="arraySpanMethod" header-row-class-name="table-header-center" sum-text="合计" show-summary v-show="isNextTable&&itemType===2">
          <el-table-column label="#" width="56" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-plus" @click="newTableRow(scope.$index)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="applyPart" label="应用部位ddd" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.applyPart">
                <el-option v-for="apply in lampApplyPartEnums" :key="apply.name" :label="apply.name" :value="apply.name"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="response" label="责任" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.response">
                <el-option v-for="response in responseEnums" :key="response.name" :label="response.name" :value="response.name"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="installMod" label="内外属性">
            <template slot-scope="scope">
              <el-select v-model="scope.row.installMod">
                <el-option label="厂内安装" value="厂内安装"></el-option>
                <el-option label="现场安装" value="现场安装"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="lampConfig" label="灯具类配置" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.lampConfig" :title="scope.row.lampConfig"  @change="sltedLampConfig($event, scope.$index, scope.row)">
                <el-option v-for="lamp in lampConfigEnums" :key="lamp.id" :label="lamp.lampConfig" :value="lamp"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="brand" label="品牌">
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="50">
          </el-table-column>
          <el-table-column prop="count" label="数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.count" @change="calculateLampSum(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column prop="electricityConsumption" label="用电量" width="80">
          </el-table-column>
          <el-table-column prop="unitPrice" label="单价" width="50">
          </el-table-column>
          <el-table-column prop="costSum" label="合计">
            <template slot-scope="scope">
              {{scope.row.unitPrice * scope.row.count}}
            </template>
          </el-table-column>
          <el-table-column prop="supplier" label="供应商">
          </el-table-column>
        </el-table>

        <div v-show="isNextTable" class="form-bottom-toolbar" style="line-height: 59px;">
          <el-button type="primary" @click="submitTable" size="medium">保存</el-button>
          <el-button @click="cancelLogoTable" size="medium">取消</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import _ from 'lodash'
import cityData from '@/libs/city-data'
import proxy from './proxy'

const initTableItem = {
  'applyPart': '',
  'borderCraft': '-',
  'fontName': '',
  'installationCostSummary': 0,
  'installationUnitPrice': 0,
  'logoCostSummary': 0,
  'logoCount': 0,
  'logoUnitPrice': 0,
  'powerCostSummary': 0,
  'powerCount': 0,
  'powerModel': '',
  'powerUnitPrice': 0,
  'response': '',
  'wordThickness': 0
}

const initaLampTable = {
  'applyPart': '',
  'brand': '',
  'costSum': 0,
  'count': 2,
  'electricityConsumption': 0,
  'installMod': '',
  'lampConfig': '',
  'projectId': 0,
  'response': '',
  'supplier': '',
  'unit': '',
  'unitPrice': 0
}
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
        itemList: [],
        tax: 0,
        total: 0
      },
      isNextTable: false,
      itemType: null,  // 下一步操作的选中类型
      applyPartEnums: [],
      responseEnums: [],
      fontNameEnums: [],
      powerModelEnums: [],

      // 灯具类
      lampApplyPartEnums: [
        {id: 0, name: '门头帽檐灯'},
        {id: 1, name: '门头侧打光'},
        {id: 2, name: '门头内打光'},
        {id: 3, name: '门头背打光'},
        {id: 4, name: '门头上打光'},
        {id: 5, name: '门头下打光'},
        {id: 6, name: '门头底部下打光'},
        {id: 7, name: '门头底部侧打光'},
        {id: 8, name: '门头底部内打光'},
        {id: 9, name: '门柱侧打光'},
        {id: 10, name: '门柱内打光'}
      ],
      lampConfigEnums: [
        {id: 0, lampConfig: '5054硬条灯/2700K/72珠18W/黄光', brand: 'aaa', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 1, lampConfig: '5054硬条灯/4000K/72珠18W/中性光', brand: 'aaa1', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 2, lampConfig: '5054硬条灯/10000K/72珠18W/白光', brand: 'aaa2', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 3, lampConfig: '3030硬条灯/2700K/36珠18W/黄金专用', brand: 'aaa3', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 4, lampConfig: '2835硬条灯/4000K/120珠18W/彩金专用', brand: 'aaa4', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 5, lampConfig: '软条灯/2700K/60珠12W/黄光', brand: 'aaa5', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 6, lampConfig: '软条灯/4000K/60珠12W/中性光', brand: 'aaa6', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 7, lampConfig: '软条灯/10000K/60珠12W/白光', brand: 'aaa7', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 8, lampConfig: '防水软条灯/2700K/60珠12W/黄光', brand: 'aaa8', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 9, lampConfig: '防水软条灯/4000K/60珠12W/中性光', brand: 'aaa9', unit: 'm', unitPrice: '9', supplier: 'ff照明'},
        {id: 10, lampConfig: '防水软条灯/10000K/60珠12W/白光', brand: 'aaa0', unit: 'm', unitPrice: '9', supplier: 'ff照明'}
      ],
      curampConfig: {},
      logoProjectTable: []
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
    tabClick (e) { },
    // 造价详情
    getCostById () {
      proxy.getCostDetailById(this.projectId).then(res => {
        let resData = res.data
        // console.log(resData)
        Object.assign(this.projectGrid, resData)
        this.projectGrid.itemList.push({
          itemName: '税金',
          costMoney: resData.tax
        })
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
          return false
        }
      })
    },
    modifyInfo () {
      proxy.modifyProject(this.projectId, this.form).then(res => {
        // console.log(res.data)
        this.$message({
          message: '工程信息修改成功',
          type: 'success'
        })
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
    },

    // ========================================= 进入下个阶段 ===================================== //
    moveToNext (index, data) {
      this.isNextTable = true
      this.itemType = data.type

      if (this.itemType === 1) {
        this.getEnum()
      } else if (this.itemType === 2) {
        proxy.getAttributeEnum('response').then(res => {
          this.responseEnums = res.data
        })
      }
      this.getItemDetailProject()
    },
    // 获取各种枚举
    getEnum () {
      proxy.getAttributeEnum('applyPart').then(res => {
        this.applyPartEnums = res.data
      })
      proxy.getAttributeEnum('response').then(res => {
        this.responseEnums = res.data
      })
      proxy.getAttributeEnum('fontName').then(res => {
        this.fontNameEnums = res.data
      })
      proxy.getAttributeEnum('powerModel').then(res => {
        this.powerModelEnums = res.data
      })
    },
    sltedLampConfig (slt, index, row) {
      // console.log(slt)

      this.curampConfig = slt
      row.lampConfig = slt.lampConfig
      // Object.assign(row, slt)
      // this.calculateLampSum(index, row)
      console.log(row)
      // row.lampConfig = this.curampConfig.lampConfig
    },
    // 插入新行
    newTableRow (index) {
      console.log(this.itemType)
      if (this.itemType === 1) {
        this.logoProjectTable.splice(index + 1, 0, Object.assign({ projectId: this.projectId }, initTableItem))
      } else if (this.itemType === 2) {
        this.logoProjectTable.splice(index + 1, 0, Object.assign({ projectId: this.projectId }, initaLampTable))
      }
    },
    // 小计标识费
    calculateLogo (index, row) {
      // console.log(row.logoUnitPrice * row.logoCount)
      row.logoCostSummary = row.logoUnitPrice * row.logoCount
    },
    calculatePower (index, row) {
      row.powerCostSummary = row.powerUnitPrice * row.powerCount
    },
    calculateInstallation (index, row) {
      row.installationCostSummary = row.installationUnitPrice
    },
    // 合计灯具报价
    calculateLampSum (index, row) {
      row.costSum = row.unitPrice * row.count
    },
    // 获取所有logo标志项目
    getItemDetailProject () {
      switch (this.itemType) {
        case 1:
          proxy.getAllLogoProject(this.projectId).then(res => {
            this.logoProjectTable = res.data
            if (!res.data || res.data.length === 0) {
              this.logoProjectTable.push(Object.assign({ projectId: this.projectId }, initTableItem))
            } else {
              this.logoProjectTable = res.data
            }
          })
          break

        case 2:
          proxy.getAllLampProject(this.projectId).then(res => {
            this.logoProjectTable = res.data
            if (!res.data || res.data.length === 0) {
              this.logoProjectTable.push(Object.assign({ projectId: this.projectId }, initaLampTable))
            } else {
              this.logoProjectTable = res.data
            }
          })
          break

        default:
          break
      }
    },

    // 保存LOGO子集表
    submitTable () {
      // console.log(this.logoProjectTable)
      proxy.saveLogoProjects(this.logoProjectTable).then(res => {
        this.$message({
          message: 'LOGO标志信息保存成功',
          type: 'success'
        })
        this.isNextTable = false
        this.getCostById()
      })
    },
    cancelLogoTable () {
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

<style lang="less" scoped>

</style>




  