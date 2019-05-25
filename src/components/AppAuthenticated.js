import React, { useEffect } from 'react'

import { useUser } from '../context/user-context'
import { useAuth } from '../context/auth-context'

const AppAuthenticated = () => {
  const user = useUser()
  const { initTokenRefreshInterval } = useAuth()

  useEffect(() => {
    initTokenRefreshInterval()
  }, [initTokenRefreshInterval])

  return <div>Hello {user ? user.displayName : 'World'}</div>
}

export default AppAuthenticated
