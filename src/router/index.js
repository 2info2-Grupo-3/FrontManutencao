import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/saidas',
      name: 'saidas',
      component: () => import('../views/SaidasView.vue')
    },
    {
      path: '/entradas',
      name: 'entradas',
      component: () => import('../views/EntradasView.vue')
    },
]
})

export default router
