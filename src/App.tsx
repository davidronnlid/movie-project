import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MoviesList } from './pages/moviesList/MoviesList'
import { SingleMoviePage } from './pages/singleMoviePage/SingleMoviePage'
import ErrorMessage from './components/errorMessage'
import Footer from './components/footer'
import BackToTop from './components/topScroll'
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles'
import HideAppBar from './components/header'

import 'react-lazy-load-image-component/src/effects/blur.css'

function App() {
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HideAppBar children={<></>} /> <span id="back-to-top-anchor"></span>
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
        <BackToTop children={<></>} /> <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
