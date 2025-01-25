import { SERVER_API } from "./constants";
import type { TMovie } from "@/types/movie";

const FAVORITES_API = SERVER_API + '/favorites';

export const getFavorites = async (): Promise<TMovie[] | []> => {
  try {
    const response = await fetch(FAVORITES_API, {
      credentials: 'include',
    });
    if (response.status === 200) {
      return await response.json();
    }
  } catch (error) {
    let message = '';
    if (error instanceof Error) {
      message = `Ошибка: ${error.message}`;
    } else {
      message = `Ошибка: Не удалось загрузить список фильмов`;
    }
    console.error(message);
  }
  return [];
}

export const addToFavorites = async (movieId: number | string): Promise<boolean> => {
  const id = typeof movieId !== 'string' ? movieId.toString() : movieId;
  try {
    const response = await fetch(FAVORITES_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id }),
    });

    if (response.status === 200) {
      const res = await response.json();
      if (res.result) {
        return true;
      } else {
        throw new Error('Ошибка добавления фильма в избранные');
      }
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

export const removeFromFavorites = async (id: number | string): Promise<boolean> => {
  try {
    const responсe = await fetch(`${FAVORITES_API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (responсe.status === 200) {
      const res = await responсe.json();
      if (res.result === true) {
        return true;
      } else {
        throw new Error('Ошибка удаления фильма из избранных');
      }
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}
