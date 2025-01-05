<script lang="ts" setup>
import IconSearch from '@/components/icons/IconSearch.vue';
import TheButton from '@/components/ui-components/TheButton.vue';
import SearchMovieCard from './SearchMovieCard.vue';
import { onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { isDesktop } from '@/singltons/isDesktop';
import { getMovies } from '@/api/movies';
import { debounce } from '@/utils/debounce';
import type { TGenre, TMovie } from '@/types/movie';

const isSearchOpen = ref<boolean>(false);
const isCloseVisible = ref<boolean>(false);
const isResultOpen = ref<boolean>(false);
const movies = ref<TMovie[] | null>([]);
const input = ref<HTMLInputElement | null>(null);
const route = useRoute();
const genreFromPath = ref<TGenre | undefined>();
const timerId = ref<number>(0);

const getSearchData = async (args: { title: string; genre?: TGenre }) => {
  const { title, genre } = args;
  if (title.length > 1) {
    movies.value = await getMovies({ count: 5, title, genre });
    isResultOpen.value = isSearchOpen.value =
      movies.value?.length && movies.value?.length > 0 ? true : false;
  }
};

const getSearchDataDebounced = debounce(getSearchData, 500);

const onInput = async (event: Event) => {
  const el = event.target as HTMLInputElement;
  if (el.value.trim() !== '') {
    isCloseVisible.value = true;
    if (route.params.genre) genreFromPath.value = route.params.genre as TGenre;
    getSearchDataDebounced({
      title: el.value.trim(),
      genre: genreFromPath.value,
    });
  } else {
    isSearchOpen.value = false;
    isCloseVisible.value = false;
    isResultOpen.value = false;
  }
};

const openSearch = () => {
  isSearchOpen.value = true;
};

const closeSearch = (event: Event) => {
  isSearchOpen.value = false;
  isCloseVisible.value = false;
  isResultOpen.value = false;
  const el = event.currentTarget as HTMLElement;
  if (
    el.previousElementSibling &&
    el.previousElementSibling instanceof HTMLInputElement
  )
    el.previousElementSibling.value = '';

  if (input.value) input.value.value = '';
  if (movies.value) movies.value.length = 0;
};

onBeforeUnmount(() => {
  if (timerId.value) clearTimeout(timerId.value);
});

watch(input, () => {
  if (input.value) {
    input.value.focus();
  }
});
</script>

<template>
  <div class="search flex">
    <Transition name="move">
      <div class="search__wrapper flex" v-if="isDesktop || isSearchOpen">
        <Transition name="opacity">
          <div class="search__wrapper-result flex" v-if="isResultOpen">
            <template v-if="isResultOpen">
              <SearchMovieCard
                v-for="movie in movies"
                :movie="movie"
                :key="movie.id"
                @update:close-search="closeSearch"
              />
            </template>
          </div>
        </Transition>
        <div class="search__icon">
          <IconSearch />
        </div>
        <input
          class="search__input"
          type="text"
          placeholder="Поиск"
          @input="onInput"
          ref="input"
        />
        <Transition name="opacity">
          <TheButton
            :btn-classes="'btn-close'"
            class="search__btn-close"
            @click="closeSearch"
            v-if="!isDesktop || isCloseVisible"
          ></TheButton>
        </Transition>
      </div>
    </Transition>
    <TheButton
      :btn-classes="''"
      class="search__btn-open flex"
      @click="openSearch"
      v-if="!isDesktop && !isSearchOpen"
    >
      <IconSearch />
    </TheButton>
    <div
      :class="['overlay', { active: isSearchOpen }]"
      v-show="isSearchOpen"
      @click="closeSearch"
    ></div>
  </div>
</template>

<style lang="scss">
.search {
  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 56px;
    padding: 16px 18px;
    width: 100%;
    min-width: 335px;
    align-items: center;
    column-gap: 12px;
    border-radius: 8px;
    background-color: var(--background-secondary);
    z-index: 110;

    &-result {
      position: absolute;
      left: 0;
      top: 68px;
      padding: 16px 18px;
      width: 100%;
      flex-wrap: nowrap;
      column-gap: 16px;
      border-radius: 8px;
      background-color: var(--background-secondary);
      overflow-x: auto;
      z-index: 110;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__input {
    border: none;
    outline: none;
    background-color: inherit;
    width: 100%;
    font-size: 18px;
    line-height: 24px;
    color: var(--white50);
  }

  &__btn-open {
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  &__btn-close {
    position: relative;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background-color: transparent;
  }
  &__btn-open svg path,
  &__btn-close svg path {
    fill-opacity: 1;
  }

  &__btn-close::after,
  &__btn-close::before {
    width: 16px;
    background-color: var(--white);
  }
}

@media (min-width: 1024px) {
  .search {
    &__wrapper {
      position: relative;
      top: unset;
      left: unset;
      min-width: 655px;
      padding: 12px 16px;
      margin-right: auto;

      &-result {
        left: unset;
        right: 0;
        padding: 8px;
        width: 85%;
        flex-direction: column;
        overflow-x: unset;
      }
    }

    &__icon {
      margin-right: 12px;
      display: block;
    }

    &__input {
      width: 100%;
      font-size: 18px;
      line-height: 24px;
      color: var(--white50);
    }

    &__input:focus-visible,
    &__input:focus {
      border: none;
      outline: none;
    }

    &__btn-close::after,
    &__btn-close::before {
      background-color: var(--content-disabled);
    }
  }
  .info {
    flex-shrink: 0;
  }
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

.move-enter-active,
.move-leave-active {
  transition: top 0.5s ease-in-out;
}

.move-enter-from,
.move-leave-to {
  top: -70px;
}
</style>
