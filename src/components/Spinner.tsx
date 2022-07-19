import { Typography } from '@mui/material'
import React from 'react'
import './Spinner.scss'

const Spinner = ({ text = '', size = '5em' }) => {
  const header = text ? <Typography variant="h4" color="var(--text-color)" >{text}</Typography> : null
  return (
    <div className="spinner">
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  )
}

export default Spinner;
