import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthFormField from '../modal/AuthFormField.vue';

describe('AuthFromFieldVue', () => {
  let wrapper: ReturnType<typeof mount>;

  it('Отображает label и элемент в slot', () => {
    wrapper = mount(AuthFormField, {
      propsData: {
        name: '',
        isShowError: false,
        error: ''
      },
      slots: {
        default: '<div id="slot">Элемент, вставленный в слот</div>'
      }
    });
    expect(wrapper.find('label.form__label').exists()).toEqual(true);
    expect(wrapper.find('div#slot').exists()).toEqual(true);
    expect(wrapper.find('div#slot').text()).toEqual('Элемент, вставленный в слот');
    expect(wrapper.find('div.error').exists()).toEqual(false);
  });

  it('Отображает ошибку', () => {
    wrapper = mount(AuthFormField, {
      propsData: {
        name: '',
        isShowError: true,
        error: 'Ошибка!'
      }
    });
    expect(wrapper.find('div.error').exists()).toEqual(true);
    expect(wrapper.find('div.error').text()).toEqual('Ошибка!');
  });

  it('Корретно отображает икноку для поля email', () => {
    wrapper = mount(AuthFormField, {
      propsData: {
        name: 'email',
        isShowError: false,
        error: ''
      }
    });
    expect(wrapper.find('svg.icon-email').exists()).toEqual(true);
  });

  it('Корретно отображает икноку для поля name', () => {
    wrapper = mount(AuthFormField, {
      propsData: {
        name: 'name',
        isShowError: false,
        error: ''
      }
    });
    expect(wrapper.find('svg.icon-user').exists()).toEqual(true);
  });

  it('Корретно отображает икноку для поля surname', () => {
    wrapper = mount(AuthFormField, {
      propsData: {
        name: 'surname',
        isShowError: false,
        error: ''
      }
    });
    expect(wrapper.find('svg.icon-user').exists()).toEqual(true);
  });

  it('Корретно отображает икноку для поля password', () => {
    wrapper = mount(AuthFormField, {
      propsData: {
        name: 'password',
        isShowError: false,
        error: ''
      }
    });
    expect(wrapper.find('svg.icon-password').exists()).toEqual(true);
  });

  it('Корретно отображает икноку для поля passwordConfirm', () => {
    wrapper = mount(AuthFormField, {
      propsData: {
        name: 'passwordConfirm',
        isShowError: false,
        error: ''
      }
    });
    expect(wrapper.find('svg.icon-password').exists()).toEqual(true);
  });
})
