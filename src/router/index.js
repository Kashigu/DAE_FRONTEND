import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Layout from '@/layout.vue';

const routes = [
  {
    path: '/',
    component: Layout, // Use RootLayout as the parent layout
    children: [
      { path: '', component: Home },
      
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
