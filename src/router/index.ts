import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../presentation/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../presentation/views/DashboardView.vue'),
        },
        {
          path: 'vendas',
          name: 'vendas',
          component: () => import('../presentation/views/SalesView.vue'),
        },
        {
          path: 'clientes',
          name: 'clientes',
          component: () => import('../presentation/views/CustomersView.vue'),
        },
        {
          path: 'produtos',
          name: 'produtos',
          component: () => import('../presentation/views/ProductsView.vue'),
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: () => import('../presentation/views/DashboardView.vue'),
        },
        {
          path: 'marketing',
          name: 'marketing',
          component: () => import('../presentation/views/DashboardView.vue'),
        },
        {
          path: 'descontos',
          name: 'descontos',
          component: () => import('../presentation/views/DashboardView.vue'),
        },
      ],
    },
  ],
})

export default router
