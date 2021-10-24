import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function MoviesCarousel(movies) {
  return (
    <Carousel
      animation={'fade'}
      timeout={200}
      interval={4000}
      stopAutoPlayOnHover={true}
      navButtonsAlwaysVisible={true}
      swipe={true}
    >
      {movies.movies.map((movie, idx) => (
        <Item key={idx} movie={movie} />
      ))}
    </Carousel>
  )
}

function Item(movie) {
  return (
    <Paper style={{ padding: '20px', height: '500px' }}>
      <h2 style={{ textAlign: 'center' }}>{movie.movie.title}</h2>
      <Link to={`/movies/${movie.movie.id}`} className="movieBoxShadow">
        <img
          src={`http://image.tmdb.org/t/p/w185/${movie.movie.poster_path}`}
          alt="Movie poster"
          className="moviePoster movieBoxShadow"
          style={{ maxWidth: '200px' }}
        />
      </Link>{' '}
      <p style={{ marginTop: '50px', textAlign: 'center' }}>
        <b>No. of ratings:</b> {movie.movie.vote_count} <b>Average rating:</b>{' '}
        {movie.movie.vote_average}
      </p>
    </Paper>
  )
}
