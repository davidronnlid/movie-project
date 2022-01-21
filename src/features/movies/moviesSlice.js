import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', (movies) => {
  fetch('https://davidronnlidmovies.netlify.app/.netlify/functions/api').then(
    (response) => {
      console.log(
        '.then log',
        response.body.json(),
        response.results.json(),
        response.json().body,
        response.json().results
      )

      return [...movies, response]
    }
  )
})

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
