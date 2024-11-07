import type { TGenre } from "@/types/movie";
import { EGenres } from "@/enums/genres";

// export enum EGenres {
//   'action' = 'боевик',
//   'adventure' = 'приключения',
//   'animation' = 'мультфильм',
//   'comedy' = 'комедия',
//   'crime' = 'криминал',
//   'documentary' = 'документальный',
//   'drama' = 'драма',
//   'family' = 'семейный',
//   'fantasy' = 'фэнтези',
//   'mystery' = 'мистика',
//   'romance' = 'роман',
//   'scifi' = 'фантастика',
//   'thriller' = 'триллер',
//   'war' = 'военный',
//   'western' = 'вестерн',
// }

export const getGenresFromArray = (genres: TGenre[]) => {
  return genres.reduce((accum, genre, index, genArray) => accum + (index < genArray.length - 1 ? EGenres[genre] + ', ' : EGenres[genre]), '');
}
