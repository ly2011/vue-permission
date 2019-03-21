import axios from '@/utils/request'
export function fetchPermission () {
  return axios.get('/mock/permission.json')
}

export function login () {
  return axios.get('/mock/login.json')
}
