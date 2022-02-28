import { get, post } from '../utils/request';

//任务查询（全部）
export const listAll = (data) => {
    return post('/api/servicer/task/listAll', data)
}

//任务查询（待实施）
export const listToSceneConfirmOfServicer = (data) => {
    return post('/api/servicer/task/listToSceneConfirmOfServicer', data)
}

// 任务查询（实施中）
export const listImplementingTask = (data) => {
    return post('/api/servicer/task/listImplementingTask', data)
}

// 任务查询（待评价）
export const listToEvaluateTask = (data) => {
    return post('/api/servicer/task/listToEvaluateTask', data)
}

//到场确认
export const sceneConfirm = (data) => {
    return post('/api/servicer/task/sceneConfirm', data)
}

//获取服务确认材料
export const listTaskProof = (data) => {
    return post('/api/servicer/task/listTaskProof', data)
}

//上传服务确认材料
export const uploadTaskProof = (data) => {
    return post('/api/servicer/task/uploadTaskProof', data)
}

//完成实施
export const finish = (data) => {
    return post('/api/servicer/task/finish', data)
}