import { createRouter, createWebHistory } from 'vue-router';
/* import Home from '../components/home.vue';
import Dev from '../components/dev.vue'; */

// Definir rutas
const routes = [
  /* {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
        path: '/dev',
        name: 'Dev',
        component: Dev
    } */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
