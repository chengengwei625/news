import request from '@/utils/request.js'
export const getALLChannelsAPI = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
export const loginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
// export const login = () => {
//   return request({
//     method: 'POST',
//     url: '/v1_0/authorizations',
//     data
//   })
// }
