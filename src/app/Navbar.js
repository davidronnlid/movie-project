import React from 'react'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>David Rönnlid Movies</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Browse movies</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
