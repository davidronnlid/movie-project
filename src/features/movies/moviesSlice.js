import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (movieData) => {
    const response = await fetch(
      'https://davidronnlidmovies.netlify.app/.netlify/functions/api'
    ).then((movieData) => {
      // Log what is returned from fetch call, if anything is returned
      // If data is returned from feth call. Return that
      return movieData
    })
    return await response.json()
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

        console.log(action.payload)

        // Add any fetched movies to the array
        state.movies = state.movies.concat(
          action.payload.movies[0].data.results
        )
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default moviesSlice.reducer

export const selectAllMovies = (state) => state.movies.movies[0].data.results

export const selectMovieById = (state, movieId) =>
  state.movies.find((movie) => movie.id.toString() === movieId)
