import { useUserStore } from "@/stores/user";
import type { TUser } from "@/types/user";

export const autorizationUser = async (userData: TUser) => {
  const user = useUserStore();
  user.setEmail(userData.email);
  if (userData.name) user.setName(userData.name);
  if (userData.surname) user.setSurname(userData.surname);
  if (userData.favorites) user.setFavorites(userData.favorites);
  user.setIsAuthorized(true);
}
