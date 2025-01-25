import { defineStore } from "pinia";
import { ref } from "vue";

export const useTrailerStore = defineStore('trailer', () => {
  const movieTrailerId = ref<string>();
  const movieTitle = ref<string>();

  const getMovieTrailerId = () => {
    return movieTrailerId.value;
  }

  const setMovieTrailerId = (value: string) => {
    movieTrailerId.value = value;
  }

  const getMovieTitle = () => {
    return movieTitle.value;
  }

  const setMovieTitle = (value: string) => {
    movieTitle.value = value;
  }

  return {
    movieTrailerId,
    movieTitle,
    getMovieTrailerId,
    setMovieTrailerId,
    getMovieTitle,
    setMovieTitle,
  }
})
