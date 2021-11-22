import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'

import '../../src/components/menus.css'
import '../components/buttons.css'

export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.menuLabel}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link
          to={props.buttonOneUrl}
          className="stdButton smallScreenMenuButton"
        >
          <MenuItem>{props.buttonOneText}</MenuItem>
        </Link>

        <br />
        <Link
          to={props.buttonTwoUrl}
          className="stdButton smallScreenMenuButton"
        >
          {props.buttonTwoText ? (
            <MenuItem>{props.buttonTwoText}</MenuItem>
          ) : null}
        </Link>
      </Menu>
    </div>
  )
}
