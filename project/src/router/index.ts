import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useUserStore } from '@/stores/user';

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
      },
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (!userStore.isAuthorized) {
          next('/');
        } else {
          next();
        }
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
