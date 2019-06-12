import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components/macro'

// TODO: use evergreen theming to get colour
const NavLink = (props) => {
  const { to, children } = props
  return (
    <Link
      to={to}
      css={`
        text-decoration: none;
        color: #425a70;
      `}
    >
      {children}
    </Link>
  )
}

export default NavLink
