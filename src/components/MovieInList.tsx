import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import { MovieProps } from '../types/movieTypes'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const MovieInList = (props: { movie: MovieProps }) => {
  const movie = props.movie
  return (
    <Grid item xs={6} md={4} className="movieInList" key={movie.id}>
      <Link to={`/movies/${movie.id}`}>
        <LazyLoadImage
          effect="blur"
          src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
          alt="Movie poster"
          loading="lazy"
          className="moviePoster homePageMoviePoster"
        />
      </Link>
    </Grid>
  )
}

export default MovieInList
