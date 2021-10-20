import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { MoviesList } from './features/movies/MoviesList'
import { SingleMoviePage } from './features/movies/SingleMoviePage'
import { About } from './features/about/About'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
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

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
