import Typography from '@mui/material/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorMessage() {
  return (
    <section>
      <Typography variant="h2">Woops! Something went wrong.</Typography>
      <Link to="/">Go back to browse movies</Link>
    </section>
  )
}
