import { defineStore } from "pinia";
import { ref } from "vue";
import type { TFormField } from "@/types/form";

export const useAuthFormStore = defineStore('authForm', () => {
  const isLogin = ref<boolean>(true);
  const isFormValid = ref<boolean>(false);
  const formFields: TFormField[] = [
    {
      name: 'email',
      value: '',
      placeholder: 'Электронная почта',
      isLogin: true,
      isRequired: true,
      isValid: false,
      isValidatable: true,
      isTouched: false,
      regExp: /^\S+@\S+\.\S+$/,
      fieldErrors: {
        required: 'Укажите Вашу электронную почту',
        regExp: 'Некорректный формат электронной почты',
      },
    },
    {
      name: 'name',
      value: '',
      placeholder: 'Имя',
      isLogin: false,
      isRequired: true,
      isValid: false,
      isValidatable: true,
      isTouched: false,
      min: 2,
      max: 30,
      fieldErrors: {
        required: 'Укажите Ваше имя',
        min: 'Имя должно содержать не менее 2-х символов',
        max: 'Имя должно содержать не более 30-ти символов',
      },
    },
    {
      name: 'surname',
      value: '',
      placeholder: 'Фамилия',
      isLogin: false,
      isRequired: true,
      isValid: false,
      isValidatable: true,
      isTouched: false,
      min: 2,
      max: 30,
      fieldErrors: {
        required: 'Укажите Вашу фамилию',
        min: 'Фамилия должна содержать не менее 2-х символов',
        max: 'Фамилия должна содержать не более 30-ти символов',
      },
    },
    {
      name: 'password',
      value: '',
      placeholder: 'Пароль',
      isLogin: true,
      isRequired: true,
      isValid: false,
      isValidatable: true,
      isTouched: false,
      min: 3,
      max: 20,
      fieldErrors: {
        required: 'Введите пароль',
        min: 'Пароль должен быть не короче 3-х символов',
        max: 'Пароль должен быть не длиннее 20-ти символов',
      },
    },
    {
      name: 'passwordConfirm',
      value: '',
      placeholder: 'Подтвердите пароль',
      isLogin: false,
      isRequired: true,
      isValid: false,
      isValidatable: true,
      isTouched: false,
      equal: 'password',
      fieldErrors: {
        required: 'Поле обязательно для заполнения',
        equal: 'Пароли не совпадают',
      },
    },
  ];

  const getLoginState = () => {
    return isLogin.value;
  }

  const setLoginState = (value: boolean) => {
    isLogin.value = value;
  }

  const getIsFormValid = () => {
    return isFormValid.value;
  }

  const setIsFormValid = (value: boolean) => {
    isFormValid.value = value;
  }

  const getFormFields = (): TFormField[] => {
    if (isLogin.value)
      return formFields.filter(item => item.isLogin)
        .map(item => {
          return { ...item, value: '' };
        });
    return formFields.map(item => {
      return { ...item, value: '' };
    });
  };

  const validateForm = (fields: TFormField[]) => {
    for (const field of fields) {
      if (field.isValidatable) {
        let isRequiredValid = true;
        let isMinValid = true;
        let isMaxValid = true;
        let isRegExpValid = true;
        let isEqualValid = true;

        if (field.isRequired) {
          if (field.value.trim().length === 0) {
            field.error = field.fieldErrors?.required;
            isRequiredValid = false;
            continue;
          } else {
            isRequiredValid = true;
          }
        }

        if (field.regExp) {
          if (!field.regExp.test(field.value.trim())) {
            field.error = field.fieldErrors?.regExp;
            isRegExpValid = false;
          } else {
            isRegExpValid = true;
          }
        }

        if (field.min) {
          if (field.value.trim().length < field.min) {
            field.error = field.fieldErrors?.min;
            isMinValid = false;
          } else {
            isMinValid = true;
          }
        }

        if (field.max) {
          if (field.value.trim().length > field.max) {
            field.error = field.fieldErrors?.max;
            isMaxValid = false;
          } else {
            isMaxValid = true;
          }
        }

        if (field.equal) {
          const fieldEqualValue = fields.find(item => item.name === field.equal);
          if (fieldEqualValue && fieldEqualValue.value === field.value) {
            isEqualValid = true;
          } else {
            isEqualValid = false;
            field.error = field.fieldErrors?.equal;
          }
        }

        if (isRequiredValid && isMinValid && isMaxValid && isRegExpValid && isEqualValid) {
          field.isValid = true;
        } else {
          field.isValid = false;
        }
      }
    }
    setIsFormValid(fields.find(item => !item.isValid) ? false : true);
  }

  return {
    isLogin,
    isFormValid,
    formFields,
    getLoginState,
    setLoginState,
    getIsFormValid,
    setIsFormValid,
    getFormFields,
    validateForm,
  }
})
