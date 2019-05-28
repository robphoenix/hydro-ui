import React, { useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from '../context/auth-context'
import MonitorsView from './MonitorsView'

const AppAuthenticated = () => {
  const { initTokenRefreshInterval } = useAuth()

  useEffect(() => {
    initTokenRefreshInterval()
  }, [initTokenRefreshInterval])

  return (
    <Router>
      <Redirect from="/" to="/monitors" />
      <MonitorsView path="/monitors" />
    </Router>
  )
}

export default AppAuthenticated
