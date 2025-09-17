import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
    { path: '/updates', name: 'updates', component: () => import('./pages/Updates.vue') },

    // add more routes as you go
  ]
})