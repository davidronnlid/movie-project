import React from 'react'
import { Link } from 'react-router-dom'
import Flickity from 'react-flickity-component'
import { MoviesProps } from "../types/movieTypes"

const flickityOptions = {
  initialIndex: 1,
  pageDots: false,
  freeScroll: true,
  contain: true,
  fullscreen: true,
  prevNextButtons: false,
}


export default function MoviesCarousel(movies: MoviesProps) {
  return (
    <Flickity
      elementType={'div'} // default 'div'
      className={'flickityCarousel'}
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      {movies.movies.map((movie) => (
        <Link to={`/movies/${movie.id}`}>
          <img
            src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
            alt="Primary movie poster"
          />
        </Link>
      ))}
    </Flickity>
  )
}
