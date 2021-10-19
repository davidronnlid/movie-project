import React from 'react'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>David Ronnlid Movies</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Movies</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
