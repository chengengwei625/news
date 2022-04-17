// import request from '@/utils/request'
// //既引入也同时向外按需导出，所有引入过来的方法（中转）
// export * from './ArticleDetail.js'
// // 文章-获取列表
// export const getALLArticleListAPI = ({ channel_id, timestamp }) => {
//   return request({
//     url: '/v1_0/articles',
//     method: 'GET',
//     // headers: {
//     //   Authorization: `Bearer ${localStorage.getItem(key)}`
//     // },
//     params: {
//       channel_id,
//       timestamp
//     }
//   })
// }
// // 文章-点赞
// export const likeArticleAPI = ({ artId }) => {
//   return request({
//     url: '/v1_0/article/likings',
//     method: 'POST',
//     data: {
//       target: artId
//     }
//   })
// }
// // 文章-取消点赞
// export const unLikeArticleAPI = ({ artId }) => {
//   return request({
//     url: `/v1_0/article/likings/${artId}`,
//     method: 'DELETE'
//     // Content是对请求体数据类型进行声明的,又因为这里没有请求体body所以加这个字段没用
//     // Content-Type:application/x-www-form-urlencoded
//   })
// }
// // 文章-获取-评论列表
// export const commentsListAPI = ({ id, offset = null, limit = 10 }) => {
//   return request({
//     url: '/v1_0/comments',
//     method: 'GET',
//     params: {
//       type: 'a',
//       source: id,
//       offset, //axios只针对params参数，如果发现键值对，值为nu11，会忽略此参数名和值不携带在ur1？
//       //后面什么时候需要外面传：此值会变化
//       limit
//     }
//   })
// }
// // 文章-评论-喜欢
// export const commentLikingAPI = ({ comId }) => {
//   return request({
//     url: '/v1_0/comment/likings',
//     method: 'POST',
//     data: { target: comId }
//   })
// }
// // 文章-评论-取消喜欢
// export const commentDisLikingAPI = ({ comId }) => {
//   return request({
//     url: `/v1_0/comment/likings/${comId}`,
//     method: 'DELETE'
//   })
// }
// // 文章-评论-发布评论
// export const commentSendAPI = ({ id, content, art_id = null }) => {
//   //1．axios中，data请求体传参，如果值为nu11是不会忽略这个参数的
//   //也会把参数名和值携带给后台（只有params遇到nu11才会忽略）
//   //2．形参art＿id可选参数，如果逻辑页面是对文章评论，则不需要传递art＿id
//   //所以这时，内部art＿id值为nu11就证明此次调用，是针对文章评论
//   //~~~~~~ data请求体对象需要自己处理
//   const obj = {
//     target: id,
//     content
//   }
//   if (art_id !== null) {
//     obj.art_id = art_id
//   }
//   return request({
//     url: '/v1_0/comments',
//     method: 'POST',
//     data: obj
//   })
// }
// // 文章-获取详情
// export const detailAPI = ({ artId }) => {
//   return request({
//     url: `/v1_0/articles/${artId}`
//   })
// }
