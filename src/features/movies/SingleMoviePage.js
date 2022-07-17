import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ErrorMessage from '../../components/ErrorMessage'
import { selectMovieById, fetchMovies } from './moviesSlice'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom'

export const SingleMoviePage = ({ match }) => {
  const { movieId } = match.params

  const movie = useSelector((state) => selectMovieById(state, movieId))
  const error = useSelector((state) => state.movies.error)

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
        <button>Go back to browse movies</button>
      </Link>
      <div className="movie">
        <h2 style={{ textAlign: 'center' }}>{movie.title}</h2>

        <img
          src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
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
          src={`http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt="Secondary movie poster"
          className="secondaryMovieImg"
        />
      </div>
    </>
  )
}
