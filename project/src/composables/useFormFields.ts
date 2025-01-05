import type { TFormField } from "@/types/form";

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

export const useFormFields = (isLogin: boolean): TFormField[] => {

  return isLogin ? formFields.filter(item => item.isLogin)
    .map(item => {
      return { ...item, value: '' };
    }) : formFields.map(item => {
      return { ...item, value: '' };
    });
};
