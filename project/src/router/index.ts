import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/genres',
      name: 'genres',
      component: () => import('../views/GenresView.vue'),
    },
    {
      path: '/genre/:genre',
      name: 'filmsOfGenre',
      component: () => import('../views/GenreFilmsView.vue'),
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: () => import('../views/MovieCardView.vue'),
    },
    {
      path: '/user',
      name: 'userPage',
      component: () => import('../views/UserPage.vue'),
      meta: {
        requiredAuth: true,
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
