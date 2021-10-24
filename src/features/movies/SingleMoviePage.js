import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectMovieById } from './moviesSlice'

export const SingleMoviePage = ({ match }) => {
  const { movieId } = match.params

  const movie = useSelector((state) => selectMovieById(state, movieId))

  const styledBackToHomePageButton = {
    padding: '10px',
    margin: '100px 100px 0 0',
    border: '1px solid black',
    borderRadius: '6px',
  }

  if (!movie) {
    return (
      <section>
        <h2>Movie not found!</h2>
        <Link to="/" style={styledBackToHomePageButton}>
          Go back to browse movies
        </Link>
      </section>
    )
  }

  return (
    <section>
      <article className="movie">
        <h2 style={{ textAlign: 'center' }}>{movie.title}</h2>

        <img
          src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt="Primary movie poster"
          className="movie-poster"
          id="single-movie-page-poster"
        />
        <p className="small-info">
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
      </article>
    </section>
  )
}
