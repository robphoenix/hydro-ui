import React from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from '../context/auth-context'
import LoginForm from './LoginForm'

const UnauthenticatedApp = () => {
  const { login } = useAuth()
  return (
    <Router>
      <Redirect from="/" to="/login" noThrow />
      <LoginForm onSubmit={login} path="/login" />
    </Router>
  )
}

export default UnauthenticatedApp
