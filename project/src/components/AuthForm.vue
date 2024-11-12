<script lang="ts" setup>
import { ref, watch } from 'vue';
import IconEmail from './icons/IconEmail.vue';
import IconUser from './icons/IconUser.vue';
import IconPassword from './icons/IconPassword.vue';
import AppModal from './AppModal.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:isOpen']);

const isLogin = ref<boolean>(true);
const submitText = ref<'Войти' | 'Создать аккаунт'>('Войти');
const buttonText = ref<'Регистрация' | 'У меня есть пароль'>('Регистрация');

const authUser = () => {};

const changeAuthType = () => {
  isLogin.value = !isLogin.value;
  if (isLogin.value) {
    submitText.value = 'Войти';
    buttonText.value = 'Регистрация';
  } else {
    submitText.value = 'Создать аккаунт';
    buttonText.value = 'У меня есть пароль';
  }
};

watch(
  props,
  () => {
    if (!props.isOpen) {
      isLogin.value = false;
      changeAuthType();
      document.body.removeAttribute('style');
    } else {
      document.body.style.overflow = 'hidden';
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <app-modal
    :model-value="isOpen"
    @update:model-value="emit('update:isOpen', $event)"
  >
    <div class="auth flex">
      <img
        class="auth__logo"
        src="/images/logo-black.png"
        alt="Логотип с чёрными буквами на прозрачном фоне"
      />
      <div class="auth__wrapper flex">
        <h2 v-if="!isLogin" class="auth__title">Регистрация</h2>
        <form
          class="auth__form form flex"
          action="#"
          @submit.prevent="authUser"
        >
          <label class="form__label">
            <IconEmail class="form__icon" />
            <input
              type="email"
              name="email"
              class="form__input"
              placeholder="Электронная почта"
            />
          </label>
          <label v-if="!isLogin" class="form__label">
            <IconUser class="form__icon" />
            <input
              type="text"
              name="userName"
              class="form__input"
              placeholder="Имя"
            />
          </label>
          <label v-if="!isLogin" class="form__label">
            <IconUser class="form__icon" />
            <input
              type="text"
              name="surname"
              class="form__input"
              placeholder="Фамилия"
            />
          </label>
          <label class="form__label">
            <IconPassword class="form__icon" />
            <input
              type="password"
              name="password"
              class="form__input"
              placeholder="Пароль"
            />
          </label>
          <label v-if="!isLogin" class="form__label">
            <IconPassword class="form__icon" />
            <input
              type="password"
              name="confirmPassword"
              class="form__input"
              placeholder="Подтвердите пароль"
            />
          </label>
        </form>
        <button class="btn-primary form__submit" type="submit">
          {{ submitText }}
        </button>
        <button
          class="btn-white form__button"
          type="button"
          @click="changeAuthType"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </app-modal>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .auth {
    position: relative;
    padding: 64px 40px;
    width: 420px;
    flex-direction: column;
    align-items: center;
    row-gap: 40px;
    border-radius: 24px;
    background-color: var(--white);
    color: var(--black);

    &__wrapper {
      width: 100%;
      flex-direction: column;
      align-items: inherit;
      row-gap: 24px;
    }

    &__logo {
      margin-bottom: 40px;
      width: 132px;
      display: block;
    }

    &__form {
      width: 100%;
      flex-direction: column;
      row-gap: 12px;
    }
  }

  .form {
    &__label {
      position: relative;
      width: 100%;

      &__icon path {
        transition: fill 0.3s ease-in-out;
      }
    }

    &__icon {
      position: absolute;
      top: 50%;
      left: 16px;
      display: block;
      transform: translateY(-50%);
    }

    &__input {
      padding: 16px;
      padding-left: 52px;
      color: var(--black40);
      border: 1px solid var(--black40);
      border-radius: 8px;
      width: 100%;
      transition: border-color 0.3s ease-in-out;
    }

    &__submit {
      padding: 16px 48px;
      width: 100%;
    }
  }
}

label.error {
  input {
    border-color: var(--content-error);
  }
  svg path {
    fill: var(--content-error);
  }
}
</style>
