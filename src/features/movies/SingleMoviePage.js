import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ErrorMessage from '../../components/ErrorMessage'
import { selectMovieById, selectAllMovies, fetchMovies } from './moviesSlice'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import MoviesCarousel from './moviesCarousel'
import { Typography } from '@mui/material'

export const SingleMoviePage = ({ match }) => {
  const { movieId } = match.params

  const movie = useSelector((state) => selectMovieById(state, movieId))
  const error = useSelector((state) => state.movies.error)
  const movies = useSelector(selectAllMovies)

  const dispatch = useDispatch()

  const movieStatus = useSelector((state) => state.movies.status)
  const pageOfThisMovieInAPI = 0

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies(pageOfThisMovieInAPI))
    }
  }, [movieStatus, dispatch])

  console.log('Movie:', movie)

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
          sx={{
            fontSize: '7vw',
            ml: 3,
            mt: 3,
            color: 'var(--second-color)',
          }}
        />
      </Link>
      <div className="movie">
        <h2 style={{ textAlign: 'center' }}>{movie.title}</h2>

        <img
          src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
          alt="Primary movie poster"
          className="moviePoster largeCenteredImage"
        />
        <p className="smallInfo">
          <b>Language:</b> {movie.original_language.toUpperCase()}
          <br /> <b>Release date:</b> {movie.release_date} <br />
          <b>No. of ratings:</b> {movie.vote_count}
          <br /> <b>Average rating:</b> {movie.vote_average} / 10
        </p>
        <p>
          <b>Overview:</b> {movie.overview}
        </p>
        <img
          src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt="Secondary movie poster"
          className="secondaryMovieImg"
        />
      </div>
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
