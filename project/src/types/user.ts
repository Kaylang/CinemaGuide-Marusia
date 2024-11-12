import type { TFavorites } from "./movie";

export type TUser = {
  name: string;
  email: string;
  surname?: string;
  password?: string;
  favorites?: TFavorites;
}
