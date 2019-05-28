import React from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from '../context/auth-context'
import LoginForm from './LoginForm'

const AppNotAuthenticated = () => {
  const { login } = useAuth()
  return (
    <Router>
      <Redirect from="/" to="/login" />
      <LoginForm onSubmit={login} path="/login" />
    </Router>
  )
}

export default AppNotAuthenticated
