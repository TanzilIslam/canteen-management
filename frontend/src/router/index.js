import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: () => import('../layouts/dashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          meta: { usedInSideNav: true, icon: 'mdi-view-dashboard', title: 'Dashboard' },
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('../views/MenuView.vue'),
          meta: {
            usedInSideNav: true,
            icon: 'mdi-silverware-fork-knife',
            title: 'Menu',
          },
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/OrderView.vue'),
          meta: {
            usedInSideNav: true,
            icon: 'mdi-format-list-bulleted-type',
            title: 'Order',
          },
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('../layouts/homeLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/homeLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('../views/CheckoutView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (!userStore.isLoggedIn) {
    await userStore.fetchSession()
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'login' })
  } else if (to.name === 'login' && userStore.isLoggedIn) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
