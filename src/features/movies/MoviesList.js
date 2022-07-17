import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { selectAllMovies, fetchMovies } from './moviesSlice'
import { Spinner } from '../../components/Spinner'
import MoviesCarousel from './moviesCarousel'

import './movies.css'

const MovieInList = ({ movie }) => {
  console.log('MovieInList component log', movie)

  return (
    <div className="movieInList" key={movie.id}>
      <Link to={`/movies/${movie.id}`}>
        {' '}
        <img
          src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt="Movie poster"
          className="moviePoster"
          style={{ width: '100%' }}
        />
      </Link>
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
      dispatch(fetchMovies(movies.length))
    }
  }, [movieStatus, dispatch, movies.length])

  let content, movCar

  content = movies.map((movie) => <MovieInList key={movie.id} movie={movie} />)

  movCar = <MoviesCarousel movies={movies} />

  if (movieStatus === 'failed') {
    content = <div>{console.log(error) && error}</div>
  }

  return (
    <section>
      <button onClick={() => toggleshowMovCar()}>
        Toggle carousel / list view
      </button>
      {movieStatus === 'loading' ? <Spinner text="Loading..." /> : null}

      {showMovCar ? <div className="grid">{content}</div> : movCar}
      <button onClick={() => dispatch(fetchMovies(movies.length))}>
        Load more movies
      </button>
    </section>
  )
}
