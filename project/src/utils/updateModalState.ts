import { isModalOpen } from "@/singltons/IsModalOpen";

export const updateModalStatus = (value: boolean) => {
  isModalOpen.value = value;
};
