import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectAllMovies,
  selectHighestPopularity,
  fetchMovies,
} from './moviesSlice'
import { Spinner } from '../../components/Spinner'
import MoviesCarousel from './moviesCarousel'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import './movies.scss'

const MostPopularMovie = ({ movie }) => {
  console.log(movie, '/most pop..')
  return (
    <Grid item xs={12}>
      <Link to={`/movies/${movie.id}`}>
        <Box className="parent">
          <img
            className="image1"
            alt="img 1"
            src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          />
          <img
            className="image2"
            alt="img 2"
            src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
          />
        </Box>
      </Link>
    </Grid>
  )
}

const MovieInList = ({ movie, mostPopular }) => {
  console.log('MovieInList component log', movie, mostPopular)

  return (
    <>
      {mostPopular ? (
        <MostPopularMovie movie={movie} />
      ) : (
        <Grid item xs={4} className="movieInList" key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
              alt="Movie poster"
              className="moviePoster"
            />
          </Link>
        </Grid>
      )}
    </>
  )
}

export const MoviesList = () => {
  const dispatch = useDispatch()
  const movies = useSelector(selectAllMovies)

  const movieStatus = useSelector((state) => state.movies.status)
  const error = useSelector((state) => state.movies.error)
  const highestPopularity = useSelector(selectHighestPopularity)

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies(movies.length))
    }
  }, [movieStatus, dispatch, movies.length])

  return (
    <>
      {movieStatus === 'loading' ? <Spinner text="Loading..." /> : null}
      {movieStatus === 'failed' ? (
        <div>{console.log(error) && error}</div>
      ) : null}
      <Grid container spacing={2} className="moviesListContainer">
        {movies.map((movie) =>
          highestPopularity === movie.popularity ? (
            <MovieInList key={movie.id} movie={movie} mostPopular={true} />
          ) : (
            <MovieInList key={movie.id} movie={movie} mostPopular={false} />
          )
        )}
      </Grid>
      <button onClick={() => dispatch(fetchMovies(movies.length))}>
        Load more movies
      </button>
      <MoviesCarousel movies={movies} />
    </>
  )
}
