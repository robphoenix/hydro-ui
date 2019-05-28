import React, { useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from '../context/auth-context'
import ViewMonitors from './ViewMonitors'
import NavBar from './NavBar'
import { Pane } from 'evergreen-ui'

const AuthenticatedApp = () => {
  const { initTokenRefreshInterval } = useAuth()

  useEffect(() => {
    initTokenRefreshInterval()
  }, [initTokenRefreshInterval])

  return (
    <Pane>
      <NavBar />

      <Router>
        <Redirect from="/" to="/monitors" noThrow />
        <ViewMonitors path="/monitors" />
      </Router>
    </Pane>
  )
}

export default AuthenticatedApp
