import Axios from 'axios'
const axios = Axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({ url, method, params, data, headers })
  // return new Promise((resolve, reject) => {
  //   $.ajax({
  //     url,
  //     data,
  //     headers,
  //     type: method,
  //     success: res => {
  //       resolve(res)
  //     },
  //     error: err => {
  //       reject(err)
  //     }
  //   })
  // })
}
