import React from 'react'
import useWindowSize from './components/windowSize'
import BasicMenu from '../src/components/menuDropdown'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav style={{ justifyContent: 'space-between' }}>
      {useWindowSize().width < 768 ? (
        <>
          <Link to="/">
            <h1>DRM</h1>
          </Link>
          <BasicMenu
            menuLabel={<i className="fa fa-bars faIcon" />}
            buttonOneText={'Browse movies'}
            buttonTwoText={'About'}
            buttonOneUrl={'/'}
            buttonTwoUrl={'/about'}
          />
        </>
      ) : (
        <>
          <Link to="/">
            <h1>David Rönnlid Movies</h1>
          </Link>
          <div>
            <Link to="/">Browse movies</Link>
            <Link to="/about">About</Link>
          </div>
        </>
      )}
    </nav>
  )
}
