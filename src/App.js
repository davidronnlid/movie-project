import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MoviesList } from './features/movies/MoviesList'
import { SingleMoviePage } from './features/movies/SingleMoviePage'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/footer'
import BackToTop from './components/topScroll'
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles'

function App() {
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <span id="back-to-top-anchor"></span>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <MoviesList />
              </React.Fragment>
            )}
          />
          <Route exact path="/movies/:movieId" component={SingleMoviePage} />
          <Route path="*" component={ErrorMessage} />
        </Switch>
        <BackToTop />
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
