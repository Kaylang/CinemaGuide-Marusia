import { SERVER_API } from "./constants";
import type { TFavorites, TMovie } from "@/types/movie";

const FAVORITES_API = SERVER_API + '/favorites';

export const getFavorites = async (): Promise<TMovie[] | null> => {
  try {
    const response = await fetch(FAVORITES_API);
    return await response.json();
  } catch (error) {
    let message = '';
    if (error instanceof Error) {
      message = `Ошибка: ${error.message}`;
    } else {
      message = `Ошибка: Не удалось загрузить список фильмов`;
    }
    console.error(message);
    return null;
  }
}

export const setFavorites = async (id: number): Promise<TFavorites | null> => {
  try {
    const response = await fetch(FAVORITES_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id.toString()),
    });

    const res = await response.json();
    if (response.status === 200) {
      return res.favorites;
    } else if (response.status === 400) {
      throw new Error(res.error);
    }

  } catch (error) {
    console.error(error);
  }
  return null;
}

export const deleteFavorites = async (id: number): Promise<TFavorites | null> => {
  try {
    const responсe = await fetch(`${FAVORITES_API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (responсe.status === 200) {
      const res = await responсe.json();
      return res.favorites;
    }
    throw new Error('Не удалось загрузить список жанров');
  } catch (error) {
    console.error(error);
    return null;
  }
}
