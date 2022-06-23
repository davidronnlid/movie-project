import React from 'react'
import { useSelector } from 'react-redux'
import ErrorMessage from '../../components/ErrorMessage'
import { selectMovieById } from './moviesSlice'

import '../../components/buttons.css'

export const SingleMoviePage = ({ match }) => {
  const { movieId } = match.params

  const movie = useSelector((state) => selectMovieById(state, movieId))

  if (!movie || !movie.title) {
    console.log("SMP !movie log of movie var", movie, movie.title)
    return <ErrorMessage />
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
