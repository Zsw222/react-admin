
import axios from './http'
// 登录
export  function _login(data){
  return  axios.post('/users/login',data)
}
// 获取分类列表数据
export  function _getCategoryList(data){
  return axios.get('/category/list',data)
}
// 新增分类列表数据
export  function _addCategoryList(data){
  return  axios.post('/category/list',data)
}
// 删除分类列表数据
export  function _updateCategoryList(data){
  return  axios.put('/category/list',data)
}
// 删除分类列表数据
export  function _deleteCategoryList(data){
  return  axios.delete('/category/list',{data:data})
}
