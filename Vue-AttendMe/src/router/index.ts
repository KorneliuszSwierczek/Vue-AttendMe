import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Strona logowania
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Auth/LoginPanel.vue'), // Lazy-loading komponentu
  },
  // Dashboard studenta
  {
    path: '/student-dashboard',
    name: 'student-dashboard',
    component: () =>
      import('../components/StudentDashboard/StudentDashboard.vue'), // Lazy-loading komponentu
  },
  // Dashboard wykładowcy
  {
    path: '/lecturer-dashboard',
    name: 'lecturer-dashboard',
    component: () =>
      import('../components/LecturerDashboard/LecturerDashboard.vue'), // Lazy-loading komponentu
  },
 
];

const router = createRouter({
  history: createWebHistory(), // Używa historii HTML5
  routes,
});

export default router;
