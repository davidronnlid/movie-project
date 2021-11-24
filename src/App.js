import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './Navbar'
import { MoviesList } from './features/movies/MoviesList'
import { SingleMoviePage } from './features/movies/SingleMoviePage'
import { About } from './features/about/About'
import ErrorMessage from './components/ErrorMessage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App" style={{ paddingBottom: '5vw' }}>
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
          <Route exact path="/about" component={About} />

          <Route path="/404" component={ErrorMessage} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
