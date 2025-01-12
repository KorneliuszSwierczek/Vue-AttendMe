import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/LoginPanel.vue';
import StudentDashboard from '../components/StudentDashboard/StudentDashboard.vue';
import LecturerDashboard from '../components/LecturerDashboard/LecturerDashboard.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/student-dashboard', component: StudentDashboard },
  { path: '/lecturer-dashboard', component: LecturerDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
