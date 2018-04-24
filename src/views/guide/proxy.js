import http from '@/api/index'
export default {
  // return Vue.http.get('/v1/ai/product/getproduct', {params: data})
  // return Vue.http.post('/v1/ai/product/update', data)
  getTotalPage () {
    return http.get('/api/getGuidePage')
  }
}
