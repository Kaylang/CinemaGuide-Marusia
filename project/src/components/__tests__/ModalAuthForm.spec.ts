/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from 'vitest';
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

  it('Корректно отображает форму авторизации, а именно: начальные поля и тексты на кнопках и не отображает заголовок', async () => {
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

  it('Корректно устанавливается начальное состояние disabled кнопки отправки формы и корректно удаляется', async () => {
    expect(wrapper.findComponent({ name: 'TheButton' }).attributes('disabled')).not.toBeUndefined();
    (wrapper.vm as any).isFormValid = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'TheButton' }).attributes('disabled')).toBeUndefined();
    (wrapper.vm as any).isFormValid = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'TheButton' }).attributes('disabled')).not.toBeUndefined();
  });

  it('Корректно вызывает emit на отправку формы', () => {
    const form = wrapper.find('form.auth__form');
    expect(form.exists()).toEqual(true);

    form.trigger('submit.prevent');
    expect(wrapper.emitted()).toHaveProperty('submit:submitForm');
    expect(wrapper.emitted()['submit:submitForm']).toHaveLength(1);
    expect(wrapper.emitted('submit:submitForm')).toEqual([[fields.value]]);
  });

  it('Корректно устнавливает признак isTouched для полей ввода и вызывает функцию валидации при событии focusout', async () => {
    const inputs = wrapper.findAll('input');
    const validateFormSpy = vi.spyOn((wrapper.vm as any), 'validateForm');
    for (const input of inputs) {
      expect((wrapper.vm as any).fields.find((item: any) => item.name === input.attributes('name')).isTouched).toBe(false);
      await input.trigger('focusout');
      expect((wrapper.vm as any).fields.find((item: any) => item.name === input.attributes('name')).isTouched).toBe(true);
      expect(validateFormSpy).toHaveBeenCalled();
    }
  });

  it('Корректно вызывает функцию валидации при событии input', async () => {
    const inputs = wrapper.findAll('input');
    const validateFormSpy = vi.spyOn((wrapper.vm as any), 'validateForm');
    for (const input of inputs) {
      await input.trigger('input');
      expect(validateFormSpy).toHaveBeenCalled();
    }
  });

  it('Корректно отображает начальное количество полей ввода и изменяет их при переключении на регистрацию', async () => {
    expect((wrapper.vm as any).fields.length).toEqual(2);
    await wrapper.setProps({ isLogin: false });
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).fields.length).toEqual(5);
    await wrapper.setProps({ isLogin: true });
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).fields.length).toEqual(2);
  })
});
