import http from './http.js' // 导入我们封装好的axios对象
import apis from './api.js' // 导入我们封装好的apis对象

function getExampleData(params = {}) { // 从外部接受参数，没有参数默认为空对象
    return http.get(apis.getExampleData, params) // return对应的get/post方法，第一个填路径，第二个给参数对象
}





export default getExampleData