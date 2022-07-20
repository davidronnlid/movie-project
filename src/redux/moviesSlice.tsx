import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { MovieProps, MoviesProps } from '../types/movieTypes'

interface StateProps {
  moviesState: Array<any>
  status: string
  error: null | undefined | string
}

const initialState = {
  moviesState: [],
  status: 'idle',
  error: null,
} as StateProps

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (numberOfMoviesFetched: number) => {
    console.log(numberOfMoviesFetched)

    const response = await fetch(
      `https://davidronnlidmovies.netlify.app/.netlify/functions/api?page=${
        1 + numberOfMoviesFetched / 20
      }`
    ).then((movieData) => {
      return movieData
    })
    const moviesResponseData = await response.json()

    return moviesResponseData.data.results.sort(
      (a: MovieProps, b: MovieProps) =>
        a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0
    )

    // Sort movies by popularity (most popular first). It is supposed to already be sorted in API but it has turned out not to always have been so, leading to downstream bugs.
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<MoviesProps>) => {
          state.status = 'succeeded'

          // Add any fetched movies to movie array
          state.moviesState = state.moviesState.concat(action.payload)
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default moviesSlice.reducer

export const selectAllMovies = (state: RootState) => state.movies.moviesState

export const selectMovieById = (state: RootState, movieId: string) =>
  state.movies.moviesState.find(
    (movie: MovieProps) => movie.id.toString() === movieId
  )

export const selectHighestPopularity = (state: RootState) =>
  Math.max.apply(
    null,
    state.movies.moviesState.map((movie: MovieProps) => movie.popularity)
  )
// Returns value of popularity prop for most popular movie. Not the movie itself
