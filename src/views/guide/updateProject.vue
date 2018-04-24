<template>
  <div class="update-project">

    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="工程信息" name="0">
        <el-form ref="infoForm" :model="form" label-width="100px">
          <el-row type="flex" class="row-bg">
            <el-col :span="6">
              <el-form-item label="工程名称">
                <el-cascader :options="cityInfo" v-model="form.selectedOptions" :props="props" :change-on-select="true" :clearable="true" @change="handleChange">
                </el-cascader>
                <!-- <span>所选地区：{{form.city}}{{form.erae}}{{form.minerae }}</span> -->
              </el-form-item>
              <el-form-item label="工程属性">
                <el-select v-model="form.projectProperty" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="店铺属性">
                <el-select v-model="form.storeProperty" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="营业面积">
                <el-input placeholder="请输入内容" v-model="form.storeSquare">
                  <template slot="append">m</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地名">
                <el-input placeholder="请输入内容" v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
          </el-row>

        </el-form>
      </el-tab-pane>
      <el-tab-pane label="工程造价" :disabled="projectId" name="1">

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
      activeName: 0,
      projectId: '',
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
      }
    }
  },
  methods: {
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
    }
  }
}
</script>

  