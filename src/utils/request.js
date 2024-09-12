import axios from 'axios'
import config from "./config";
import {Message} from "element-ui";

// 创建axios实例
const service = axios.create({
    baseURL: config.apiHost, // api 的 base_url
    // baseURL: '/api', // api 的 base_url
    timeout: 10 * 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        // console.log(config);
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        // if (response.status === 500)
        if (response.data.code === -1) {
            Message.warning(response.data.msg)
            return false;
        }
        // 二进制数据则直接返回
        if (response.request.responseType === "blob" || response.request.responseType === "arraybuffer") {
            return response;
        }
        return response.data.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default service

