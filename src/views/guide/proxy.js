// import Qs from 'qs'
import http from '@/api/index'
export default {

  // 获取工程信息概览
  getTotalPage () {
    return http.get('/v1/project/brief')
  },

  // 添加工程
  addProject (data) {
    return http.post('/v1/project', data)
  },

  // 获取单个工程详情
  getDetailById (projectId) {
    return http.get('/v1/project/' + projectId)
  },
  // 获取单个工程详情
  getCostDetailById (projectId) {
    return http.get('/v1/project/cost/' + projectId)
  },

  // 编辑工程信息
  modifyProject (id, data) {
    return http.put('/v1/project/' + id, data)
  }
}
