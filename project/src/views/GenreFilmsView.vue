<script lang="ts" setup>
import { getMovies } from '@/api/movies';
import { EGenres } from '@/enums/genres';
import type { TCard, TGenre, TMovie } from '@/types/movie';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PosterCard from '@/components/PosterCard.vue';

const route = useRoute();

const movieCards = ref<TCard[] | null>(null);
const page = ref<number>(0);
const isMore = ref<boolean>(true);

const title = route.params.genre as TGenre;

const getMovieMap = (arr: TMovie[]): { list: TCard[]; more: boolean } => {
  const list = arr.map((item: TMovie) => {
    return {
      id: item.id,
      title: item.title,
      posterUrl: item.posterUrl,
      count: 0,
    };
  });
  const more = list.length % 15 === 0;
  return { list, more };
};

const getMoviesList = async () => {
  const movies = await getMovies({
    count: 15,
    page: page.value,
    genre: title,
  });
  if (movies) {
    const { list, more } = getMovieMap(movies);
    movieCards.value = list;
    isMore.value = more;
  }
};

const getMoreMovies = async () => {
  const movies = await getMovies({
    count: 15,
    page: ++page.value,
    genre: title,
  });
  if (movies) {
    const { list, more } = getMovieMap(movies);
    movieCards.value?.push(...list);
    isMore.value = more;
  }
};

getMoviesList();
</script>

<template>
  <main class="main">
    <section class="genre section">
      <h2 class="genre__title section-title">{{ EGenres[title] }}</h2>
      <div class="genre__wrapper flex">
        <PosterCard
          v-for="movie in movieCards"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <button
        class="genre__more btn-primary"
        v-if="isMore"
        @click="getMoreMovies()"
        type="button"
      >
        Показать ещё
      </button>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.genre {
  text-align: center;

  &__title {
    text-transform: capitalize;
  }

  &__wrapper {
    margin-bottom: 64px;
    flex-wrap: wrap;
    column-gap: 40px;
    row-gap: 64px;
  }

  &__more {
    padding: 16px 48px;
  }
}
</style>
