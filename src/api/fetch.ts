import axios from 'axios'
import qs from 'qs'

import { Message } from 'element-ui';



const baseURL = 'http://yapi.yzapi.top/mock/117/'                 // 测试地址
 
axios.defaults.timeout = 10000;                        //响应时间
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;               // 设置token
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = baseURL;   //配置接口地址
 
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    // 可以在这里设置请求头中的token
    // 这里写死一个token，你需要在这里取到你设置好的token的值
    // const token = 'this is a token';
    // if (token) {
    //     这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
    //     config.headers.Authorization = token;
    // }

    //在发送请求之前做某件事
    if(config.method  === 'post'){
        // config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    Message({
        type: 'error',
        message: "错误的传参"
    })
    return Promise.reject(error);
});
 
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(res.data.retcode == 0){
        return res
    } else if(res.data.retcode == '50021021') {
        localStorage.removeItem('user_token_key');
        // localStorage.removeItem('userName');
        location.href = '#/login';
    } else {
        Message({
            type: 'error',
            message: res.data.retmsg
        })
        // return Promise.reject(res);
        return res
    }
}, (error) => {
    console.log(error)
    Message({
        type: 'error',
        message: "网络异常"
    })
    return Promise.reject(error);
})
 
//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}
// 返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {    
    /**
     * 用户登录
     */
    Login(params) {
        return fetchPost('/auth/login', params)
    },  

}