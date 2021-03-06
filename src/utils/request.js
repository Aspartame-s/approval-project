import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = ''
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'
// // 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token
        // token && (config.headers.Authorization = token)
        if (localStorage.getItem('token')) {
            config.headers.token = localStorage.getItem('token')
            // config.headers.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NjAzMzExMiwidXNlciI6IntcImFkX0NsaWVudF9JZFwiOlwiMTAwXCIsXCJhZF9PcmdfSWRcIjpcIjEwMFwiLFwiYWRfVXNlcl9JZFwiOlwiMTAwXCIsXCJyZWFsX05hbWVcIjpcImFkbWluXCJ9IiwiaWF0IjoxNjQ1NDI4MzEyfQ.270e1pQtr0-kZvTOvjiF6F_8PsGtvSh3EU5s1_T77ME7asiynNEN9OQmlQ9wgP7z1Qikwbo_bD9E97eSW82O2w"
        }
        // else{
        // if(!whiteList.includes(config.url)){
        // app.$router.push('/login')
        // return
        // }
        // }
        //  config.headers.Referer = 'https://servicewechat.com/wx064d09419a8194bc/devtools/page-frame.html'
        //  config.headers.host = 'servicewechat.com'
        //  config.headers.origin = 'https://servicewechat.com/wx064d09419a8194bc/devtools/page-frame.html'



        return config
    },
    error => {
        return Promise.error(error)
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // console.log(response)
        if (response.status === 200) {
            console.log('已吊桶')
            console.log(response.data)
            if (response.data.hasOwnProperty('code')) {
                switch (response.data.code) {
                    // case 9999:
                    //   app.$router.replace('/login')
                    //   break
                    case 3025:
                        alert(response.data.message)
                        break
                    case 9000:
                        localStorage.clear()
                        app.$router.replace('/')
                        break
                    case 9001:
                        localStorage.clear()
                        app.$router.replace('/')
                        break
                    case 9002:
                        localStorage.clear()
                        app.$router.replace('/')
                        break
                    case 9003:
                        localStorage.clear()
                        app.$router.replace('/')
                        break
                    default:
                        // console.log(response.data)
                        // console.log(response.data.success)
                        if (response.data.success) {
                            return Promise.resolve(response)
                        } else {
                            app.$message({
                                type: 'error',
                                message: response.data.message
                            })
                        }
                }
            } else {
                console.log('ggggg')
                return Promise.resolve(response)
            }

        } else {
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是200的情况
    error => {
        console.log(object)
        // if (error.response.status) {
        // switch (error.response.status) {
        //   // 401: 未登录
        //   // case 401:
        //   //   router.replace({
        //   //     path: '/login',
        //   //     query: { redirect: router.currentRoute.fullPath }
        //   //   })
        //   //   break
        //   // 403 token过期
        //   // 登录过期对用户进行提示
        //   // 清除本地token和清空vuex中token对象
        //   // 跳转登录页面
        //   // case 403:
        //   //   Toast({
        //   //     message: '登录过期，请重新登录',
        //   //     duration: 1000,
        //   //     forbidClick: true
        //   //   })
        //   //   // 清除token
        //   //   localStorage.removeItem('token')
        //   //   store.commit('loginSuccess', null)
        //   //   // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        //   //   setTimeout(() => {
        //   //     router.replace({
        //   //       path: '/login',
        //   //       query: {
        //   //         redirect: router.currentRoute.fullPath
        //   //       }
        //   //     })
        //   //   }, 1000)
        //   //   break
        //   // // 404请求不存在
        //   // case 404:
        //   //   Toast({
        //   //     message: '网络请求不存在',
        //   //     duration: 1500,
        //   //     forbidClick: true
        //   //   })
        //   //   break
        //   // // 其他错误，直接抛出错误提示
        //   // default:
        //   //   Toast({
        //   //     message: error.response.data.message,
        //   //     duration: 1500,
        //   //     forbidClick: true
        //   //   })
        // }
        return Promise.reject(error.response)
        // }
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        // let data  = JSON.parse(JSON.stringify(params))
        // let data = qs.parse(qs.stringify(params))
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        let data = qs.parse(qs.stringify(params))
        axios.post(url, data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}