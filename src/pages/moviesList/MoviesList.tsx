import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
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
import useMediaQuery from '@mui/material/useMediaQuery'
import { MovieProps } from '../../types/movieTypes'
import MovieInList from '../../components/MovieInList'
import MostPopularMovie from './MostPopularMovie'
import Typography from '@mui/material/Typography'

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
            // This conditional should only return true for the single most popular movie. Which entails other contents that should be presented only once in spatial proximity to the most popular movie in the layout can very well be rendered here.

            <>
              <Grid item xs={12}>
                <MostPopularMovie movie={movie} />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'var(--text-color)',
                    borderRadius: '0.3rem',
                    mt: 2,
                    fontFamily: "'Roboto condensed', sans-serif",
                  }}
                >
                  Other currently popular movies
                </Typography>
              </Grid>
            </>
          ) : (
            <MovieInList key={movie.id} movie={movie} />
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
