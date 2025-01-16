import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Layout from '@/layout.vue'; // Your main layout

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: Layout }, // Default layout
  },

  // Add your routes here
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/encomendas',
    name: 'Encomenda',
    component: () => import('@/views/Encomendas.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/volumesEncomendas/:id?',
    name: 'VolumesEncomenda',
    component: () => import('@/views/volumesEncomendas.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/produtos/:id?',
    name: 'Produtos',
    component: () => import('@/views/produtos.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/sensores/:id?',
    name: 'Sensores',
    component: () => import('@/views/Sensores.vue'),
    meta: { layout: Layout },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
