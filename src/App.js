import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MoviesList } from './features/movies/MoviesList'
import { SingleMoviePage } from './features/movies/SingleMoviePage'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/footer'
import BackToTop from './components/topScroll'

function App() {
  return (
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
  )
}

export default App
