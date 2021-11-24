import React from 'react'
import { useState } from 'react'
import useWindowSize from './components/windowSize'
import BasicMenu from '../src/components/menuDropdown'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>David Rönnlid Movies</h1>
      </Link>

      <div>
        {useWindowSize().width < 768 ? (
          <BasicMenu
            menuLabel={<i class="fa fa-bars faIcon" />}
            buttonOneText={'Browse movies'}
            buttonTwoText={'About'}
            buttonOneUrl={'/'}
            buttonTwoUrl={'/about'}
          />
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
