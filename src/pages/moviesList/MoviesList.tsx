import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import { Link } from 'react-router-dom'
import {
  selectAllMovies,
  selectHighestPopularity,
  fetchMovies,
} from '../../redux/moviesSlice'
import Spinner from '../../components/Spinner'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import '../movies.scss'
import { Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MovieProps } from '../../types/movieTypes'

const MostPopularMovie = (props: { movie: MovieProps }) => {
  const movie = props.movie

  return (
    <Grid item xs={12}>
      <Box className="mostPopMovContainer">
        <LazyLoadImage
          className="mostPopMovSecondaryPoster"
          alt="Secondary movie poster"
          effect="blur"
          loading="lazy"
          src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
        />
        <Link to={`/movies/${movie.id}`} className="mostPopMovLink ">
          {' '}
          <Box sx={{ boxShadow: 3 }}>
            <img
              className="mostPopMovPrimaryPoster homePageMoviePoster"
              alt="Primary movie poster"
              loading="lazy"
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
            />
          </Box>
        </Link>
      </Box>{' '}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Caveat', cursive",
          p: 3,
          pl: 0.3,
          color: 'var(--text-color)',
        }}
      >
        ... is currently the most popular movie! &#128192;
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
        }}
      >
        Other currently popular movies
      </Typography>
    </Grid>
  )
}

const MovieInList = (props: { movie: MovieProps; mostPopular: boolean }) => {
  const movie = props.movie
  const mostPopular = props.mostPopular

  return (
    <>
      {mostPopular ? (
        <MostPopularMovie movie={movie} />
      ) : (
        <Grid item xs={6} md={4} className="movieInList" key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <LazyLoadImage
              effect="blur"
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
              alt="Movie poster"
              loading="lazy"
              className="moviePoster homePageMoviePoster"
            />
          </Link>
        </Grid>
      )}
    </>
  )
}

export const MoviesList = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectAllMovies)

  const movieStatus = useAppSelector((state) => state.movies.status)
  const error = useAppSelector((state) => state.movies.error)
  const highestPopularity = useAppSelector(selectHighestPopularity)

  const smallScreen = useMediaQuery('(min-width:600px)')

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies(movies.length))
    }
  }, [movieStatus, dispatch, movies.length])

  return (
    <Box className="movieListContainer">
      {movieStatus === 'loading' ? <Spinner /> : null}
      {movieStatus === 'failed' ? <div>{error}</div> : null}
      <Grid container spacing={smallScreen ? 8 : 5}>
        {movies.map((movie: MovieProps) =>
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
