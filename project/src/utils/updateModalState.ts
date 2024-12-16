import { isModalOpen } from "@/singltons/isModalOpen";

export const updateModalState = (value: boolean) => {
  isModalOpen.value = value;
};
