<template>
  <div class="update-project">
    <el-form ref="infoForm" :model="form" label-width="100px">
      <el-form-item label="所在地区：">
        <el-cascader :options="cityInfo" v-model="form.selectedOptions" :props="props" :change-on-select="true" :clearable="true" @change="handleChange">
        </el-cascader>
        <!-- <span>所选地区：{{form.city}}{{form.erae}}{{form.minerae }}</span> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cityData from '@/libs/city-data'
export default {
  name: 'UpdateInfo',
  data () {
    return {
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

  