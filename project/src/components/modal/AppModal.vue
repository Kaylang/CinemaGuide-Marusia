<script lang="ts" setup>
import ModalAuthForm from '@/components/modal/ModalAuthForm.vue';
import ModalInfo from '@/components/modal/ModalInfo.vue';
import ModalTrailer from '@/components/modal/ModalTrailer.vue';
import TheButton from '@/components/ui-components/TheButton.vue';
import { ref, watch } from 'vue';
import { useModalStore } from '@/stores/modal';
import { loginUser, registerUser } from '@/api/user';
import { getUser } from '@/utils/getUser';
import type { TUser } from '@/types/user';
import type { TInfoBtnText, TInfoTitle, TInfoModalType } from '@/types/modal';
import type {
  TFormButtonText,
  TFormField,
  TFormTitle,
  TSubmitButtonText,
} from '@/types/form';
import { setUserLogged } from '@/utils/controlUserLS';

const props = defineProps<{
  isModalOpen: boolean;
}>();

const emit = defineEmits(['update:isModalOpen']);

const modalStore = useModalStore();

const isLogin = ref<boolean>(true);

const formTitle = ref<TFormTitle>('');
const submitButtonText = ref<TSubmitButtonText>('Войти');
const formButtonText = ref<TFormButtonText>('Регистрация');

const changeAuthFormData = (typeAuth: boolean) => {
  isLogin.value = typeAuth;
  if (typeAuth) {
    formTitle.value = '';
    submitButtonText.value = 'Войти';
    formButtonText.value = 'Регистрация';
  } else {
    formTitle.value = 'Регистрация';
    submitButtonText.value = 'Создать аккаунт';
    formButtonText.value = 'У меня есть пароль';
  }
};

const modalType = ref<TInfoModalType>('info');
const isAuthFormOpen = ref<boolean>(false);
const isModalInfoOpen = ref<boolean>(false);
const isTrailerOpen = ref<boolean>(false);

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

const submitAuthForm = async (fields: TFormField[]) => {
  const data: TUser = {
    email: '',
    password: '',
  };

  for (const field of fields) {
    if (field.name !== 'passwordConfirm') data[field.name] = field.value;
    field.isTouched = false;
    field.isValid = false;
  }

  if (isLogin.value) {
    const response = await loginUser(data);
    if (response?.status) {
      setUserLogged();
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
      changeAuthFormData(isLogin.value);

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
      changeAuthFormData(isLogin.value);
    }
  }
  isAuthFormOpen.value = true;
};

const handlerOverlayClick = (event: Event) => {
  const el = event.target as HTMLElement;
  if (
    !el.closest('div.auth') &&
    !el.closest('div.info') &&
    !el.closest('div.trailer')
  ) {
    closeModal();
  }
};

const handlerCloseBtnClick = () => {
  isAuthFormOpen.value = true;
  closeModal();
};

watch(
  props,
  () => {
    if (props.isModalOpen) {
      document.body.style.overflow = 'hidden';
      changeAuthFormData(isLogin.value);
    } else {
      document.body.removeAttribute('style');
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

watch(modalStore, () => {
  switch (modalStore.getModalType()) {
    case 'authorization': {
      isAuthFormOpen.value = true;
      break;
    }
    case 'trailer': {
      isTrailerOpen.value = true;
      break;
    }
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isModalOpen" @click="handlerOverlayClick">
      <div v-show="isModalOpen" :class="['overlay', { active: isModalOpen }]">
        <div class="overlay__wrapper" v-if="isModalOpen">
          <ModalAuthForm
            v-if="
              modalStore.getModalType() === 'authorization' && isAuthFormOpen
            "
            :title="formTitle"
            :submitText="submitButtonText"
            :changeAuthText="formButtonText"
            :isLogin="isLogin"
            @update:is-login="changeAuthFormData"
            @submit:submit-form="submitAuthForm"
          />
          <ModalInfo
            v-if="
              modalStore.getModalType() === 'authorization' && isModalInfoOpen
            "
            :title="infoTitle"
            :description="infoDescription"
            :btn-text="infoBtnText"
            @update:close-modal-info="closeModalInfo"
          />
          <ModalTrailer v-if="modalStore.getModalType() === 'trailer'" />
          <TheButton
            :btn-classes="'btn-close btn-close-auth'"
            :btn-type="'button'"
            @click="handlerCloseBtnClick"
          ></TheButton>
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
