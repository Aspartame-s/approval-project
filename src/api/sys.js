//系统相关

import { get, post } from "../utils/request";

//登陆
export const login = (data) => {
    return post('/api/sys/login', data)
}
//登出
export const loginout = () => {
    return get('/api/sys/loginout')
}
//个人信息
export const personalInfo = () => {
    return get('/api/sys/personalInfo')
}
//重置密码


//