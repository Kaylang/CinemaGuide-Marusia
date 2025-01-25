import { EGenres } from "@/enums/genres"
import type { TGenre, TGenreForSpan } from "@/types/movie"

export const convertGenres = (genres: TGenre[]): Array<TGenreForSpan> => {
  return genres.map(
    (genre, index, genArray) => {
      return index < genArray.length - 1
        ? { id: index, genre: EGenres[genre] + ', ' }
        : { id: index, genre: `${EGenres[genre]}` }
    }
  )
}
