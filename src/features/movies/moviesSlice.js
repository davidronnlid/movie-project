import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
}

let serverURL

async const fetchAPIKey = () => {
  serverURL = await fetch('../../../netlify/functions/api.js')
  .then((response) => response.json())
  .then((json) => {
     serverUrl = json.api
  })
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?${fetchAPIKey.then(serverURL=>serverURL)}`
  )

  return response.data.results
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

export const selectAllMovies = (state) => state.movies.movies

export const selectMovieById = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id.toString() === movieId)
