<script lang="ts" setup>
import { getOneMovie } from '@/api/movies';
import type { TMovie } from '@/types/movie';
import { ref, watch } from 'vue';
import IconStar from './icons/IconStar.vue';
import { convertToHours } from '@/utils/convertTime';
// import { getGenresFromArray } from '@/utils/getGenresFormArray';
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

// getRandomMovie();

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
        <!-- <span class="hero__description-genre">{{ randomMovie.genres }}</span> -->
        <span v-if="randomMovie.runtime" class="hero__description-duration">{{
          convertToHours(randomMovie.runtime)
        }}</span>
      </div>
      <div class="hero__description-middle flex">
        <h2 class="hero__description-title">{{ randomMovie.title }}</h2>
        <p class="hero__description-plot">{{ randomMovie.plot }}</p>
      </div>
      <div class="hero__description-bottom bottom flex">
        <button class="hero__description-bottom-trailer" type="button">
          Трейлер
        </button>
        <router-link
          v-if="!isCard"
          class="hero__description-bottom-about"
          :to="{ name: 'movie', params: { id: randomMovie.id } }"
        >
          О фильме
        </router-link>
        <button class="hero__description-bottom-icon flex" type="button">
          <IconFavorite />
        </button>
        <button
          class="hero__description-bottom-icon flex"
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
  padding: 32px 80px 0;
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

    &-title {
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
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

    &-bottom {
      align-items: center;
      column-gap: 16px;

      button,
      &-about,
      &-trailer {
        border: 1px solid var(--btn-secondary);
        border-radius: 28px;
        background-color: var(--btn-secondary);
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        color: var(--white);
        cursor: pointer;
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

button.hero__description-bottom-trailer {
  background-color: var(--btn-primary);
}

button.hero__description-bottom-trailer:focus,
button.hero__description-bottom-trailer:focus-visible,
button.hero__description-bottom-trailer:active {
  border-color: var(--btn-primary-active);
  outline-color: var(--btn-primary-active);
  color: var(--btn-primary-active-color);
  background-color: var(--btn-primary-active);
}

a.hero__description-bottom-about:focus,
a.hero__description-bottom-about:focus-visible,
a.hero__description-bottom-about:active {
  border-color: var(--btn-secondary-active);
  outline-color: var(--btn-secondary-active);
  color: var(--btn-secondary-active-color);
  background-color: var(--btn-secondary-active);
}

// button.hero__description-bottom-icon:focus,
// button.hero__description-bottom-icon:focus-visible,
// button.hero__description-bottom-icon:active
// button.hero__description-bottom-icon:focus svg > path,
// button.hero__description-bottom-icon:focus-visible svg > path,
// button.hero__description-bottom-icon:active svg > path {
//   fill: var(--btn-secondary-active-color);
// }

@media (hover: hover) {
  button.hero__description-bottom-trailer:hover {
    color: var(--btn-primary-hover-color);
    background-color: var(--btn-primary-hover);
  }

  a.hero__description-bottom-about:hover,
  button.hero__description-bottom-icon:hover {
    border-color: var(--btn-secondary--stroke);
    color: var(--btn-secondary-hover-color);
    background-color: var(--btn-secondary-hover);
  }

  // button.hero__description-bottom-icon:hover > svg > path {
  //   fill: var(--btn-secondary-hover-color);
  // }
}
</style>
