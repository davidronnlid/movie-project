import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectMovieById } from './moviesSlice'

import '../../components/buttons.css'

export const SingleMoviePage = ({ match }) => {
  const { movieId } = match.params

  const movie = useSelector((state) => selectMovieById(state, movieId))

  if (!movie) {
    return (
      <section>
        <h2>Movie not found!</h2>
        <Link to="/" className="stdButton">
          Go back to browse movies
        </Link>
      </section>
    )
  }

  return (
    <>
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
