import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllMovies, fetchMovies } from './moviesSlice'
import { Spinner } from '../../components/Spinner'

const MovieExcerpt = ({ movie }) => {
  return (
    <article className="movie-excerpt" key={movie.id}>
      <h3>{movie.title}</h3>
      <h5>{movie.vote_average}</h5>
      <h5>{movie.runtime}</h5>
      <img
        src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
        alt="Movie poster"
      />
      <br />
      <Link to={`/movies/${movie.id}`} className="button muted-button">
        View more details
      </Link>
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
    // Sort movies in reverse chronological order by datetime string
    // const orderedmovies = movies
    //   .slice()
    //   .sort((a, b) => b.vote_average > a.vote_average)

    content = movies.map((movie) => (
      <MovieExcerpt key={movie.id} movie={movie} />
    ))
  } else if (movieStatus === 'failed') {
    content = <div>{console.log(error) && error}</div>
  }

  return (
    <section className="movies-list">
      <h2>Movies</h2>
      {content}
    </section>
  )
}
