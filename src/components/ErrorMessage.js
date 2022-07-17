import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorMessage() {
  return (
    <section>
      <h2>Woops! Something went wrong.</h2>
      <Link to="/">Go back to browse movies</Link>
    </section>
  )
}
