import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalInfo from '../modal/ModalInfo.vue';

describe('ModalInfo.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  const mockProps = {
    title: 'Регистрация завершена',
    description: 'Используйте вашу электронную почту для входа',
    btnText: 'Войти'
  };

  beforeEach(() => {
    wrapper = mount(ModalInfo, {
      propsData: mockProps,
    })
  });

  it('Отображает модальное окно', () => {
    expect(wrapper.find('div.info').exists()).toEqual(true);
  });

  it('Корректно отображает переданный текст в заголовке', () => {
    expect(wrapper.get('h2.info__title').text()).toEqual(mockProps.title);
  });

  it('Корректно отображает переданный текст в описании', () => {
    expect(wrapper.get('p.info__description').text()).toEqual(mockProps.description);
  });

  it('Корректно отображает переданный текст на кнопке', () => {
    expect(wrapper.get('button.btn-info-close').text()).toEqual(mockProps.btnText);
  });

  it('Корректно передаёт emit закрытия окна', () => {
    expect(wrapper.find('button.btn-info-close').exists()).toEqual(true);
    const btnClose = wrapper.find('button.btn-info-close');

    btnClose.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('update:closeModalInfo');
    expect(wrapper.emitted()['update:closeModalInfo']).toHaveLength(1);
  })
})
