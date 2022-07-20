import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { MovieProps } from '../../types/movieTypes'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const MostPopularMovie = (props: { movie: MovieProps }) => {
  const movie = props.movie

  return (
    <Grid item xs={12}>
      <Box className="mostPopMovContainer">
        <LazyLoadImage
          className="mostPopMovSecondaryPoster"
          alt="Secondary movie poster"
          effect="blur"
          loading="lazy"
          src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
        />
        <Link to={`/movies/${movie.id}`} className="mostPopMovLink ">
          {' '}
          <Box sx={{ boxShadow: 3 }}>
            <img
              className="mostPopMovPrimaryPoster homePageMoviePoster"
              alt="Primary movie poster"
              loading="lazy"
              src={`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
            />
          </Box>
        </Link>
      </Box>{' '}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Caveat', cursive",
          p: 3,
          pl: 0.3,
          color: 'var(--text-color)',
        }}
      >
        ... is currently the most popular movie! &#128192;
      </Typography>
      <Typography
        variant="h2"
        sx={{
          mb: -3,
          background: 'var(--third-color)',
          color: 'var(--text-color)',
          p: 3,
          borderRadius: '0.3rem',
          fontFamily: "'Roboto Condensed', sans-serif",
        }}
      >
        Other currently popular movies
      </Typography>
    </Grid>
  )
}

export default MostPopularMovie
