<script lang="ts" setup>
import IconFavorite from '@/components/icons/iconFavorite.vue';
import IconUser from '@/components/icons/IconUser.vue';
import TheAccount from '@/components/page-blocks/TheAccount.vue';
import TheButton from '@/components/ui-components/TheButton.vue';
import MoviesList from '@/components/page-blocks/MoviesList.vue';
import { onMounted, ref, watch } from 'vue';
import { getFavorites } from '@/api/favorites';
import { isDesktop } from '@/singltons/isDesktop';
import type { TCard, TMovie } from '@/types/movie';

const isFavorites = ref<boolean>(true);
const isSetup = ref<boolean>(false);
const movieCards = ref<TCard[]>([]);
const tabFavorites = ref<'Избранные фильмы' | 'Избранное'>('Избранные фильмы');
const tabSetup = ref<'Настройка аккаунта' | 'Настройки'>('Настройка аккаунта');

const toggleTabs = (tabName: string) => {
  switch (tabName) {
    case 'favorites':
      isFavorites.value = true;
      isSetup.value = false;
      break;
    case 'setup':
      isFavorites.value = false;
      isSetup.value = true;
      break;
  }
};

const getFavoriteMovies = async () => {
  const movies = await getFavorites();
  if (movies) {
    movieCards.value = movies?.map((item: TMovie) => {
      return {
        id: item.id,
        title: item.title,
        posterUrl: item.posterUrl,
        count: 0,
      };
    });
  }
};

watch(
  isDesktop,
  () => {
    tabFavorites.value = isDesktop.value ? 'Избранные фильмы' : 'Избранное';
    tabSetup.value = isDesktop.value ? 'Настройка аккаунта' : 'Настройки';
  },
  {
    deep: true,
    immediate: true,
  },
);

onMounted(() => {
  getFavoriteMovies();
});
</script>

<template>
  <main class="main">
    <section class="user">
      <h2 class="user__title section-title">Мой аккаунт</h2>
      <div class="user__tabs flex">
        <TheButton
          :btn-classes="'user__button flex'"
          :class="[{ active: isFavorites }]"
          @click="toggleTabs('favorites')"
        >
          <IconFavorite />{{ tabFavorites }}
        </TheButton>
        <TheButton
          :btn-classes="'user__button flex'"
          :class="[{ active: isSetup }]"
          @click="toggleTabs('setup')"
        >
          <IconUser />{{ tabSetup }}
        </TheButton>
      </div>
    </section>
    <TheAccount v-if="isSetup" />
    <div class="main__wrapper">
      <MoviesList
        v-if="!isSetup"
        :movie-cards="movieCards"
        :is-favorites="true"
        @update:renew-list="getFavoriteMovies"
      />
    </div>
  </main>
</template>

<style lang="scss">
.user {
  position: relative;
  padding: 16px 20px 40px;
  z-index: 10;

  &__tabs {
    align-items: center;
    column-gap: 64px;
  }

  &__button {
    padding: 12px 0;
    align-items: center;
    column-gap: 12px;
    font-family: 'Play';
    font-size: 24px;
    line-height: 32px;
    color: var(--white);
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-bottom: 1.5px solid transparent;
    transition-property: color, border-bottom-color;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;

    &.active {
      border-bottom-color: var(--pink);
    }
  }

  &__button svg path {
    width: 24px;
    height: 24px;
    fill: var(--white);
    fill-opacity: 1;
    transition: fill 0.3s ease-in-out;
  }
}

@media (min-width: 1024px) {
  .user {
    &__tabs {
      align-items: center;
      column-gap: 64px;
    }

    &__button {
      padding: 12px 0;
      align-items: center;
      column-gap: 12px;
      font-family: 'Play';
      font-size: 24px;
      line-height: 32px;
      color: var(--white);
      background-color: transparent;
      border: none;
      cursor: pointer;
      border-bottom: 1.5px solid transparent;
      transition-property: color, border-bottom-color;
      transition-duration: 0.3s;
      transition-timing-function: ease-in-out;

      &.active {
        border-bottom-color: var(--pink);
      }
    }

    &__button svg path {
      width: 24px;
      height: 24px;
      fill: var(--white);
      fill-opacity: 1;
      transition: fill 0.3s ease-in-out;
    }
  }
}

@media (hover: hover) {
  .user {
    &__button:hover {
      color: var(--content-active);
    }
    &__button:hover svg path {
      fill: var(--content-active);
    }
  }
}
</style>
