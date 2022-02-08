import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { selectAllMovies, fetchMovies } from './moviesSlice'
import { Spinner } from '../../components/Spinner'
import MoviesCarousel from './moviesCarousel'

import './movies.css'
import '../../components/buttons.css'

const MovieInList = ({ movie }) => {
  console.log('Received data in MovieInList-var', movie)
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
      <br />
      <div>
        {' '}
        <b>{movie.title}</b>
      </div>
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
    // console.log(movies.data.results.map((movie) => movie.title))
    console.log('1', content, 'supposed movie data:', movies.data.results)
    content = movies.data.results.map((movie) => (
      <>
        <MovieInList key={movie.id} movie={movie} />
      </>
    ))

    console.log('2', content)

    movCar = <MoviesCarousel movies={movies.data.results} />
  } else if (movieStatus === 'failed') {
    content = <div>{console.log(error) && error}</div>
  }

  return (
    <section>
      <h2>Movies</h2>
      <button onClick={() => toggleshowMovCar()} className="stdButton">
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
