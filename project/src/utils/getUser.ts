import { getUserProfile } from "@/api/user";
import { autorizationUser } from "./authorizationUser";

export const getUser = async () => {
  const res = await getUserProfile();
  if (res.data) {
    await autorizationUser(res.data);
    return true;
  }
  return false;
}
