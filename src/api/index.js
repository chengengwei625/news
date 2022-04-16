import request from '@/utils/request.js'
// 频道-获取用户所有频道
export const getALLChannelsAPI = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
// 频道-获取用户选择的频道
export const getUserChannelsAPI = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}
// 频道-更新覆盖频道
export const updateChannelsAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
// 频道-删除用户指定的频道
export const removeTheChannelAPI = ({ channelId }) => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
// 登录
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
// 用户-关注
export const userFollowedAPI = ({ userId }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}
// 用户-取消关注
export const userUnFollowedAPI = ({ userId }) => {
  return request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}
// 用户-获取个人资料
export const userProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
//用户-更新头像
export const updateUserPhotoAPI = fd => {
  return request({
    url: '/v1_0/user/photo',
    methods: 'PATCH',
    data: fd //fd外面一会儿传进来的new FormData()表单对象
    //如果你的请求体直接是Form Data表单对象， 你也不用自己添加
    //Content-Type， axios发现数据请求体是表单对象， 它也不会转换成json字符串
    //也不会带Content-Type：application/json，而是交给浏览器，浏览器发现请求
    //Content-Type:application/json；axios携带的, 前提:data请求体是对象->json字符串发给后台
    //Content-Type:multipart/form-data；浏览器携带的, 前提:data请求体必须Form Data类型对象
  })
}
// 用户-获取基本信息(我的页面数据)
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}
// 用户-更新基本资料
export const updateUserProfileAPI = dataObj => {
  //判断，有值才带参数名给后台，无值参数名不携带
  //写法1：解构赋值，4个判断，往空对象上添加有值的加上去（以前做过）
  //写法2：外面想传几对象key+value，就直接传入交给后台
  //写法3：上面写法不够语义化，我看不出obj里有什么
  const obj = {
    name: '',
    gender: 0,
    birthday: '',
    intro: ''
  }
  for (const prop in obj) {
    // 遍历参数对象里每个key
    if (dataObj[prop] === undefined) {
      // 用key去外面传入的参数对象匹配,如果没有找到(证明外面没传这个
      delete obj[prop] // 从obj身上移除这对属性和值
    } else {
      obj[prop] = dataObj[prop] // 如果使用了,就从外面对象取出对应key值,保存到obj上
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH', //部分更新,PUT全部更新
    data: obj
  })
}
// 文章-获取列表
export const getALLArticleListAPI = ({ channel_id, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem(key)}`
    // },
    params: {
      channel_id,
      timestamp
    }
  })
}
// 文章-点赞
export const likeArticleAPI = ({ artId }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artId
    }
  })
}
// 文章-取消点赞
export const unLikeArticleAPI = ({ artId }) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
    // Content是对请求体数据类型进行声明的,又因为这里没有请求体body所以加这个字段没用
    // Content-Type:application/x-www-form-urlencoded
  })
}
// 文章-获取-评论列表
export const commentsListAPI = ({ id, offset = null, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: id,
      offset, //axios只针对params参数，如果发现键值对，值为nu11，会忽略此参数名和值不携带在ur1？
      //后面什么时候需要外面传：此值会变化
      limit
    }
  })
}
// 文章-评论-喜欢
export const commentLikingAPI = ({ comId }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: { target: comId }
  })
}
// 文章-评论-取消喜欢
export const commentDisLikingAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
// 文章-评论-发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
  //1．axios中，data请求体传参，如果值为nu11是不会忽略这个参数的
  //也会把参数名和值携带给后台（只有params遇到nu11才会忽略）
  //2．形参art＿id可选参数，如果逻辑页面是对文章评论，则不需要传递art＿id
  //所以这时，内部art＿id值为nu11就证明此次调用，是针对文章评论
  //~~~~~~ data请求体对象需要自己处理
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) {
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}
// 文章反馈-反馈垃圾内容
export const detailAPI = ({ artId }) => {
  return request({
    url: `/v1_0/articles/${artId}`
  })
}
// 文章反馈-不感兴趣
export const dislikeArticleAPI = artId => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem(key)}`
    // },
    data: {
      target: artId
    }
  })
}
// 文章反馈-反馈垃圾内容
export const reportArticleAPI = ({ artId, type }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem(key)}`
    // },
    data: {
      target: artId,
      type: type,
      remark: '如果你想写,你可以在逻辑页面判断下,如果点击类型是0,再弹出输入框输入参数'
    }
  })
}

// 搜索-联想菜单列表
export const suggestListAPI = ({ keyworks }) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: keyworks
    }
  })
}
// 搜索-搜索结果列表
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
