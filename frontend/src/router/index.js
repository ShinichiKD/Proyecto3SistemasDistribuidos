import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/login.vue'
import principal from '../components/principal.vue'
import admin from '../components/admin.vue'

// Definir rutas
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/principal',
    name: 'principal',
    component: principal
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
