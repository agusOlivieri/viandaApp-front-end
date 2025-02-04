import { createRouter, createWebHistory } from 'vue-router'
import ClientHomeView from '../views/ClientHomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OrderView from '@/views/OrderView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminHomeView from '@/views/AdminHomeView.vue'
import ViandasView from '@/views/ViandasView.vue'
import { useUsuarioStore } from '@/stores/usuario'
import NewViandaView from '@/views/NewViandaView.vue'
import PedidosView from '@/views/PedidosView.vue'
import DistribuidorasView from '@/views/DistribuidorasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/client/ordenar',
      name: 'ordenar',
      component: DistribuidorasView,
      // meta: { requiresAuth: true, roles: ["ROLE_CLIENTE"] },
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
      path: '/client/home',
      name: 'client-home',
      component: ClientHomeView,
    },
    {
      path: '/admin/home',
      name: 'admin-home',
      component: AdminHomeView,
    },
    {
      path: '/admin/viandas',
      name: 'admin-viandas',
      component: ViandasView,
      // meta: { requiresAuth: true, roles: ["ROLE_ADMINISTRADOR"] },
    },
    {
      path: '/admin/viandas/new',
      name: 'new-vianda',
      component: NewViandaView,
      // meta: { requiresAuth: true, roles: ["ROLE_ADMINISTRADOR"] },
    },
    {
      path: '/admin/pedidos',
      name: 'pedidos',
      component: PedidosView,
      // meta: { requiresAuth: true, roles: ["ROLE_ADMINISTRADOR"] },
    },
    
  ],
})

router.beforeEach((to, from, next) => {
  const usuarioStore = useUsuarioStore();
  const token = localStorage.getItem("access_token");

  if (to.meta.requiresAuth) {
    if (!token) {
      return next("/");
    }

    if (to.meta.roles && to.meta.roles[0] !== usuarioStore.rol) {
      alert("No tienes permisos para acceder a esta página");
      return next("/");
    }
  }

  next();
})

export default router
