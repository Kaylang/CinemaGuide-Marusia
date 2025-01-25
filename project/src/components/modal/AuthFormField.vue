<script lang="ts" setup>
import IconEmail from '@/components/icons/IconEmail.vue';
import IconUser from '@/components/icons/IconUser.vue';
import IconPassword from '@/components/icons/IconPassword.vue';

const {} = defineProps<{
  name: string;
  isShowError: boolean;
  error?: string;
}>();
</script>

<template>
  <div>
    <label :class="['form__label', { error: isShowError }]">
      <slot></slot>
      <IconEmail v-if="name === 'email'" class="form__icon" />
      <IconUser
        v-else-if="name === 'name' || name === 'surname'"
        class="form__icon"
      />
      <IconPassword
        v-else-if="name === 'password' || name === 'passwordConfirm'"
        class="form__icon"
      />
    </label>
    <Transition name="opacity">
      <div class="error" v-if="isShowError">{{ error }}</div>
    </Transition>
  </div>
</template>

<style lang="scss">
.form {
  &__label {
    position: relative;
    display: block;
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
    appearance: none;
    padding: 16px;
    padding-left: 52px;
    width: 100%;
    border: 1px solid var(--black40);
    outline: 1px solid transparent;
    border-radius: 8px;
    color: var(--black) !important;
    transition: border-color 0.3s ease-in-out;
    box-shadow: inset 0 0 0 50px var(--white);
  }

  &__input:focus,
  &__input:focus-visible {
    color: var(--black40) !important;
    border-color: var(--content-active);
    outline-color: var(--content-active);
    outline-width: 1px;
  }

  &__input:focus + svg path,
  &__input:focus-visible + svg path {
    fill: var(--content-active);
    fill-opacity: 1;
  }
}

.error {
  font-size: 14px;
  line-height: 100%;
  color: var(--content-error);
}

label.form__label.error {
  margin-bottom: 4px;
  input {
    border-color: var(--content-error);
    outline-color: var(--content-error);
  }
  svg.form__icon path {
    fill: var(--content-error);
  }
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
