import React, { useEffect, lazy, Suspense } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import ErrorMessage from '../../components/errorMessage'
import {
  selectMovieById,
  selectAllMovies,
  fetchMovies,
} from '../../redux/moviesSlice'
import Spinner from '../../components/Spinner'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const MoviesCarousel = lazy(() => import('../../components/moviesCarousel'))

export const SingleMoviePage = (props: { match: any }) => {
  const { movieId } = props.match.params

  const movie = useAppSelector((state) => selectMovieById(state, movieId))
  const error = useAppSelector((state) => state.movies.error)
  const movies = useAppSelector(selectAllMovies)

  const smallScreen = useMediaQuery('(max-width:600px)')

  const dispatch = useAppDispatch()

  const movieStatus = useAppSelector((state) => state.movies.status)
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
      <Box className="singleMovBoxContainer">
        <Grid container spacing={2} className="singleMovGridContainer">
          <Grid item sm={12} sx={{ width: '100%' }}>
            <Typography
              variant="h3"
              sx={{
                background: 'var(--second-color)',
                color: 'var(--third-color)',
                fontFamily: "'Roboto Condensed', sans-serif",
                borderTopLeftRadius: '0.5rem',
                borderTopRightRadius: '0.5rem',
                p: 2,
                boxShadow: 3,
              }}
            >
              {movie.title}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <LazyLoadImage
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
              alt="Primary movie poster"
              className="primaryMovPoster"
              effect="blur"
            />
          </Grid>
          <Grid item sm={6}>
            <Typography
              variant="body1"
              sx={{ px: 2, pl: smallScreen ? '1rem' : 0 }}
            >
              <b>Language:</b> {movie.original_language.toUpperCase()}
              <br /> <b>Release date:</b> {movie.release_date} <br />
              <b>No. of ratings:</b> {movie.vote_count}
              <br /> <b>Average rating:</b> {movie.vote_average} / 10
            </Typography>
            <Typography
              variant="body1"
              sx={{ px: 2, pl: smallScreen ? '1rem' : 0, my: 3 }}
            >
              <b>Overview:</b> {movie.overview}
            </Typography>
            <LazyLoadImage
              src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
              alt="Secondary movie poster"
              className="secondaryMovPoster"
              effect="blur"
            />
          </Grid>
        </Grid>
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: 'var(--third-color)',
          background: 'var(--second-color)',
          paddingLeft: '10vw',
          py: 3,
          boxShadow: '0px -4px 3px rgb(50 50 50 / 75%)',
        }}
      >
        Other popular movies:
      </Typography>{' '}
      <Suspense fallback={<Spinner />}>
        <MoviesCarousel movies={movies} />
      </Suspense>
    </>
  )
}
