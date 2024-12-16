import { EGenres } from "@/enums/genres"
import type { TGenre } from "@/types/movie"

export const convertGenresToString = (genres: TGenre[]) => {
  return genres.reduce(
    (accum, genre, index, genArray) =>
      accum +
      (index < genArray.length - 1
        ? EGenres[genre] + ', '
        : EGenres[genre]),
    '',
  )
}
