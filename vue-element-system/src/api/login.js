import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    data:{username:username},
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/Info' ,
    data:{username:token},
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
