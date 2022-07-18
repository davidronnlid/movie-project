import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectAllMovies,
  selectHighestPopularity,
  fetchMovies,
} from './moviesSlice'
import { Spinner } from '../../components/Spinner'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import './movies.scss'

const MostPopularMovie = ({ movie }) => {
  console.log(movie, '/most pop..')
  return (
    <Grid item xs={12}>
      <Link to={`/movies/${movie.id}`}>
        <Box className="mostPopMovieContainer">
          <img
            className="mostPopMovieSecondaryPoster"
            alt="Secondary movie poster"
            src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          />
          <Box sx={{ boxShadow: 3 }}>
            <img
              className="mostPopMoviePrimaryPoster"
              alt="Primary movie poster"
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
            />
          </Box>
        </Box>
        {/* <Box className="mostPopMovieTitle">
          MOST POPULAR:
          <br />
          {movie.title}
        </Box> */}
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
        <Grid item xs={6} md={4} className="movieInList" key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <Box
              component={'img'}
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
              alt="Movie poster"
              className="moviePoster"
              boxShadow={5}
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
    <Box className="movieListContainer">
      {movieStatus === 'loading' ? <Spinner text="Loading..." /> : null}
      {movieStatus === 'failed' ? (
        <div>{console.log(error) && error}</div>
      ) : null}
      <Grid container spacing={6}>
        {movies.map((movie) =>
          highestPopularity === movie.popularity ? (
            <MovieInList key={movie.id} movie={movie} mostPopular={true} />
          ) : (
            <MovieInList key={movie.id} movie={movie} mostPopular={false} />
          )
        )}
      </Grid>
      <Button
        variant="contained"
        sx={{ my: 4 }}
        onClick={() => dispatch(fetchMovies(movies.length))}
      >
        Load more movies
      </Button>
    </Box>
  )
}
