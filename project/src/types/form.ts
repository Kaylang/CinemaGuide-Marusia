export type TFormField = {
  name: 'email' | 'name' | 'surname' | 'password' | 'passwordConfirm',
  value: string,
  placeholder?: string,
  isRequired: boolean,
  isLogin: boolean,
  isValid: boolean,
  isValidatable: boolean,
  isTouched: boolean,
  equal?: string,
  min?: number,
  max?: number,
  regExp?: RegExp,
  error?: string,
  fieldErrors?: TFormErrors,
}

type TFormErrors = {
  equal?: string,
  min?: string,
  max?: string,
  regExp?: string,
  required?: string,
}

export type TFormTitle = '' | 'Регистрация';
export type TSubmitButtonText = 'Войти' | 'Создать аккаунт';
export type TFormButtonText = 'Регистрация' | 'У меня есть пароль';
