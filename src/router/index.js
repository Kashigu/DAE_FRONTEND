import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Layout from '@/layout.vue'; // Your main layout

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: Layout }, // Default layout
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
