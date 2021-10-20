import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectMovieById } from './moviesSlice'

export const SingleMoviePage = ({ match }) => {
  const { movieId } = match.params

  const movie = useSelector((state) => selectMovieById(state, movieId))

  if (!movie) {
    return (
      <section>
        <h2>Movie not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="movie">
        <h2>{movie.title}</h2>
        <p>Release date: {movie.release_date}</p>
      </article>
      <Link to="/">Select another movie</Link>
    </section>
  )
}
