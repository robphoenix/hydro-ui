import React, { useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from '../context/auth-context'
import MonitorsView from './MonitorsView'
import NavBar from './NavBar'
import { Pane } from 'evergreen-ui'

const AppAuthenticated = () => {
  const { initTokenRefreshInterval } = useAuth()

  useEffect(() => {
    initTokenRefreshInterval()
  }, [initTokenRefreshInterval])

  return (
    <Pane>
      <NavBar />

      <Router>
        <Redirect from="/" to="/monitors" />
        <MonitorsView path="/monitors" />
      </Router>
    </Pane>
  )
}

export default AppAuthenticated
