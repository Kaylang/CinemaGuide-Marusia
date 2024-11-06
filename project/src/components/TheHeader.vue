<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import IconSearch from './icons/IconSearch.vue';
import IconLogoWhite from './icons/IconLogoWhite.vue';
const isAutorized = false;
const userName = 'User';
</script>

<template>
  <header class="header">
    <div class="header__wrapper flex">
      <router-link class="header__link" to="home">
        <IconLogoWhite />
      </router-link>

      <nav class="header__menu flex">
        <RouterLink class="menu__link" to="/">Главная</RouterLink>
        <RouterLink class="menu__link" to="/genres">Жанры</RouterLink>
      </nav>
      <div class="header__search search flex">
        <button class="search__button">
          <IconSearch />
        </button>
        <input class="search__input" type="text" placeholder="Поиск" />
      </div>
      <button class="header__login" v-if="!isAutorized">Войти</button>
      <button class="header__login" v-else>{{ userName }}</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 32px 80px;
  width: 100%;
  // background-color: var(--black50);

  &__wrapper {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
  }

  &__link {
    margin: 0;
    margin-right: 80px;
    display: block;
    flex-shrink: 0;
  }

  &__logo {
    width: 240px;
    height: 32px;
    display: block;
  }

  &__login {
    font-family: 'Play';
    font-size: 24px;
    line-height: 32px;
    color: var(--white);
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}

nav {
  margin: 0;
  margin-right: 40px;
  column-gap: 40px;
  font-family: 'Play';
  font-size: 24px;
  line-height: 32px;

  a {
    display: inline-block;
    color: var(--white);
    border-bottom: 1.5px solid transparent;
    transition: 0.4s border-bottom-color ease-in-out;

    &.router-link-exact-active {
      border-bottom-color: var(--pink);
    }
  }
}

.search {
  margin-right: auto;
  padding: 12px 16px;
  width: 559px;
  border-radius: 8px;
  background-color: var(--background-secondary);

  &__button,
  &__input {
    border: none;
    outline: none;
    background-color: inherit;
  }

  &__button {
    margin-right: 12px;
  }

  &__input {
    width: 100%;
    font-size: 18px;
    line-height: 24px;
    color: var(--white50);
  }

  &__input:focus-visible,
  &__input:focus {
    border: none;
    outline: none;
  }
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
