import axios from 'axios'
import { Message } from 'element-ui'
/** **** 创建axios实例 ******/
// 测试  baseURL = 'http://yapi.yzapi.top/mock/117/'
const service = axios.create({
  baseURL: 'http://yapi.yzapi.top/mock/117/', // api的base_url
  timeout: 5000 // 请求超时时间
})
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log('添加请求拦截器', config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (res) {
    // 对响应数据做点什么
    console.log('添加响应拦截器', res)
    if (res.status !== 200) {
      Message({
        type: 'error',
        message: '您输入的用户名或密码有误',
        duration: 5 * 1000
      })
    } else {
      return res.data
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service
