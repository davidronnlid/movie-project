import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ErrorMessage from '../../components/ErrorMessage'
import { selectMovieById, selectAllMovies, fetchMovies } from './moviesSlice'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import MoviesCarousel from './moviesCarousel'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'

export const SingleMoviePage = ({ match }) => {
  const { movieId } = match.params

  const movie = useSelector((state) => selectMovieById(state, movieId))
  const error = useSelector((state) => state.movies.error)
  const movies = useSelector(selectAllMovies)

  const smallScreen = useMediaQuery('(max-width:600px)')
  const mediumScreen = useMediaQuery('(max-width:800px)')

  const dispatch = useDispatch()

  const movieStatus = useSelector((state) => state.movies.status)
  const pageOfThisMovieInAPI = 0

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies(pageOfThisMovieInAPI))
    }
  }, [movieStatus, dispatch])

  if (!movie || movieStatus === 'loading') {
    return <Spinner />
  }

  if (movieStatus === 'failed') {
    console.log(
      'Single Movie Page log of movie var',
      movie,
      'and related error message:',
      error
    )

    return <ErrorMessage />
  }

  return (
    <>
      <Link to="/">
        <HomeIcon
          className="homeIcon"
          sx={{ fontSize: smallScreen ? '8vw' : '5vw' }}
        />
      </Link>
      <Box
        className="singleMovieContainer"
        sx={{
          borderBottomLeftRadius: smallScreen ? '1rem' : 0,
          borderBottomRightRadius: smallScreen ? '1rem' : 0,
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          boxShadow: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Typography
              variant="h3"
              sx={{
                background: 'var(--second-color)',
                color: 'var(--third-color)',
                fontFamily: "'Roboto Condensed', sans-serif",
                p: 2,
              }}
            >
              {movie.title}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <img
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
              alt="Primary movie poster"
              className="primaryMovPoster"
              style={{
                borderBottomLeftRadius: smallScreen ? '1rem' : 0,
                borderBottomRightRadius: smallScreen ? '1rem' : 0,
              }}
            />
          </Grid>
          <Grid item sm={6}>
            <Typography
              variant="body1"
              sx={{ p: 2, pl: smallScreen ? '1rem' : 0 }}
            >
              <b>Language:</b> {movie.original_language.toUpperCase()}
              <br /> <b>Release date:</b> {movie.release_date} <br />
              <b>No. of ratings:</b> {movie.vote_count}
              <br /> <b>Average rating:</b> {movie.vote_average} / 10
            </Typography>
            <Typography
              variant="body1"
              sx={{ p: 2, pl: smallScreen ? '1rem' : 0 }}
            >
              <b>Overview:</b> {movie.overview}
            </Typography>
            <img
              src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
              alt="Secondary movie poster"
              className="secondaryMovieImg"
              style={{
                borderBottomLeftRadius: smallScreen ? '1rem' : 0,
                borderBottomRightRadius: smallScreen ? '1rem' : 0,
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Typography
        variant="h4"
        sx={{ color: 'var(--text-color)', my: 4, ml: '10vw' }}
      >
        Other popular movies:
      </Typography>
      <MoviesCarousel movies={movies} />
    </>
  )
}
