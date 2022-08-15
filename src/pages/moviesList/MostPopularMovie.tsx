import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { MovieProps } from '../../types/movieTypes'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const MostPopularMovie = (props: { movie: MovieProps }) => {
  const movie = props.movie
  const theme = useTheme()
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Box className="mostPopMovContainer">
        <div className="mostPopMovSecondaryPosterOverlay">
          <img
            className="mostPopMovSecondaryPoster"
            alt="Secondary movie poster"
            loading="lazy"
            src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          />
        </div>
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
        <Box className="mostPopMovDescriptionInfo">
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Roboto condensed', sans-serif",
              fontWeight: '500',

              pb: 0,
              mb: 1,
              pl: 0.3,
              color: 'var(--text-color)',
            }}
          >
            <span className="mostPopMovTitle">{movie.title}</span> is currently
            the most popular movie! &#128192;
          </Typography>

          {mediumScreen ? (
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Roboto condensed', sans-serif",
                pl: 0.3,
                color: 'var(--text-color)',
              }}
            >
              {movie.overview}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </>
  )
}

export default MostPopularMovie
