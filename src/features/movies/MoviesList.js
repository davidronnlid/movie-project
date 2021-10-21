import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { selectAllMovies, fetchMovies } from './moviesSlice'
import { Spinner } from '../../components/Spinner'
import MoviesCarousel from './moviesCarousel'

const MovieExcerpt = ({ movie }) => {
  return (
    <div className="movie-excerpt" key={movie.id}>
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt="Movie poster"
          className="movieExcerptImg"
        />
      </Link>
      <br />
      <b>{movie.title}</b>
    </div>
  )
}

export const MoviesList = () => {
  const dispatch = useDispatch()
  const movies = useSelector(selectAllMovies)

  const movieStatus = useSelector((state) => state.movies.status)
  const error = useSelector((state) => state.movies.error)

  const [showMovCar, setShowMovCar] = useState(true)
  const toggleshowMovCar = () => setShowMovCar((showMovCar) => !showMovCar)

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies())
    }
  }, [movieStatus, dispatch])

  let content, movCar

  if (movieStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (movieStatus === 'succeeded') {
    console.log(movies)

    content = movies.map((movie) => (
      <MovieExcerpt key={movie.id} movie={movie} />
    ))

    movCar = <MoviesCarousel movies={movies} />
  } else if (movieStatus === 'failed') {
    content = <div>{console.log(error) && error}</div>
  }

  return (
    <section className="movies-list">
      <h2>Movies</h2>
      <button onClick={() => toggleshowMovCar()}>
        Toggle carousel / list view
      </button>
      <br />
      <span>
        <i>Click on a poster to see movie details.</i>
      </span>
      <br />
      <br />
      {showMovCar ? movCar : <div className="grid">{content}</div>}
    </section>
  )
}
