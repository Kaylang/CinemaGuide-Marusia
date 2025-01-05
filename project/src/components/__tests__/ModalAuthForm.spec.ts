import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalAuthForm from '../modal/ModalAuthForm.vue';
import { ref } from 'vue';
import { useFormFields } from '@/composables/useFormFields';
import type { TFormField } from '@/types/form';

describe('ModalAuthForm.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  const mockProps = {
    title: '',
    submitText: 'Войти',
    changeAuthText: 'Регистрация',
    isLogin: true,
  };

  const fields = ref<TFormField[]>([]);

  beforeEach(() => {
    wrapper = mount(ModalAuthForm, {
      propsData: mockProps,
    })
  });

  it('Отображает форму в окне авторизации', () => {
    expect(wrapper.find('form.auth__form').exists()).toEqual(true);
  });

  it('Корректно отображает форму авторизации, а именно: начальные поля и тексты на кнопках и не отображает заголовок', () => {
    fields.value = useFormFields(mockProps.isLogin);

    const inputs = wrapper.findAll('input.form__input');

    expect(inputs).toHaveLength(fields.value.length);
    expect(wrapper.find('input[name="email"][type="email"]').exists()).toEqual(true);
    expect(wrapper.find('input[name="password"][type="password"]').exists()).toEqual(true);
    expect(wrapper.find('input[name="name"][type="text"]').exists()).toEqual(false);
    expect(wrapper.find('input[name="surname"][type="text"]').exists()).toEqual(false);
    expect(wrapper.find('input[name="passwordConfirm"][type="password"]').exists()).toEqual(false);

    expect(wrapper.get('button[type=submit]').text()).toEqual(mockProps.submitText);
    expect(wrapper.get('button[type=button]').text()).toEqual(mockProps.changeAuthText);
    expect(wrapper.find('h2.auth__title').exists()).toEqual(false);
  });

  it('Корректно вызывает emit на изменение формы авторизации/регистрации', () => {
    const changeAuthBtn = wrapper.find('button[type=button]');
    expect(changeAuthBtn.exists()).toEqual(true);

    changeAuthBtn.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('update:isLogin');
    expect(wrapper.emitted()['update:isLogin']).toHaveLength(1);
    expect(wrapper.emitted('update:isLogin')).toEqual([[!mockProps.isLogin]]);
  });

  it.skip('Корректно устанавливается начальное состояние disabled кнопки отправки формы и корректно удаляется', () => {
    ModalAuthForm.isFormValid = false;
    const submitBtn = wrapper.find('button[type=submit]');
    expect(submitBtn.exists()).toEqual(true);
    expect(submitBtn.attributes('disabled')).toBe(true);
    ModalAuthForm.isFormValid = true;
    expect(submitBtn.attributes('disabled')).toBe(false);
    ModalAuthForm.isFormValid = false;
    expect(submitBtn.attributes('disabled')).toBe(true);
  });

  it('Корректно вызывает emit на отправку формы', () => {
    const form = wrapper.find('form.auth__form');
    expect(form.exists()).toEqual(true);

    form.trigger('submit.prevent');
    expect(wrapper.emitted()).toHaveProperty('submit:submitForm');
    expect(wrapper.emitted()['submit:submitForm']).toHaveLength(1);
    expect(wrapper.emitted('submit:submitForm')).toEqual([[fields.value]]);
  });

})
