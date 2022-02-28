// 客户端

import { get, post } from "../utils/request";

//获取待办任务
export const listTodoTask = (data) => {
    return post('/api/customer/task/listTodoTask', data)
}

//导航栏预约 
//全部
export const listAll = (data) => {
    return post('/api/customer/task/listAll', data)
}  

//待确认/待预约
export const listToConfirmOfCustomer = (data) => {
    return post('/api/customer/task/listToConfirmOfCustomer', data)
}   

//待实施
export const listToSceneConfirmOfCustomer = (data) => {
    return post('/api/customer/task/listToSceneConfirmOfCustomer', data)
}

//待评价
export const listToEvaluateOfCustomer = (data) => {
    return post('/api/customer/task/listToEvaluateOfCustomer', data)
}

//实施中
export const listImplementingOfCustomer = (data) => {
    return post('/api/customer/task/listImplementingOfCustomer', data)
}

//获取任务信息 客户点预约按钮
export const getTask = (data) => {
    return post('/api/customer/task/getTask', data)
}

//获取实施地点
export const addressList = (data) => {
    return post('/api/customer/implementationAddress/list', data)
}

//新增实施地点
export const addAddress = (data) => {
    return post('/api/customer/implementationAddress/add', data)
}

//编辑实施地点
export const editAddress = (data) => {
    return post('/api/customer/implementationAddress/edit', data)
}

//客户确认 提交
export const confirm = (data) => {
    return post('/api/customer/task/confirm', data)
}

// 获取服务评价结果
export const listTaskEvaluateResult = (data) => {
    return post('/api/customer/task/listTaskEvaluateResult', data)
}

//服务评价
export const evaluate = (data) => {
    return post('/api/customer/task/evaluate', data)
}