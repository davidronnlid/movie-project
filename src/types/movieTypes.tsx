export type MovieProps = {
  adult: Boolean
  backdrop_path: string
  genre_ids: Array<number> | number
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: Boolean
  vote_average: number
  vote_count: number
}

export type MoviesProps = {
  [index: string]: Array<MovieProps>
}
