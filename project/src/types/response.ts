import type { TUser } from "./user"

export type TResponse = {
  status: boolean,
  data?: TUser,
  error?: string,
}
