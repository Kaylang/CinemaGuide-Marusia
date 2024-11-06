export type TGenre = 'action'
  | 'adventure'
  | 'animation'
  | 'comedy'
  | 'crime'
  | 'documentary'
  | 'drama'
  | 'family'
  | 'fantasy'
  | 'history'
  | 'horror'
  | 'music'
  | 'mystery'
  | 'romance'
  | 'scifi'
  | 'stand-up'
  | 'thriller'
  | 'tv-movie'
  | 'war'
  | 'western';

export type TFavorites = string[];

export type TAttribute = number | 'random';

export type TMovie = {
  id: number,
  title: string,
  originalTitle?: string,
  genres?: TGenre[],
  keywords?: string[],
  languages: string[],
  releaseDate: string,
  releaseYear: number,
  production?: string,
  director?: string,
  backdropUrl?: string,
  trailerYoutubeId?: string,
  language?: string,
  tmdbRating?: number,
  cast?: string[],
  revenue?: string,
  posterUrl?: string,
  plot?: string,
  budget?: string,
  awardsSummary?: string,
  runtime?: number,
  trailerUrl?: string,
  countriesOfOrigin?: string[],
  searchL?: string,
  homepage?: string,
  status?: string,
  count?: number,
};

export type TParams = {
  count?: number,
  page?: number,
  title?: string,
  genre?: TGenre,
}

