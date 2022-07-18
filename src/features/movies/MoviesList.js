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
import { Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

const MostPopularMovie = ({ movie }) => {
  console.log(movie, '/most pop..')
  return (
    <Grid item xs={12}>
      <Link to={`/movies/${movie.id}`} className="mostPopMovLink">
        <Box className="mostPopMovContainer">
          <img
            className="mostPopMovSecondaryPoster"
            alt="Secondary movie poster"
            src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          />
          <Box sx={{ boxShadow: 3 }}>
            <img
              className="mostPopMovPrimaryPoster"
              alt="Primary movie poster"
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
            />
          </Box>
        </Box>{' '}
      </Link>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Caveat', cursive",
          p: 3,
          pl: 0.3,
          color: 'var(--text-color)',
        }}
      >
        ... is currently the most popular movie! &#128192;&#128285;
      </Typography>
      <Typography
        variant="h2"
        sx={{
          mb: -3,
          background: 'var(--third-color)',
          color: 'var(--text-color)',
          p: 3,
          borderRadius: '0.3rem',
          fontFamily: "'Roboto Condensed', sans-serif",
          boxShadow: 3,
        }}
      >
        Other currently popular movies
      </Typography>
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

  const smallScreen = useMediaQuery('(min-width:600px)')

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
      <Grid container spacing={smallScreen ? 8 : 5}>
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
        sx={{
          my: 4,
          mx: 'auto',
        }}
        onClick={() => dispatch(fetchMovies(movies.length))}
      >
        Load more movies
      </Button>
    </Box>
  )
}
