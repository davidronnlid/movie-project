import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
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
  const [width, setWidth] = useState(window.innerWidth)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  let isMobile
  if (width <= 768) {
    isMobile = true
  } else {
    isMobile = false
  }

  return (
    <>
      {isMobile ? (
        <Flickity
          className={'carousel'} // default ''
          elementType={'div'} // default 'div'
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
        >
          {movies.movies.map((movie, idx) => (
            <Item key={idx} movie={movie} />
          ))}
        </Carousel>
      )}
    </>
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
