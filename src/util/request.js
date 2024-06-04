import axios from 'axios'

//segmentfault.com/a/1190000020210980 实现


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL:process.env.VUE_APP_BASE_API || '/api', // 此处的 /admin-api/ 地址，原因是后端的基础路径为 /admin-api/
  // 超时
  timeout: 500000,
  // 禁用 Cookie 等信息
  withCredentials: false,
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof(value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(async res => {
    return Promise.resolve(res.data)
}, error => {
    return Promise.reject(error)
  }
)

export default service
