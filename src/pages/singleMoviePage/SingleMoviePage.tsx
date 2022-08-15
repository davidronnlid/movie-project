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
  const movieStatus = useAppSelector((state) => state.movies.status)
  const error = useAppSelector((state) => state.movies.error)
  const moviesState = useAppSelector(selectAllMovies)

  const smallScreen = useMediaQuery('(max-width:600px)')

  const dispatch = useAppDispatch()

  const pageOfThisMovieInAPI = 0
  // pageOfThisMovieInAPI should ideally be in the components state since it can in theory vary, but it wasn't considered important enough to implement this and the  dependencies that would be needed for it. Considering the goals of this project, this suboptimal solution was consciously left in.

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
              variant="h2"
              sx={{
                color: 'var(--text-color)',
                fontFamily: "'Roboto condensed', sans-serif",
                my: '2vw',
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
              <strong>Language:</strong> {movie.original_language.toUpperCase()}
              <br /> <strong>Release date:</strong> {movie.release_date} <br />
              <strong>Number of ratings:</strong> {movie.vote_count}
              <br /> <strong>Average rating:</strong> {movie.vote_average} / 10
            </Typography>
            <Typography
              variant="body1"
              sx={{ px: 2, pl: smallScreen ? '1rem' : 0, my: 3 }}
            >
              <strong>Overview:</strong> {movie.overview}
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
          color: 'var(--text-color)',
          paddingLeft: '10vw',
          py: 3,
        }}
      >
        Other popular movies:
      </Typography>{' '}
      <Suspense fallback={<Spinner />}>
        <MoviesCarousel movies={moviesState} />
      </Suspense>
    </>
  )
}
