<script setup lang="ts">
import TheMoviesList from '@/components/TheMoviesList.vue';
import TheHero from '../components/TheHero.vue';
import { getOneMovie } from '@/api/movies';
import type { TMovie } from '@/types/movie';
import { ref } from 'vue';

const movie = ref<TMovie | null>(null);

const getRandomMovie = async () => {
  movie.value = await getOneMovie('random');
};

getRandomMovie();
</script>

<template>
  <main class="main">
    <TheHero v-if="movie" :movie="movie" :isCard="false" />
    <TheMoviesList />
  </main>
</template>
