import * as React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import '../../src/components/menus.css'
import '../components/buttons.css'

export default function BasicMenu(props) {
  const [opened, setOpened] = useState(false)

  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (opened && ref.current && !ref.current.contains(e.target)) {
        setOpened(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [opened])

  return (
    <div ref={ref} className="dropdown">
      <button className="faIcon" onClick={() => setOpened(!opened)}>
        {props.menuLabel}
      </button>

      {opened ? (
        <div className="openedMenuItems">
          <Link
            className="stdButton smallScreenMenuButton"
            to={props.buttonOneUrl}
          >
            {props.buttonOneText}
          </Link>
          <Link
            className="stdButton smallScreenMenuButton"
            to={props.buttonTwoUrl}
          >
            {props.buttonTwoText}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
