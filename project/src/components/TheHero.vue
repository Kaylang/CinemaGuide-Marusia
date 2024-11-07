<script lang="ts" setup>
import { getOneMovie } from '@/api/movies';
import type { TMovie } from '@/types/movie';
import { ref, watch } from 'vue';
import IconStar from './icons/IconStar.vue';
import { convertToHours } from '@/utils/convertTime';
import { EGenres } from '@/enums/genres';
import IconFavorite from './icons/iconFavorite.vue';
import IconRenew from './icons/IconRenew.vue';

const props = defineProps<{
  movie: TMovie;
  isCard: boolean;
}>();

// const genres = ref<string>('');
const randomMovie = ref<TMovie | null>(null);

randomMovie.value = props.movie;

const getRandomMovie = async () => {
  randomMovie.value = await getOneMovie('random');
};

watch(
  props.movie,
  () => {
    randomMovie.value = props.movie;
  },
  { immediate: true, deep: true },
);

// watch(
//   props.movie,
//   () => {
//     if (movie.value?.genres) {
//       genres.value = getGenresFromArray(movie.value?.genres);
//     }
//   },
//   { immediate: true, deep: true },
// );
</script>

<template>
  <section class="hero flex" v-if="randomMovie">
    <div class="hero__description flex">
      <div class="hero__description-top flex">
        <span
          v-if="randomMovie.tmdbRating"
          class="hero__description-raiting flex"
          :class="{
            red: randomMovie.tmdbRating <= 5,
            gray: randomMovie.tmdbRating > 5 && randomMovie.tmdbRating <= 7,
            green: randomMovie.tmdbRating > 7 && randomMovie.tmdbRating <= 8,
            gold: randomMovie.tmdbRating > 8,
          }"
        >
          <IconStar />
          {{ Math.round(randomMovie.tmdbRating * 10) / 10 }}</span
        >
        <span class="hero__description-year">{{
          randomMovie.releaseYear
        }}</span>
        <span v-if="randomMovie.genres" class="hero__description-genre">{{
          randomMovie.genres.reduce(
            (accum, genre, index, genArray) =>
              accum +
              (index < genArray.length - 1
                ? EGenres[genre] + ', '
                : EGenres[genre]),
            '',
          )
        }}</span>
        <span v-if="randomMovie.runtime" class="hero__description-duration">{{
          convertToHours(randomMovie.runtime)
        }}</span>
      </div>
      <div class="hero__description-middle flex">
        <h2 class="hero__description-title section-title">
          {{ randomMovie.title }}
        </h2>
        <p class="hero__description-plot">
          {{ randomMovie.plot }}
        </p>
      </div>
      <div class="hero__description-bottom bottom flex">
        <button class="hero__description-trailer btn-primary" type="button">
          Трейлер
        </button>
        <router-link
          v-if="!isCard"
          class="hero__description-about btn-secondary"
          :to="{ name: 'movie', params: { id: randomMovie.id } }"
        >
          О фильме
        </router-link>
        <button
          class="hero__description-icon btn-secondary btn-svg flex"
          type="button"
        >
          <IconFavorite />
        </button>
        <button
          class="hero__description-icon btn-secondary btn-svg flex"
          v-if="!isCard"
          type="button"
          @click="getRandomMovie()"
        >
          <IconRenew />
        </button>
      </div>
    </div>
    <div class="hero__poster">
      <img
        v-if="randomMovie.backdropUrl"
        class="hero__poster-image"
        :src="randomMovie.backdropUrl"
        :alt="randomMovie.title"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  padding-top: 32px;
  min-height: 586px;
  justify-content: space-between;
  align-items: center;

  &__description {
    padding-right: 12px;
    width: 45%;
    max-width: 600px;
    flex-direction: column;

    &-top {
      margin-bottom: 16px;
      align-items: center;
      column-gap: 16px;
      color: var(--content-secondary);
    }

    &-raiting {
      padding: 8px 12px;
      align-items: center;
      column-gap: 4px;
      border-radius: 16px;
      font-weight: 700;
      color: var(--content-primary);
    }

    &-plot {
      font-size: 24px;
      line-height: 32px;
      color: var(--content-secondary);
    }

    &-duration {
      flex-shrink: 0;
    }

    &-middle {
      margin-bottom: 80px;
      flex-direction: column;
      row-gap: 16px;
    }

    &-trailer,
    &-about {
      padding: 16px 48px;
    }

    &-icon {
      padding: 16px 22px;
      align-items: center;
      justify-content: center;
    }

    &-bottom {
      align-items: center;
      column-gap: 16px;
    }
  }

  &__poster {
    max-width: 680px;
    max-height: 552px;
    width: 55%;
    &-image {
      width: 100%;
      height: 100%;
      min-height: 552px;
      display: block;
      border-radius: 16px;
      object-fit: cover;
    }
  }
}
</style>
