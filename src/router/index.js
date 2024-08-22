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
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClientesView.vue')
    },
    {
      path : '/pecas',
      name : 'pecas',
      component : () => import('../views/PecasView.vue')
    },
    {
      path: '/orcamentos',
      name: 'orcamentos',
      component: () => import('../views/OrcamentosView.vue')
    },
    {
      path: '/servicos',
      name: 'servicos',
      component: () => import('../views/ServicosView.vue')
    },
]
})

export default router
