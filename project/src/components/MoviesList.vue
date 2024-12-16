<script lang="ts" setup>
import type { TCard } from '@/types/movie';
import PosterCard from './PosterCard.vue';

const { movieCards } = defineProps<{
  movieCards: TCard[];
  title?: string;
  isFavorites?: boolean;
}>();

const emit = defineEmits(['update:renewList']);
</script>

<template>
  <section class="list">
    <h2 v-if="title" class="list__title section-title">{{ title }}</h2>
    <div class="list__wrapper flex">
      <PosterCard
        v-for="movie in movieCards"
        :class="[{ poster__favorite: isFavorites }]"
        :key="movie.id"
        :movie="movie"
        :isFavorite="isFavorites"
        @update:renewList="emit('update:renewList')"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.list {
  padding-top: 32px;
  position: relative;
  &__wrapper {
    margin: -80px 0 -60px;
    padding: 80px 20px 60px 20px;
    position: relative;
    width: 100vw;
    overflow-x: auto;
    flex-wrap: nowrap;
    column-gap: 40px;
    row-gap: 0;
    // scrollbar-width: none;
  }

  &__title {
    margin-bottom: 40px;
    padding: 0 20px;
  }
}

@media (min-width: 1024px) {
  .list {
    padding-top: 40px;

    &__title {
      margin-bottom: 64px;
    }

    &__wrapper {
      margin: 0;
      padding: 0;
      width: 100%;
      flex-wrap: wrap;
      row-gap: 64px;
      overflow-x: unset;
    }
  }
}
</style>
