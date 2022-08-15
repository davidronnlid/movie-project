import Link from '@mui/material/Link'
import TMDB from '../images/tmdb.png'
import './footer.scss'
import { Typography } from '@mui/material'
import TooltipLink from './tooltipLink'

export default function SimpleBottomNavigation() {
  return (
    <footer>
      <Typography
        variant="body2"
        sx={{ color: 'var(--text-color)', mx: '10vw', my: '4vw' }}
      >
        Made with 💚 by{' '}
        <Link
          href="https://davidronnlidportfolio.netlify.app/"
          style={{
            color: 'var(--text-color)',
            textDecoration: 'underline',
          }}
        >
          <strong>David Rönnlid</strong>
        </Link>
      </Typography>

      <TooltipLink
        icon={<img alt="TMDB logo" src={TMDB} className="footerIcon" />}
        title="This product uses the TMDB API but is not endorsed or certified by TMDB."
        link="https://developers.themoviedb.org/3/getting-started/introduction"
      />
    </footer>
  )
}
