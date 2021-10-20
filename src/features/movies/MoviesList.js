import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllMovies, fetchMovies } from './moviesSlice'
import { Spinner } from '../../components/Spinner'

const MovieExcerpt = ({ movie }) => {
  return (
    <article className="movie-excerpt" key={movie.id}>
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt="Movie poster"
          className="movieExcerptImg"
        />
      </Link>
      <br />
      <b>{movie.title}</b>
    </article>
  )
}

export const MoviesList = () => {
  const dispatch = useDispatch()
  const movies = useSelector(selectAllMovies)

  const movieStatus = useSelector((state) => state.movies.status)
  const error = useSelector((state) => state.movies.error)

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies())
    }
  }, [movieStatus, dispatch])

  let content

  if (movieStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (movieStatus === 'succeeded') {
    content = movies.map((movie) => (
      <MovieExcerpt key={movie.id} movie={movie} />
    ))
  } else if (movieStatus === 'failed') {
    content = <div>{console.log(error) && error}</div>
  }

  return (
    <section className="movies-list">
      <h2>Movies</h2>
      <span>
        <i>Click on a poster to see movie details.</i>
      </span>
      <br />
      <br />

      <div className="grid">{content}</div>
    </section>
  )
}
