import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MoviesList } from './pages/moviesList/MoviesList'
import { SingleMoviePage } from './pages/singleMoviePage/SingleMoviePage'
import ErrorMessage from './components/errorMessage'
import Footer from './components/footer'
import BackToTop from './components/topScroll'
import FontTheme from './components/fontTheme'
import HideAppBar from './components/header'

import 'react-lazy-load-image-component/src/effects/blur.css'

function App() {
  return (
    <FontTheme>
      <span id="back-to-top-anchor"></span>
      <Router>
        <HideAppBar children={<></>} />
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
        <BackToTop children={<></>} />
      </Router>
      <Footer />
    </FontTheme>
  )
}

export default App
