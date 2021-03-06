import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '/search', component: () => import('@/views/Search') },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      { path: '/ ', component: () => import('@/views/Home') },
      { path: '/video', component: () => import('@/views/Video') },
      { path: '/qa', component: () => import('@/views/QA') },
      { path: '/My', component: () => import('@/views/My') }
    ]
  },
  { path: '/detail/:art_id', component: () => import('@/views/Detail'), meta: { title: '黑马头条' } }
]

const router = new VueRouter({
  routes
})

export default router
