import { getUserProfile } from "@/api/user";
import { authorizationUser } from "./authorizationUser";

export const getUser = async () => {
  const res = await getUserProfile();
  if (res.data) {
    await authorizationUser(res.data);
    return true;
  }
  return false;
}
