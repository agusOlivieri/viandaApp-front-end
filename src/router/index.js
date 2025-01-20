import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OrderView from '@/views/OrderView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import { jwtDecode } from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/ordenar',
      name: 'ordenar',
      component: OrderView,
      meta: { requiresAuth: true, roles: ["CLIENTE"] },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");

  if (to.meta.requiresAuth) {
    if (!token) {
      return next("/login");
    }

    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    console.log("rol del token: ", userRole)
    console.log("rol meta: ", to.meta.roles[0])

    if (to.meta.roles && to.meta.roles[0] !== userRole) {
      alert("No tienes permisos para acceder a esta página");
      return next("/");
    }
  }

  next();
})

export default router
