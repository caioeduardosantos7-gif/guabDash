import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../presentation/layouts/MainLayout.vue'
import { TokenStorage } from '../infrastructure/auth/TokenStorage'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../presentation/views/LoginView.vue'),
      meta: { public: true },
    },
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
          path: 'perfil',
          name: 'perfil',
          component: () => import('../presentation/views/ProfileView.vue'),
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

router.beforeEach((to) => {
  if (to.meta.public) return true
  if (!TokenStorage.hasTokens()) return { name: 'login' }
  return true
})

export default router
