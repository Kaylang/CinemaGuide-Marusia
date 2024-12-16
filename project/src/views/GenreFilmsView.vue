<script lang="ts" setup>
import { getMovies } from '@/api/movies';
import { EGenres } from '@/enums/genres';
import type { TCard, TGenre, TMovie } from '@/types/movie';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PosterCard from '@/components/PosterCard.vue';
import TheButton from '@/components/TheButton.vue';

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

const onClick = async () => {
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

onMounted(() => {
  getMoviesList();
});
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
          :classes="'genre__poster'"
        />
      </div>
      <TheButton :btn-classes="'btn-primary'" v-if="isMore" @click="onClick">
        Показать ещё
      </TheButton>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.genre {
  padding-bottom: 40px;
  text-align: center;

  &__title {
    text-transform: capitalize;
  }

  &__wrapper {
    margin-bottom: 40px;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 24px;
    column-gap: 20px;
  }
}

@media (min-width: 1024px) {
  .genre {
    padding-bottom: 160px;
    &__wrapper {
      margin-bottom: 64px;
      column-gap: 40px;
      row-gap: 64px;
      &__poster {
        width: 335px;
        height: 502px;
      }
    }
  }
}
</style>
