<script lang="ts" setup>
import { ref } from 'vue';
import type { TCard, TMovie } from '@/types/movie';
import { getTopTenMovies } from '@/api/movies';
import PosterCard from './PosterCard.vue';

const movieCards = ref<TCard[] | null>(null);

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

getTopTen();
</script>

<template>
  <section class="list">
    <h2 class="list__title section-title">Топ 10 фильмов</h2>
    <div class="list__wrapper flex">
      <PosterCard v-for="movie in movieCards" :key="movie.id" :movie="movie" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.list {
  padding-top: 80px;

  &__wrapper {
    flex-wrap: wrap;
    column-gap: 40px;
    row-gap: 64px;
  }
}
</style>
