<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MoviesList from '@/components/MoviesList.vue';
import TheHero from '../components/TheHero.vue';
import { getOneMovie, getTopTenMovies } from '@/api/movies';
import type { TCard, TMovie } from '@/types/movie';

const movie = ref<TMovie | null>(null);
const movieCards = ref<TCard[]>([]);

const getRandomMovie = async () => {
  movie.value = await getOneMovie('random');
};

const getTopTen = async () => {
  let count = 0;
  const movies = await getTopTenMovies();
  if (movies) {
    movieCards.value = movies?.map((item: TMovie) => {
      return {
        id: item.id,
        title: item.title,
        posterUrl: item.posterUrl,
        count: ++count,
      };
    });
  }
};

onMounted(() => {
  getRandomMovie();
  getTopTen();
});
</script>

<template>
  <main class="main">
    <TheHero v-if="movie" :movie="movie" :isCard="false" />
    <MoviesList :movie-cards="movieCards" :title="'Топ 10 фильмов'" />
  </main>
</template>
