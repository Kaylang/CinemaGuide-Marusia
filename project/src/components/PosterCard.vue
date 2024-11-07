<script lang="ts" setup>
import type { TCard } from '@/types/movie';

defineProps<{
  movie: TCard;
}>();
</script>

<template>
  <div class="poster">
    <span v-if="movie.count !== 0" class="poster__count flex">{{
      movie.count
    }}</span>
    <router-link
      class="poster__link"
      :to="{ name: 'movie', params: { id: movie.id } }"
    >
      <img
        v-if="movie.posterUrl"
        class="poster__image"
        :src="movie.posterUrl"
        :alt="movie.title"
        :title="movie.title"
      />
      <div v-if="!movie.posterUrl" class="poster__no-poster flex">
        <span>
          {{ movie.title }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scope>
.poster {
  position: relative;
  padding: 0;
  width: 224px;
  height: 338px;
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
  }

  &__image {
    width: 100%;
    height: 100%;
    align-self: center;
    justify-self: center;
    border-radius: 16px;
    object-fit: cover;
  }

  &__no-poster {
    padding: 12px;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: center;
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
}
@media (hover: hover) {
  .poster:hover {
    transform: scale(1.1);
  }
}
</style>
