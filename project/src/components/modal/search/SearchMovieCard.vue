<script lang="ts" setup>
import TheImage from '@/components/ui-components/TheImage.vue';
import IconStar from '@/components/icons/IconStar.vue';
import TheButton from '@/components/ui-components/TheButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { convertToHours } from '@/utils/convertTime';
import { convertGenres } from '@/utils/convertGenres';
import { isDesktop } from '@/singltons/isDesktop';
import type { TGenreForSpan, TMovie } from '@/types/movie';

const props = defineProps<{
  movie: TMovie;
}>();
const emit = defineEmits(['update:closeSearch']);

const router = useRouter();

const genres = ref<Array<TGenreForSpan>>([]);
if (props.movie.genres) genres.value = convertGenres(props.movie.genres);

const closeSearch = () => {
  emit('update:closeSearch', event);
  router.push(`/movies/${props.movie.id}`);
};
</script>

<template>
  <div class="search__item">
    <TheButton class="search__link flex" @click="closeSearch">
      <div class="search__link-wrapper image">
        <TheImage
          :classes="'search__link-image'"
          :srcString="movie.backdropUrl"
          :altString="movie.title"
          :title="movie.title"
          :is-poster="false"
          :is-small="isDesktop"
        />
      </div>
      <div class="search__link-info info flex">
        <div class="info__top flex">
          <span
            v-if="movie.tmdbRating"
            class="info__raiting flex"
            :class="{
              red: movie.tmdbRating <= 5,
              gray: movie.tmdbRating > 5 && movie.tmdbRating <= 7,
              green: movie.tmdbRating > 7 && movie.tmdbRating <= 8,
              gold: movie.tmdbRating > 8,
            }"
          >
            <IconStar />
            {{ Math.round(movie.tmdbRating * 10) / 10 }}
          </span>
          <span class="info__year">
            {{ movie.releaseYear }}
          </span>
          <span v-for="genre in genres" class="info__genre" :key="genre.id">
            {{ genre.genre }}
          </span>
          <span v-if="movie.runtime" class="info__duration"
            >{{ convertToHours(movie.runtime) }}
          </span>
        </div>
        <h3 class="search__link-title">{{ movie.title }}</h3>
      </div>
    </TheButton>
  </div>
</template>

<style lang="scss" scoped>
.search {
  &__btn-close {
    display: block;
  }
  &__wrapper {
    align-items: center;
  }

  &__item {
    width: 220px;
    flex-shrink: 0;
  }

  &__link {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    row-gap: 16px;
    text-align: left;
    border: 1px solid transparent;
    background-color: transparent;
    cursor: pointer;
    transition: border-color 0.3s ease-in-out;

    &-title {
      font-size: 18px;
      line-height: 24px;
      color: var(--white);
    }

    &__link :deep(.image) {
      width: 158px;
      height: 206px;
    }
  }

  &__link:focus,
  &__link:focus-visible,
  &__link:active {
    border-color: var(--content-disabled);
  }
}

.image {
  width: 100%;
  height: 206px;
}

.info {
  flex-direction: column;
  row-gap: 8px;

  &__top {
    flex-wrap: wrap;
    align-items: center;
    column-gap: 12px;
    row-gap: 12px;
    font-size: 14px;
    line-height: 20px;
    color: var(--content-secondary);
  }

  &__raiting {
    padding: 2px 8px;
    align-items: center;
    column-gap: 4.25px;
    border-radius: 16px;
    color: var(--white);
  }
}

@media (min-width: 1024px) {
  .search {
    &__item {
      width: 100%;
    }

    &__link {
      padding: 8px 20px;
      flex-direction: row;
      column-gap: 16px;
      border-radius: 6px;
      &-wrapper {
        align-items: flex-start;
      }
    }

    &__link :deep(.image) {
      width: 40px;
      height: 52px;
    }
  }

  .info {
    padding: 0;
    align-items: flex-start;
    justify-content: flex-start;
    column-gap: 16px;
    background-color: transparent;

    &__top {
      justify-content: flex-start;
    }
  }
}

@media (hover: hover) {
  .search {
    &__link:hover {
      border-color: var(--content-disabled);
    }
  }
}
</style>
