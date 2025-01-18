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
    path: '/produtos/:id?/volume/:idVolume?',
    name: 'Produtos',
    component: () => import('@/views/Produtos.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/sensores/:id?',
    name: 'Sensores',
    component: () => import('@/views/Sensores.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/sensor',
    name: 'Sensor',
    component: () => import('@/views/Sensor.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/AddMedicoes/:id?',
    name: 'AddMedicoes',
    component: () => import('@/views/addMedicoes.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('@/views/Perfil.vue'),
    meta: { layout: Layout },
  },

  {
    path: '/editar-perfil',
    name: 'EditarPerfil',
    component: () => import('@/views/EditarPerfil.vue'),
    meta: { layout: Layout },
  },
  {
    path:'/register',
    name:'Register',
    component: () => import('@/views/Register.vue'),
    meta: { layout: Layout },
  },
  {
    path:'/Encomendar',
    name:'Encomendar',
    component: () => import('@/views/Encomendar.vue'),
    meta: { layout: Layout },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
