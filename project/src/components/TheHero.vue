<script lang="ts" setup>
import TheButton from './TheButton.vue';
import IconStar from './icons/IconStar.vue';
import IconFavorite from './icons/iconFavorite.vue';
import IconRenew from './icons/IconRenew.vue';
import IconFavoriteColored from './icons/iconFavoriteColored.vue';
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { getOneMovie } from '@/api/movies';
import { convertToHours } from '@/utils/convertTime';
import { updateModalState } from '@/utils/updateModalState';
import { addMovieToFavorites } from '@/utils/addMovieToFavorites';
import { removeMovieFromFavorites } from '@/utils/removeMovieFromFavorites';
import { convertGenres } from '@/utils/convertGenres';
import type { TGenreForSpan, TMovie } from '@/types/movie';
import TheImage from './TheImage.vue';
import { isDesktop } from '@/singltons/isDesktop';

const props = defineProps<{
  movie: TMovie;
  isCard: boolean;
  classes?: string;
}>();

const userStore = useUserStore();
const router = useRouter();

const randomMovie = ref<TMovie | null>(null);
const isFavorites = ref<boolean>(false);
const genres = ref<Array<TGenreForSpan>>([]);
const isImageLoadingError = ref<boolean>(false);

const handleFavoriteButton = async () => {
  if (!userStore.isAuthorized) {
    updateModalState(true);
  } else {
    if (randomMovie.value) {
      if (!isFavorites.value) {
        addMovieToFavorites(randomMovie.value.id);
      } else {
        removeMovieFromFavorites(randomMovie.value.id);
      }
      isFavorites.value = !isFavorites.value;
    }
  }
};

const checkFavorite = () => {
  if (randomMovie.value) {
    isFavorites.value = userStore
      .getFavorites()
      .includes(randomMovie.value.id.toString());
  }
};

const getRandomMovie = async () => {
  randomMovie.value = await getOneMovie('random');
  checkFavorite();
  if (randomMovie.value?.genres)
    genres.value = convertGenres(randomMovie.value.genres);
};

const goToMoviePage = () => {
  if (randomMovie.value) router.push(`/movies/${randomMovie.value.id}`);
};

watch(
  userStore,
  () => {
    if (userStore.isAuthorized) checkFavorite();
  },
  {
    immediate: true,
    deep: true,
  },
);

onMounted(() => {
  randomMovie.value = props.movie;
  if (userStore.isAuthorized) checkFavorite();
  if (randomMovie.value.genres)
    genres.value = convertGenres(randomMovie.value.genres);
});
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
        <span
          v-for="genre in genres"
          class="hero__description-genre"
          :key="genre.id"
        >
          {{ genre.genre }}
        </span>
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
        <div class="bottom-top">
          <TheButton :btn-classes="'hero__description-trailer btn-primary'">
            Трейлер
          </TheButton>
        </div>
        <div class="bottom-bottom flex">
          <TheButton
            v-if="!isCard"
            :btn-classes="'btn-secondary hero__description-about'"
            @click="goToMoviePage"
          >
            О фильме
          </TheButton>
          <TheButton
            :btn-classes="'hero__description-icon btn-secondary btn-svg flex'"
            @click="handleFavoriteButton"
          >
            <IconFavoriteColored v-if="isFavorites" />
            <IconFavorite v-if="!isFavorites" />
          </TheButton>
          <TheButton
            :btn-classes="'hero__description-icon btn-secondary btn-svg flex'"
            v-if="!isCard"
            @click="getRandomMovie"
          >
            <IconRenew />
          </TheButton>
        </div>
      </div>
    </div>
    <div class="hero__poster">
      <div class="error" v-if="isImageLoadingError">Error!</div>
      <TheImage
        v-else-if="!isImageLoadingError"
        :classes="'hero__poster-image'"
        :srcString="randomMovie.backdropUrl"
        :altString="randomMovie.title"
        :key="'i' + randomMovie.id"
        :is-big="isDesktop"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  padding: 0 20px;
  flex-direction: column-reverse;
  row-gap: 24px;
  align-items: flex-start;

  &__description {
    flex-direction: column;

    &-top {
      margin-bottom: 16px;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 16px;
      row-gap: 8px;
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
      margin-bottom: 32px;
      flex-direction: column;
      row-gap: 16px;
    }

    &-title {
      margin-bottom: 0;
    }

    &-trailer,
    &-about {
      padding: 16px 40px;
    }

    &-trailer {
      width: 335px;
    }

    &-icon {
      padding: 16px 22px;
      align-items: center;
      justify-content: center;
    }
  }

  &__description,
  &__poster {
    width: 100%;
  }

  &__poster {
    height: 234px;
  }

  &__poster :deep(.image) {
    border-radius: 16px;
    overflow: hidden;
  }
}

.bottom {
  width: 100%;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 16px;
  align-items: center;
  justify-content: center;

  &-top {
    text-align: center;
  }

  &-bottom {
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
  }
}

@media (min-width: 1024px) {
  .hero {
    padding: 32px 0 0;
    flex-direction: row;
    justify-content: space-between;

    &__poster {
      max-width: 680px;
      height: 552px;
    }

    &__description {
      padding-right: 12px;
      max-width: 600px;

      &-middle {
        margin-bottom: 60px;
      }

      &-trailer,
      &-about {
        padding: 16px 48px;
      }

      &-trailer {
        width: unset;
      }
    }
  }

  .bottom {
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    column-gap: 16px;

    &-bottom {
      max-width: unset;
    }
  }
}
</style>
