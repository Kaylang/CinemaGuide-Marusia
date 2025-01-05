<script lang="ts" setup>
import AuthFormField from '@/components/modal/AuthFormField.vue';
import TheButton from '@/components/ui-components/TheButton.vue';
import { ref, watch } from 'vue';
import { useFormFields } from '@/composables/useFormFields';
import { useValidateForm } from '@/composables/useValidateForm';
import type { TFormField } from '@/types/form';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  submitText: {
    type: String,
  },
  changeAuthText: {
    type: String,
  },
  isLogin: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:isLogin', 'submit:submitForm']);
const isFormValid = ref<boolean>(false);

const fields = ref<TFormField[]>([]);
fields.value = useFormFields(props.isLogin);

const validateForm = () => {
  isFormValid.value = useValidateForm(fields.value);
};

const onChangeAuthClick = () => {
  isFormValid.value = false;
  emit('update:isLogin', !props.isLogin);
};

watch(props, () => {
  fields.value = useFormFields(props.isLogin);
});
</script>

<template>
  <div class="auth flex">
    <img
      class="auth__logo"
      src="/images/logo-black.png"
      alt="Логотип с чёрными буквами на прозрачном фоне"
    />
    <div class="auth__wrapper flex">
      <Transition name="scale" appear>
        <h2 v-if="title" class="auth__title">{{ title }}</h2>
      </Transition>
      <form
        class="auth__form form flex"
        @submit.prevent="emit('submit:submitForm', fields)"
      >
        <fieldset class="form__fieldset flex">
          <TransitionGroup name="scale" appear>
            <template v-for="field in fields" :key="field.name">
              <AuthFormField
                :name="field.name"
                :isShowError="field.isTouched && !field.isValid"
                :error="field.error"
              >
                <input
                  class="form__input"
                  v-model.trim="field.value"
                  :type="
                    field.name === 'email'
                      ? 'email'
                      : field.name === 'password' ||
                          field.name === 'passwordConfirm'
                        ? 'password'
                        : 'text'
                  "
                  :name="field.name"
                  :placeholder="field.placeholder"
                  @focusout="
                    field.isTouched = true;
                    validateForm();
                  "
                  @input="validateForm()"
                />
              </AuthFormField>
            </template>
          </TransitionGroup>
        </fieldset>
        <TheButton
          :btnClasses="'btn-primary btn-w-100'"
          :btnType="'submit'"
          :disabled="!isFormValid"
        >
          {{ submitText }}
        </TheButton>
        <TheButton
          :btnClasses="'btn-white form__button'"
          type="button"
          @click="onChangeAuthClick"
        >
          {{ changeAuthText }}
        </TheButton>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.auth {
  position: relative;
  padding: 64px 20px;
  width: 335px;
  flex-direction: column;
  align-items: center;
  row-gap: 32px;
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
    margin-bottom: 16px;
    width: 132px;
    display: block;
  }

  &__form {
    width: 100%;
    flex-direction: column;
    row-gap: 24px;
  }
}

.form {
  &__fieldset {
    margin: 0;
    padding: 0;
    flex-direction: column;
    row-gap: 12px;
    border: none;
    transition: height 0.3s ease-in-out;
  }

  &__button {
    padding: 0;
    align-self: center;
  }
}

.form__submit:disabled {
  background-color: var(--btn-disabled);
  border-color: var(--btn-disabled);
  outline-color: transparent;
  pointer-events: none;
}

@media (min-width: 1024px) {
  .auth {
    padding: 64px 40px;
    width: 420px;
    row-gap: 40px;
  }
}

.scale-enter-active {
  transition: transform 0.5s ease-in-out;
}
.scale-leave-active {
  transition: transform 0.2s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  transform: scaleY(0);
}
</style>
