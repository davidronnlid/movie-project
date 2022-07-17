import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MoviesList } from './features/movies/MoviesList'
import { SingleMoviePage } from './features/movies/SingleMoviePage'
import ErrorMessage from './components/ErrorMessage'

function App() {
  return (
    <Router>
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
          <Route path="*" component={ErrorMessage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
