<script setup lang="ts">
import MoviesList from '@/components/page-blocks/MoviesList.vue';
import TheHero from '../components/page-blocks/TheHero.vue';
import { onMounted, ref } from 'vue';
import { getOneMovie, getTopTenMovies } from '@/api/movies';
import type { TCard, TMovie } from '@/types/movie';
import TheSpinner from '@/components/TheSpinner.vue';

const movie = ref<TMovie | null>(null);
const movieCards = ref<TCard[]>([]);

const getRandomMovie = async () => {
  movie.value = await getOneMovie('random');
};

const getTopTen = async () => {
  let count = 0;
  const movies = await getTopTenMovies();
  if (movies) {
    movieCards.value = movies.map((item: TMovie) => {
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
    <div v-else class="main__spinner grid">
      <TheSpinner :class="'big'" />
    </div>
    <MoviesList :movie-cards="movieCards" :title="'Топ 10 фильмов'" />
  </main>
</template>

<style lang="scss">
.main {
  &__spinner {
    min-height: 600px;
    align-items: center;
    justify-content: center;
  }
}
</style>
