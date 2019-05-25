import React from 'react'

import { useAuth } from '../context/auth-context'

const AppAuthenticated = () => {
  const { displayName } = useAuth()
  return <div>Welcome! {displayName()}</div>
}

export default AppAuthenticated
