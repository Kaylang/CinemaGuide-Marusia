import { SERVER_API } from "./constants";
import type { TMovie, TAttribute, TGenre, TParams } from "@/types/movie";

const MOVIES_API = SERVER_API + '/movie';

export const getMovies = async (params?: TParams | undefined): Promise<TMovie[] | null> => {
  try {
    let queryString = '';
    if (typeof params !== 'undefined') {
      queryString = '?'
      const paramsArray = Object.entries(params)
      for (const [key, value] of paramsArray) {
        queryString = queryString.endsWith('?') ? queryString + `${key}=${value}` : queryString + `&${key}=${value}`;
      }
    }
    const response = await fetch(`${MOVIES_API}/${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.status === 200) return await response.json();

    throw new Error('Ошибка: Не удалось загрузить список фильмов');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getTopTenMovies = async (): Promise<TMovie[] | null> => {
  try {
    const response = await fetch(`${MOVIES_API}/top10`);

    if (response.status === 200) return await response.json();

    throw new Error('Ошибка: Не удалось загрузить список фильмов');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getOneMovie = async (attribute: TAttribute): Promise<TMovie | null> => {
  try {
    const response = await fetch(`${MOVIES_API}/${attribute}`);

    if (response.status === 200) return await response.json();

    throw new Error('Ошибка: Не удалось загрузить фильм');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getGenres = async (): Promise<TGenre[] | null> => {
  try {
    const response = await fetch(`${MOVIES_API}/genres`);
    if (response.status === 200) return await response.json();

    throw new Error('Ошибка: Не удалось загрузить жанры');
  } catch (error) {
    console.error(error);
    return null;
  }
}
