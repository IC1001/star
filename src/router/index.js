import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@v/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin:title',
    name: 'admin',
    component: () => import('@v/admin/admin.vue'),
    // children:[
    //   {name: 'album',path:'/album',component: () => import('@v/admin/a_album.vue')},
    //   {name: 'user',path:'/user',component: () => import('@v/admin/a_user.vue')},
    //   {name: 'banner',path:'/banner',component: () => import('@v/admin/a_banner.vue')},
    // ]
  },
  {
    path: '/type:title',
    name: 'type',
    component: () => import('@v/type.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@v/detail.vue')
  },
  {
    path: '/zone',
    name: 'zone',
    component: () => import('@v/zone.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@v/register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
