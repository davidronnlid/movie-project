import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'
import useWindowSize from '../../components/windowSize'
import Flickity from 'react-flickity-component'

const flickityOptions = {
  initialIndex: 1,
  pageDots: false,
  freeScroll: true,
  contain: true,
  fullscreen: true,
  prevNextButtons: false,
}

export default function MoviesCarousel(movies) {
  console.log("received this data in MoviesCarousel component", movies)
  return (
    <>
      {useWindowSize().width < 768 ? (
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
                src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                alt="Primary movie poster"
              />
            </Link>
          ))}
        </Flickity>
      ) : (
        <Carousel
          animation={'fade'}
          timeout={200}
          interval={4000}
          stopAutoPlayOnHover={true}
          navButtonsAlwaysVisible={true}
          swipe={true}
          className={'largeScreenCarousel'}
        >
          {movies.movies.map((movie, idx) =>  (<Item key={idx} movie={movie} />))}
        </Carousel>
      )}
    </>
  )
}

function Item(movie) {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{movie.title}</h2>
      <Link to={`/movies/${movie.id}`} className="movieBoxShadow">
        <img
          src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt="Movie poster"
          className="moviePoster movieBoxShadow"
        />
      </Link>{' '}
      <p style={{ marginTop: '50px', textAlign: 'center' }}>
        <b>No. of ratings:</b> {movie.vote_count} <b>Average rating:</b>{' '}
        {movie.vote_average}
      </p>
    </>
  )
}
