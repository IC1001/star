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
    path: '/detail',
    name: 'detail',
    component: () => import('@v/detail.vue')
  },
  {
    path: '/zone',
    name: 'zone',
    component: () => import('@v/zone.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
