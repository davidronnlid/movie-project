import React from 'react'
import { useState } from 'react'
import useWindowSize from './components/windowSize'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  const [smallOrLargeScreen, setScreenBool] = useState(window.innerWidth)

  return (
    <nav>
      <h1>David Rönnlid Movies</h1>

      <div>
        {useWindowSize().width < 768 ? (
          <i class="fa fa-bars" />
        ) : (
          <>
            <Link to="/">Browse movies</Link>
            <Link to="/about">About</Link>
          </>
        )}
      </div>
    </nav>
  )
}
