<script lang="ts" setup>
import ModalAuthForm from './ModalAuthForm.vue';
import ModalInfo from './ModalInfo.vue';
import TheButton from './TheButton.vue';
import { ref, watch } from 'vue';
import { formFields } from '@/singltons/formFields';
import { isLogin } from '@/singltons/isLogin';
import { isFormValid } from '@/singltons/isFormValid';
import { loginUser, registerUser } from '@/api/user';
import { getUser } from '@/utils/getUser';
import type { TUser } from '@/types/user';
import type { TInfoBtnText, TInfoTitle, TModalType } from '@/types/modalInfo';
import type {
  TFormButtonText,
  TFormField,
  TFormTitle,
  TSubmitButtonText,
} from '@/types/form';

const props = defineProps({
  isModalOpen: {
    type: Boolean,
  },
  type: {
    type: String,
  },
});
const emit = defineEmits(['update:isModalOpen']);

const formTitle = ref<TFormTitle>('');
const submitButtonText = ref<TSubmitButtonText>('Войти');
const formButtonText = ref<TFormButtonText>('Регистрация');

const changeAuthFormType = (isLogin: boolean) => {
  if (isLogin) {
    formTitle.value = '';
    submitButtonText.value = 'Войти';
    formButtonText.value = 'Регистрация';
  } else {
    formTitle.value = 'Регистрация';
    submitButtonText.value = 'Создать аккаунт';
    formButtonText.value = 'У меня есть пароль';
  }
};

const modalType = ref<TModalType>('info');
const isAuthFormOpen = ref<boolean>(false);
const isModalInfoOpen = ref<boolean>(false);
const infoTitle = ref<TInfoTitle>('Регистрация завершена');
const infoDescription = ref<string>(
  'Используйте вашу электронную почту для входа',
);
const infoBtnText = ref<TInfoBtnText>('Войти');

const changeModalInfoData = (errorText: string | undefined) => {
  if (modalType.value === 'auth-error') {
    infoTitle.value = 'Ошибка авторизации пользователя';
  } else if (modalType.value === 'reg-error') {
    infoTitle.value = 'Ошибка регистрации пользователя';
  }
  infoDescription.value = errorText
    ? errorText
    : 'Произошла непредвиденная ошибка!<br>Попробуйте ещё раз';
  infoBtnText.value = 'Повторить';
  isAuthFormOpen.value = false;
  isModalInfoOpen.value = true;
};

const closeModal = () => {
  isLogin.value = true;
  emit('update:isModalOpen', false);
};

if (props.type === 'autorization') isAuthFormOpen.value = true;

const submitAuthForm = async (fields: TFormField[]) => {
  const data: TUser = {
    email: '',
    password: '',
  };

  for (const field of fields) {
    if (field.name !== 'passwordConfirm') data[field.name] = field.value;
    field.isTouched = false;
    field.isValid = false;
    isFormValid.value = false;
  }

  if (isLogin.value) {
    const response = await loginUser(data);
    if (response?.status) {
      getUser();
      closeModal();
    } else {
      modalType.value = 'auth-error';
      changeModalInfoData(response?.error);
    }
  } else {
    const response = await registerUser(data);
    if (response?.status) {
      if (modalType.value !== 'info') {
        infoTitle.value = 'Регистрация завершена';
        infoDescription.value = 'Используйте вашу электронную почту для входа';
        infoBtnText.value = 'Войти';
      }
      isLogin.value = true;
      changeAuthFormType(isLogin.value);

      isAuthFormOpen.value = false;
      isModalInfoOpen.value = true;
    } else {
      modalType.value = 'reg-error';
      changeModalInfoData(response?.error);
    }
  }
};

const closeModalInfo = () => {
  isModalInfoOpen.value = false;
  if (modalType.value.includes('error')) {
    if (modalType.value === 'reg-error') {
      changeAuthFormType(isLogin.value);
    }
  }
  isAuthFormOpen.value = true;
};

const closeAuthModal = (event: Event) => {
  const el = event.target as HTMLElement;
  if (!el.closest('div.auth') && !el.closest('div.info')) {
    closeModal();
  }
};

const onCloseClick = () => {
  isAuthFormOpen.value = true;
  closeModal();
};

watch(
  props,
  () => {
    if (props.isModalOpen) {
      document.body.style.overflow = 'hidden';
      changeAuthFormType(isLogin.value);
    } else {
      document.body.removeAttribute('style');
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<template>
  <Transition name="fade">
    <div v-if="isModalOpen" @click="closeAuthModal">
      <div v-show="isModalOpen" :class="['overlay', { active: isModalOpen }]">
        <div class="overlay__wrapper" v-if="isModalOpen">
          <TheButton
            :btn-classes="'btn-close btn-close-auth'"
            :btn-type="'button'"
            @click="onCloseClick"
          ></TheButton>
          <ModalAuthForm
            v-if="isAuthFormOpen"
            :formFields="
              isLogin
                ? formFields
                    .filter(item => item.isLogin)
                    .map(item => {
                      return { ...item, value: '' };
                    })
                : formFields.map(item => {
                    return { ...item, value: '' };
                  })
            "
            :title="formTitle"
            :submitText="submitButtonText"
            :changeAuthText="formButtonText"
            @update:is-login="changeAuthFormType"
            @submit:submit-form="submitAuthForm"
          />
          <ModalInfo
            v-if="isModalInfoOpen"
            :type="modalType"
            :title="infoTitle"
            :description="infoDescription"
            :btn-text="infoBtnText"
            @update:close-modal-info="closeModalInfo"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
