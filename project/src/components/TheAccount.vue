<script lang="ts" setup>
import IconEmail from './icons/IconEmail.vue';
import TheButton from './TheButton.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { logoutUser } from '@/api/user';

const user = useUserStore();
const router = useRouter();

const initials =
  user.getName().slice(0, 1).toUpperCase() +
  user.getSurname().slice(0, 1).toUpperCase();

const onLogout = async () => {
  const response = await logoutUser();
  if (response.status) {
    user.clearUserData();
    router.push('/');
  }
};
</script>

<template>
  <section class="account flex">
    <ul class="list-reset account__list flex">
      <li class="account__item flex">
        <div class="account__item-icon flex">{{ initials }}</div>
        <div class="account__item-wrapper flex">
          <div class="account__item-title">Имя Фамилия</div>
          <div class="account__item-decription">
            {{ `${user.getName()} ${user.getSurname()}` }}
          </div>
        </div>
      </li>
      <li class="account__item flex">
        <div class="account__item-icon flex"><IconEmail /></div>
        <div class="account__item-wrapper flex">
          <div class="account__item-title">Электронная почта</div>
          <div class="account__item-decription">{{ user.getEmail() }}</div>
        </div>
      </li>
    </ul>
    <TheButton
      :btn-classes="'btn-primary account__btn-logout'"
      @click="onLogout"
    >
      Выйти из аккаунта
    </TheButton>
  </section>
</template>

<style lang="scss">
.account {
  padding: 0 20px;
  flex-direction: column;
  row-gap: 40px;

  &__list {
    width: 100%;
    flex-direction: column;
    row-gap: 40px;
  }
  &__item {
    width: 100%;
    align-items: center;
    column-gap: 16px;

    &-wrapper {
      flex-direction: column;
      row-gap: 4px;
    }

    &-decription,
    &-icon {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }

    &-icon {
      width: 60px;
      height: 60px;
      align-items: center;
      justify-content: center;
      border-radius: 30px;
      background-color: var(--content-disabled);
      color: var(--white);
    }

    &-icon svg path {
      fill: var(--white);
      fill-opacity: 1;
    }

    &-title {
      color: var(--content-disabled);
    }
  }
  &__btn-logout {
    padding: 16px 48px;
    max-width: 325px;
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .account {
    padding: 0;
    row-gap: 64px;

    &__item {
      &-title {
        color: var(--white);
      }
    }

    &__btn-logout {
      width: unset;
    }
  }
}
</style>
