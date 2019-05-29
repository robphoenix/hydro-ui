import React from 'react'
import { Router, Redirect } from '@reach/router'

import Login from '../pages/Login'

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Redirect from="/" to="/login" noThrow />
      <Login path="/login" />
    </Router>
  )
}

export default UnauthenticatedApp
