<script lang="ts" setup>
import { getOneMovie } from '@/api/movies';
import TheHero from '@/components/TheHero.vue';
import type { TMovie } from '@/types/movie';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const movie = ref<TMovie | null>(null);

const loadMovie = async () => {
  const id = route.params.id as string;
  const responce = await getOneMovie(parseInt(id));
  movie.value = responce;
};

loadMovie();
</script>

<template>
  <main class="main">
    <TheHero v-if="movie" :movie="movie" :isCard="true" />
    <section class="descr">
      <h2 class="descr__title">О фильме</h2>
      <ul class="descr__list flex">
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Язык оригинала</div>
            <div class="descr__wrap"></div>
          </div>
          <div class="descr__value">
            {{ movie?.language ? movie.language : 'Не указан' }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Бюджет</div>
            <div class="descr__wrap"></div>
          </div>
          <div class="descr__value">
            {{
              movie?.budget
                ? new Intl.NumberFormat('ru-RU').format(
                    parseInt(movie.budget),
                  ) + ' руб.'
                : 'Не указан'
            }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Выручка</div>
            <div class="descr__wrap"></div>
          </div>
          <div class="descr__value">
            {{
              movie?.revenue
                ? new Intl.NumberFormat('ru-RU').format(
                    parseInt(movie.revenue),
                  ) + ' руб.'
                : 'Не указана'
            }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Режиссер</div>
            <div class="descr__wrap"></div>
          </div>
          <div class="descr__value">
            {{ movie?.director ? movie.director : 'Не указан' }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Продакшен</div>
            <div class="descr__wrap"></div>
          </div>
          <div class="descr__value">
            {{ movie?.production ? movie.production : 'Не указано' }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Награды</div>
            <div class="descr__wrap"></div>
          </div>
          <div class="descr__value">
            {{ movie?.awardsSummary ? movie.awardsSummary : 'Не указаны' }}
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;

  .descr {
    padding: 40px 80px 120px;
    &__title {
      margin-bottom: 64px;
      font-size: 40px;
      font-weight: 700;
      line-height: 48px;
    }

    &__list {
      padding: 0;
      padding-left: 0;
      flex-direction: column;
      row-gap: 24px;
      list-style: none;
    }

    &__item {
      justify-content: flex-start;
      column-gap: 6px;
    }

    &__left {
      width: 40%;
    }

    &__parameter,
    &__value {
      flex-shrink: 0;
    }

    &__wrap {
      width: 100%;
      border-bottom: 1px dotted var(--white);
    }
  }
}
</style>
