import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (movieData) => {
    return await fetch(
      'https://davidronnlidmovies.netlify.app/.netlify/functions/api'
    ).then((movieData) => {
      // Log what is returned from fetch call, if anything is returned
      console.log(
        '.then log',
        movieData.body.json(),
        movieData.results.json(),
        movieData.json().body,
        movieData.json().results
      )
      // If data is returned from feth call. Return that
      return movieData
    })
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
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log(
          'succeeded',
          'state:',
          state,
          'state.movies',
          state.movies,
          'state.movies.movies:',
          state.movies.movies
        )
        // Add any fetched movies to the array
        state.movies = state.movies.concat(action.payload)
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default moviesSlice.reducer

export const selectAllMovies = (state) => state.movies
// .movies

export const selectMovieById = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id.toString() === movieId)
