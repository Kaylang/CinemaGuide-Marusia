import type { TGenre } from "@/types/movie";
import { EGenres } from "@/enums/genres";

export const getGenresFromArray = (genres: TGenre[]) => {
  return genres.reduce((accum, genre, index, genArray) => accum + (index < genArray.length - 1 ? EGenres[genre] + ', ' : EGenres[genre]), '');
}
