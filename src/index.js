import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
