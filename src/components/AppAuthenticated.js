import React from 'react'

import { useAuth } from '../context/auth-context'
import LoginForm from './LoginForm'

const AppAuthenticated = () => {
  const { login } = useAuth()
  return <LoginForm onSubmit={login} />
}

export default AppAuthenticated
