import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
// 一级路由规则
{ path: '/register', component: ()=>import('../pages/register/register.vue') },
{ path: '/login', component: ()=>import('../pages/login/login.vue') },
{ path: '/index', component: ()=>import('../pages/index/index.vue') ,
// 配置二级路由
children:[
  { path: 'home', component: ()=>import('../pages/home/home.vue') },
  { path: 'cate', component: ()=>import('../pages/cate/cate.vue') },
  { path: 'shop', component: ()=>import('../pages/shop/shop.vue') },
  { path: 'mine', component: ()=>import('../pages/mine/mine.vue') },
  { path: '', redirect: "home" }
]
},
{ path: '/detail', component: ()=>import('../pages/detail/detail.vue') },
{ path: '/list', component: ()=>import('../pages/list/list.vue')},
{ path: '/search', component: ()=>import('../pages/search/search.vue')},
{ path: '/order', component: ()=>import('../pages/order/order.vue')},
{ path: '/address', component: ()=>import('../pages/address/address.vue')},
{ path: '/addAddress', component: ()=>import('../pages/addAddress/addAddress.vue')},
{ path: '/money', component: ()=>import('../pages/money/money.vue')},
// 路由重定向
{ path: '*', redirect:"/login" },
]

const router = new VueRouter({
  routes,
  // 滚动处理
  scrollBehavior(to,from,savePosition){
    if(savePosition){
      return savePosition
    }else{
      return {x:0,y:0}
    }
  }
})

router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem("userInfo");

  // 如果去的是登录路由，直接进
  if(to.path==="/login"){
    next()
    return
  }

  // 如果去的不是登录，判断userinfo,真就进，否则，去登录
  if(userInfo){
    next()
    return 
  }

  next("/login")
})

export default router
