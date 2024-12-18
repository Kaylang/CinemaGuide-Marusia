import { defineStore } from "pinia";
import { ref } from "vue";
import type { TModalType } from "@/types/modal";

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref<boolean>(false);
  const modalType = ref<TModalType>();

  const getModalState = () => {
    return isModalOpen.value;
  };

  const setModalState = (value: boolean) => {
    isModalOpen.value = value;
  };

  const getModalType = () => {
    return modalType.value;
  }

  const setModalType = (value: TModalType) => {
    modalType.value = value;
  }

  return {
    isModalOpen,
    modalType,
    getModalState,
    setModalState,
    getModalType,
    setModalType,
  }
})
