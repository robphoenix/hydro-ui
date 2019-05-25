import React from 'react'

import { useAuth } from '../context/auth-context'
import LoginForm from './LoginForm'

const AppNotAuthenticated = () => {
  const { login } = useAuth()
  return <LoginForm onSubmit={login} />
}

export default AppNotAuthenticated
