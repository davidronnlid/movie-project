import TMDBLogo from './TMDBLogo.png'

const TMDBCreditFooter = () => (
  <>
    <p>
      <i>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </i>
    </p>
    <img src={TMDBLogo} className="tmdbLogo" alt="TMDB Logo" />
  </>
)

export default TMDBCreditFooter
