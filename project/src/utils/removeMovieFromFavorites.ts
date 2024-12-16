import { removeFromFavorites } from "@/api/favorites";
import { useUserStore } from "@/stores/user";

export const removeMovieFromFavorites = async (movieId: number | string) => {
  const userStore = useUserStore();
  const id = typeof movieId === 'string' ? movieId : movieId.toString();
  const res = await removeFromFavorites(id);
  if (res) {
    userStore.deleteFavorite(id);
  }
}
