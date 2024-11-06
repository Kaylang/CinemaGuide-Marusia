<script lang="ts" setup>
import { ref } from 'vue';
import type { TMovie } from '@/types/movie';
import { getTopTenMovies } from '@/api/movies';
import PosterCard from './PosterCard.vue';

const topTen = ref<TMovie[] | null>(null);

const getTopTen = async () => {
  let count = 0;
  const movies = await getTopTenMovies();
  if (movies) {
    topTen.value = movies?.map((item: TMovie) => {
      return { ...item, count: ++count };
    });
  }
};

getTopTen();
</script>

<template>
  <section class="list">
    <h2 class="list__title">Топ 10 фильмов</h2>
    <div class="list__wrapper flex">
      <PosterCard v-for="movie in topTen" :key="movie.id" :movie="movie" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.list {
  margin: 0 auto;
  padding: 80px 80px 120px;
  width: 100%;

  &__wrapper {
    flex-wrap: wrap;
    column-gap: 40px;
    row-gap: 64px;
  }

  &__title {
    margin-bottom: 64px;
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
  }
}
</style>
