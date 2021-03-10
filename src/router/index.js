import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '../components/PageHome.vue';
import PageGame from '../components/PageGame.vue';
import PageHistory from '../components/PageHistory.vue';

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/game',
    name: 'PageGame',
    component: PageGame
  },
  {
    path: '/history',
    name: 'PageHistory',
    component: PageHistory
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
