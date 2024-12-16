<script lang="ts" setup>
import type { TCard } from '@/types/movie';
import TheButton from './TheButton.vue';
import { removeFromFavorites } from '@/api/favorites';
import { useUserStore } from '@/stores/user';
import TheImage from './TheImage.vue';

defineProps<{
  movie: TCard;
  isFavorite?: boolean;
  classes?: string;
}>();

const emit = defineEmits(['update:renewList']);

const userStore = useUserStore();

const removeFavorite = async (id: number) => {
  await removeFromFavorites(id);
  userStore.deleteFavorite(id);
  emit('update:renewList');
};
</script>

<template>
  <div class="poster" :class="classes">
    <span v-if="movie.count !== 0" class="poster__count flex">{{
      movie.count
    }}</span>
    <router-link
      class="poster__link"
      :to="{ name: 'movie', params: { id: movie.id } }"
    >
      <TheImage
        :classes="'poster__image'"
        :srcString="movie.posterUrl"
        :altString="movie.title"
        :title="movie.title"
        :is-poster="true"
      />
    </router-link>
    <TheButton
      v-if="isFavorite"
      :btn-classes="'btn-close'"
      class="poster__btn-remove-favorite"
      @click="removeFavorite(movie.id)"
    ></TheButton>
  </div>
</template>

<style lang="scss">
.poster {
  position: relative;
  padding: 0;
  display: flex;
  width: 224px;
  height: 338px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid var(--white25);
  box-shadow: 0px 0px 80px var(--white33);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;

  &__link {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 24px;
    overflow: hidden;
    cursor: url('./images/cursor-hovered.png'), auto;
  }

  &__image {
    border-radius: 16px;
  }

  &__count {
    position: absolute;
    top: -12px;
    left: -12px;
    padding: 8px 24px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: var(--brand-active);
    background-color: var(--white);
  }

  &__btn-remove-favorite {
    width: 40px;
    height: 40px;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &__favorite::after {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    width: 0;
    height: 0;
    border-radius: 16px;
    background-color: var(--white);
    z-index: -20;
    transition-property: width, height;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    overflow: hidden;
  }
}

.genre {
  &__poster {
    width: 335px;
    height: 502px;
  }
}
@media (min-width: 1024px) {
  .genre {
    &__poster {
      width: 224px;
      height: 338px;
    }
  }
}

@media (hover: hover) {
  .poster {
    &:hover {
      transform: scale(1.05);
    }
    &__favorite:hover {
      transform: scale(1);
    }
    &__favorite:hover::after {
      width: 224px;
      height: 338px;
    }
    &__favorite:hover button {
      opacity: 1;
    }
  }
}
</style>
