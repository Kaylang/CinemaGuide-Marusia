<script lang="ts" setup>
import { getOneMovie } from '@/api/movies';
import TheHero from '@/components/TheHero.vue';
import { isDesktop } from '@/singltons/isDesktop';
import type { TMovie } from '@/types/movie';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const movie = ref<TMovie | null>(null);

const id = ref<string>('');

const loadMovie = async () => {
  id.value = router.currentRoute.value.params.id as string;
  const response = await getOneMovie(parseInt(id.value));
  movie.value = response;
};

watch(router.currentRoute, () => {
  loadMovie();
});

onMounted(() => {
  loadMovie();
});
</script>

<template>
  <main class="main">
    <TheHero v-if="movie" :movie="movie" :isCard="true" :key="movie.id" />
    <section class="descr">
      <h2 class="descr__title section-title">О фильме</h2>
      <ul class="descr__list list-reset flex">
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Язык оригинала</div>
            <div class="descr__wrap" v-if="isDesktop"></div>
          </div>
          <div class="descr__value descr__value-lang">
            {{
              movie?.language
                ? new Intl.DisplayNames(['ru'], { type: 'language' }).of(
                    movie.language,
                  )
                : 'Нет информации'
            }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Бюджет</div>
            <div class="descr__wrap" v-if="isDesktop"></div>
          </div>
          <div class="descr__value">
            {{
              movie?.budget
                ? new Intl.NumberFormat('ru-RU').format(
                    parseInt(movie.budget),
                  ) + ' руб.'
                : 'Нет информации'
            }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Выручка</div>
            <div class="descr__wrap" v-if="isDesktop"></div>
          </div>
          <div class="descr__value">
            {{
              movie?.revenue
                ? new Intl.NumberFormat('ru-RU').format(
                    parseInt(movie.revenue),
                  ) + ' руб.'
                : 'Нет информации'
            }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Режиссер</div>
            <div class="descr__wrap" v-if="isDesktop"></div>
          </div>
          <div class="descr__value">
            {{ movie?.director ? movie.director : 'Нет информации' }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Продакшен</div>
            <div class="descr__wrap" v-if="isDesktop"></div>
          </div>
          <div class="descr__value">
            {{ movie?.production ? movie.production : 'Нет информации' }}
          </div>
        </li>
        <li class="descr__item flex">
          <div class="descr__left flex">
            <div class="descr__parameter">Награды</div>
            <div class="descr__wrap" v-if="isDesktop"></div>
          </div>
          <div class="descr__value">
            {{ movie?.awardsSummary ? movie.awardsSummary : 'Нет информации' }}
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss">
.descr {
  padding: 32px 20px;

  &__list {
    flex-direction: column;
    row-gap: 12px;
  }

  &__item {
    flex-direction: column;
    justify-content: flex-start;
    column-gap: 6px;
  }

  &__left {
    width: 40%;
    min-width: 40%;
  }

  &__parameter {
    display: flex;
    align-items: flex-end;
    flex-shrink: 0;
  }

  &__wrap {
    width: 100%;
    border-bottom: 1px dotted var(--white);
  }

  &__value {
    font-weight: 700;
    &-lang {
      text-transform: capitalize;
    }
  }
}

.hero {
  &__description {
    &-bottom {
      flex-wrap: nowrap;
    }

    &-trailer {
      max-width: 251px;
    }
  }

  .bottom {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    column-gap: 16px;

    &-top {
      max-width: 251px;
    }
  }
}

@media (min-width: 1024px) {
  .descr {
    padding: 40px 0 0;

    &__list {
      row-gap: 24px;
    }

    &__item {
      flex-direction: row;
    }

    &__value {
      font-weight: 400;
    }
  }

  .hero {
    .bottom {
      &-top {
        width: unset;
      }
    }
  }
}
</style>
