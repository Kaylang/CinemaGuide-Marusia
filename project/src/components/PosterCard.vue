<script lang="ts" setup>
import type { TMovie } from '@/types/movie';

defineProps<{
  movie: TMovie;
}>();
</script>

<template>
  <div class="poster">
    <span class="poster__count flex">{{ movie.count }}</span>
    <router-link :to="{ name: 'movie', params: { id: movie.id } }">
      <img class="poster__image" :src="movie.posterUrl" :alt="movie.title" />
    </router-link>
  </div>
</template>

<style lang="scss" scope>
.poster {
  position: relative;
  width: 224px;
  height: 338px;
  border-radius: 16px;
  border: 1px solid var(--white25);
  box-shadow: 0px 0px 80px var(--white33);

  &__image {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 16px;
    object-fit: cover;
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
    color: var(--content-active);
    background-color: var(--white);
  }
}
</style>
