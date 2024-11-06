import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GenresView from '../views/GenresView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import MovieCardView from '@/views/MovieCardView.vue'

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
      component: GenresView,
      // component: () => import('../views/GenresView.vue'),
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: MovieCardView,
      // component: () => import('../views/GenresView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
