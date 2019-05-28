import React, { useEffect } from 'react'
import { Router } from '@reach/router'

import { useAuth } from '../context/auth-context'
import MonitorsView from './MonitorsView'

const AppAuthenticated = () => {
  const { initTokenRefreshInterval } = useAuth()

  useEffect(() => {
    initTokenRefreshInterval()
  }, [initTokenRefreshInterval])

  return (
    <Router>
      <MonitorsView path="/monitors" />
    </Router>
  )
}

export default AppAuthenticated
