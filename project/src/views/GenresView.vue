<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { EGenres } from '@/enums/genres';
import { getGenres } from '@/api/movies';
import type { TGenre, TGenreCard, TGenreRu } from '@/types/movie';

const genres = ref<TGenre[] | null>([]);
const genresCards = ref<TGenreCard[]>([]);
const count = ref<number>(0);

const getGenresList = async () => {
  genres.value = await getGenres();
  if (genres.value)
    genresCards.value = genres.value.map((genre: TGenre) => {
      count.value++;
      const posterUrl = `./images/${genre}.jpg`;
      const genreRU = EGenres[genre] as TGenreRu;
      return {
        genre,
        genreRU,
        posterUrl,
        id: count.value,
      };
    });
};

onMounted(() => {
  getGenresList();
});
</script>

<template>
  <main class="main">
    <section class="genres" v-if="genres">
      <h2 class="genres__title section-title">Жанры фильмов</h2>
      <div class="genres__cards cards flex">
        <div
          class="cards__card flex"
          v-for="genre in genresCards"
          :key="genre.id"
        >
          <router-link
            class="cards__link flex"
            :to="{ name: 'filmsOfGenre', params: { genre: genre.genre } }"
          >
            <img
              class="cards__poster"
              :src="genre.posterUrl"
              :alt="genre.genreRU"
            />
            <div class="cards__descr flex">
              {{ genre.genreRU }}
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.genres {
  margin: 0 auto;
  padding: 16px 20px 40px;
  width: 100%;
}

.cards {
  flex-wrap: wrap;
  row-gap: 24px;
  column-gap: 12px;
  align-items: center;
  justify-content: center;

  &__card {
    width: 290px;
    height: 304px;
    border-radius: 24px;
    overflow: hidden;
  }

  &__link {
    width: 100%;
    height: 100%;
    flex-direction: column;
    box-shadow: 0px 0px 80px var(--white33);
  }

  &__descr {
    height: 84px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background-color: var(--black);
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: var(--content-primary);
    text-transform: capitalize;
  }

  &__poster {
    width: 100%;
    height: 100%;
    max-height: 220px;
    object-fit: cover;
  }
}

@media (min-width: 1024px) {
  .genres {
    padding: 0;
    padding-top: 32px;
  }
  .cards {
    row-gap: 64px;
    column-gap: 40px;
  }
}
</style>
