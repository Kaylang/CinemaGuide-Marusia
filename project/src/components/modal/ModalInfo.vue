<script lang="ts" setup>
import TheButton from '@/components/ui-components/TheButton.vue';

const emit = defineEmits(['update:closeModalInfo']);

const { title, description, btnText } = defineProps({
  title: {
    type: String,
    default: 'Регистрация завершена',
  },
  description: {
    type: String,
    default: 'Используйте вашу электронную почту для входа',
  },
  btnText: {
    type: String,
    default: 'Войти',
  },
});
</script>

<template>
  <div class="info flex">
    <img
      class="info__logo"
      src="/images/logo-black.png"
      alt="Логотип с чёрными буквами на прозрачном фоне"
    />
    <h2 class="info__title">{{ title }}</h2>
    <p class="info__description">{{ description }}</p>
    <TheButton
      @click="emit('update:closeModalInfo')"
      :btn-classes="'btn-primary btn-info-close btn-w-100'"
    >
      {{ btnText }}
    </TheButton>
  </div>
</template>

<style lang="scss">
@media (min-width: 1024px) {
  .info {
    padding: 64px 40px;
    width: 420px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 40px;
    border-radius: 24px;
    background-color: var(--white);

    &__logo {
      width: 132px;
      display: block;
    }

    &__title {
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      color: var(--black);
    }

    &__description {
      text-align: center;
      white-space: pre-line;
      color: var(--black);
    }
  }
}
</style>
