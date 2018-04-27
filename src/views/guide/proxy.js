// import Qs from 'qs'
import http from '@/api/index'
export default {

  // 获取工程信息概览
  getTotalPage () {
    return http.get('/service/v1/project/brief')
  },

  // 添加工程
  addProject (data) {
    return http.post('/service/v1/project', data)
  },

  // 获取单个工程详情
  getDetailById (projectId) {
    return http.get('/service/v1/project/' + projectId)
  },
  // 获取单个工程详情
  getCostDetailById (projectId) {
    return http.get('/service/v1/project/cost/' + projectId)
  },

  // 编辑工程信息
  modifyProject (id, data) {
    return http.put('/service/v1/project/' + id, {editProjectDTO: data})
  },

  // GET /v1/item/logo/enum/{attributeName}
  getAttributeEnum (attributeName) {
    return http.get('/service/v1/item/logo/enum/' + attributeName)
  },

  // 获取所有LOGO标志类项目
  getAllLogoProject (projectId) {
    // GET /v1/item/logo/projectId/{projectId}
    return http.get('/service/v1/item/logo/projectId/' + projectId)
  },

  // 批量保存Logo标志造价表
  saveLogoProjects (data) {
    return http.post('/service/v1/item/logo', data)
  }
}
