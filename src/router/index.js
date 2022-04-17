import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login/index.vue'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/UserEdit'
// import Chat from '@/views/Chat/'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout/home' },
  {
    path: '/login',
    component: () => import(/*webpackChunkName: "Login" */ '@/views/Login'),
    //路由独享守卫
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('toutiao')
      if (token) {
        // next(false)//会使得网页后退不到/layout/home
        next('/layout/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/Layout',
    component: () => import(/*webpackChunkName: "Layout" */ '@/views/Layout'),
    children: [
      { path: 'home', component: () => import(/*webpackChunkName: "Home" */ '@/views/Home'), meta: { scrollT: 0 } },
      { path: 'user', component: () => import(/*webpackChunkName: "User" */ '@/views/User') }
    ]
  },
  {
    path: '/search',
    component: () => import(/*webpackChunkName: "Search" */ '@/views/Search')
  },
  //搜索结果页
  { path: '/search_result/:kw', component: () => import(/*webpackChunkName: "SearchResult" */ '@/views/Search/SearchResult') },
  //文章详情页
  { path: '/detail', component: () => import(/*webpackChunkName: "ArticleDetail" */ '@/views/ArticleDetail') },
  //用户编辑页
  {
    path: '/user_edit',
    component: () => import(/*webpackChunkName: "UserEdit" */ '@/views/User/UserEdit')
  },
  {
    path: '/chat',
    component: () => import(/*webpackChunkName: "Chat" */ '@/views/Chat/')
  }
]

const router = new VueRouter({
  routes
})
// 路由-全局前置守卫(在路由发生真正跳转之前,执行此函数)
// 此函数可以决定路由是否跳转／取消／强制中断切换到别的路由
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('toutiao')
//   if (token && to.path === '/login') {
//     next(false)
//   } else {
//     next()
//   }
// })
export default router
