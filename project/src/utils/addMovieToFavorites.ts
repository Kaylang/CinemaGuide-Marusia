import { addToFavorites } from "@/api/favorites";
import { useUserStore } from "@/stores/user";

export const addMovieToFavorites = async (movieId: number | string) => {
  const userStore = useUserStore();
  const id = typeof movieId === 'string' ? movieId : movieId.toString();
  const res = await addToFavorites(id);
  if (res) userStore.addFavorite(id);
}
