import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  moviesState: [],
  status: 'idle',
  error: null,
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (numberOfMoviesFetched) => {
    console.log(numberOfMoviesFetched)

    const response = await fetch(
      `https://davidronnlidmovies.netlify.app/.netlify/functions/api?page=${
        1 + numberOfMoviesFetched / 20
      }`
    ).then((movieData) => {
      return movieData
    })
    const moviesResponseData = await response.json()
    console.log(
      'Returned from fetchMovies',
      moviesResponseData.data.results.sort((a, b) =>
        a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0
      )
    )
    return moviesResponseData.data.results.sort((a, b) =>
      a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0
    )
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

        // Add any fetched movies to the array
        state.moviesState = state.moviesState.concat(action.payload)
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default moviesSlice.reducer

export const selectAllMovies = (state) => state.movies.moviesState

export const selectMovieById = (state, movieId) =>
  state.movies.moviesState.find((movie) => movie.id.toString() === movieId)

export const selectHighestPopularity = (state) =>
  Math.max.apply(
    null,
    state.movies.moviesState.map((movie) => movie.popularity)
  )
