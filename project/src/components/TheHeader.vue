<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { isDesktop } from '@/singltons/isDesktop';
import TheButton from './TheButton.vue';
import IconGenres from './icons/IconGenres.vue';
import TheSearch from './TheSearch.vue';
import IconUser from './icons/IconUser.vue';
import { useModalStore } from '@/stores/modal';

const userStore = useUserStore();
const modalStore = useModalStore();
</script>

<template>
  <header class="header">
    <div class="header__wrapper flex">
      <router-link class="header__link flex" to="/">
        <picture class="header__logo">
          <source
            media="(max-width: 1024px)"
            srcset="/images/logo-white-mobile.png"
          />
          <img
            :src="'/images/logo-white.png'"
            alt="Логотип Маруся с буквами белого цвета"
          />
        </picture>
      </router-link>
      <div class="header__wrapper-right flex">
        <nav class="header__menu flex">
          <RouterLink class="menu__link flex" v-if="isDesktop" to="/">
            Главная
          </RouterLink>
          <RouterLink class="menu__link flex" v-if="isDesktop" to="/genres">
            Жанры
          </RouterLink>
          <RouterLink class="menu__link flex" v-else to="/genres"
            ><IconGenres />
          </RouterLink>
        </nav>
        <TheSearch class="header__search" />

        <TheButton
          :btn-classes="'header__login'"
          @click="modalStore.setModalState(true)"
          v-if="!userStore.isAuthorized"
        >
          <template v-if="isDesktop">Войти</template>
          <IconUser v-else />
        </TheButton>
        <RouterLink class="header__login" v-else to="/user">
          <template v-if="isDesktop">{{ userStore.getName() }}</template>
          <IconUser v-else />
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  padding: 16px 20px;
  width: 100%;

  &__logo img {
    width: 82px;
    height: 32px;
    display: block;
  }

  &__link {
    margin: 0;
    margin-right: auto;
    align-items: center;
    flex-shrink: 0;
  }

  &__wrapper {
    position: relative;
    &-right {
      align-items: center;
      column-gap: 20px;
    }
  }

  &__menu {
    margin: 0;
    align-items: center;
  }

  &__login {
    font-family: 'Play';
    font-size: 24px;
    line-height: 32px;
    border: none;
    color: var(--white);
    background-color: transparent;

    width: 24px;
    height: 24px;
  }

  &__login svg {
    width: 24px;
    height: 24px;
  }

  &__login svg path {
    fill: var(--white);
    fill-opacity: 1;
  }
}

@media (min-width: 1024px) {
  .header {
    padding: 32px 0;

    &__wrapper {
      margin: 0 auto;
      width: 100%;
      column-gap: 80px;
      align-items: center;

      &-right {
        flex-grow: 1;
        justify-content: space-between;
        column-gap: 40px;
      }
    }

    &__logo img {
      width: 143px;
    }

    &__menu {
      column-gap: 40px;
      font-family: 'Play';
      font-size: 24px;
      line-height: 32px;
    }

    &__login {
      width: max-content;
      height: unset;
    }
  }

  .header__login,
  .menu__link {
    display: inline-block;
    color: var(--white);
    border-bottom: 1.5px solid transparent;
    transition: 0.3s border-bottom-color ease-in-out;
  }

  .router-link-exact-active {
    border-bottom-color: var(--pink);
  }
}
</style>
