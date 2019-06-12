import React from 'react'
import { Link } from 'evergreen-ui'
import { Link as RouterLink } from '@reach/router'

const NavLink = (props) => {
  const { to, children } = props
  return (
    <Link is={RouterLink} to={to} textDecoration="none" color="neutral">
      {children}
    </Link>
  )
}

export default NavLink
