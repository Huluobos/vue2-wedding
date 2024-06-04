import request from '@/util/request'

// 获取祝福列表
export function getWish(params) {
    return request({
        url: '/wish/get',
        method: 'get',
        params: params
    })
}
// 添加祝福
export function addWish(data) {
  return request({
    url: '/wish/add',
    method: 'post',
    data: data
  })
}
export function changeNameWish(data) {
  return request({
    url: '/wish/change/name',
    method: 'post',
    data: data
  })
}

