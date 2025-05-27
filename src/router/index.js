import { createMemoryHistory, createRouter } from 'vue-router'
import Taiji from '@/views/Taiji.vue';
import About from '@/views/About.vue';

const routes = [
  { path: '/', component: () => import('@/views/Welcome.vue') },
  { path: '/liuyao', component: () => import('@/views/liuyao/BLiuYaoManagement.vue') },
  { path: '/deital/:id', name: 'Detail', component: () => import('@/views/category/Detail.vue')},
  { path: '/category', component: () => import('@/views/category/CategoryManagement.vue') },
  { path: '/gan-zhi', component: () => import('@/views/GanZhi.vue') },
  {
    path: '/taiji',
    component: Taiji,
    children: [
      {
        path: 'about/:gongSeq',
        name: 'About',
        component: About,
      },
    ],
  },
  { path: '/star', component: () => import('@/views/Star.vue') },
  { path: '/test2', component: () => import('@/views/Test2.vue') },
  { path: '/guaType', component: () => import('@/views/GuaType.vue') },
  { path: '/qin', component: () => import('@/views/Qin.vue') },
  { path: '/role', component: () => import('@/views/Role.vue') },
  { path: '/yao', component: () => import('@/views/Yao.vue') },
  { path: '/shen', component: () => import('@/views/Shen.vue') }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router