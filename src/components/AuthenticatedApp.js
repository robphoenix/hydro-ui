import React, { useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from '../context/auth-context'
import ViewMonitors from '../pages/ViewMonitors'
import NavBar from './NavBar'
import { Pane } from 'evergreen-ui'
import { MonitorProvider } from '../context/monitor-context'

const AuthenticatedApp = () => {
  const { initTokenRefreshInterval } = useAuth()

  useEffect(() => {
    initTokenRefreshInterval()
  }, [initTokenRefreshInterval])

  return (
    <Pane>
      <NavBar />

      <MonitorProvider>
        <Router>
          <Redirect from="/" to="/monitors" noThrow />
          <ViewMonitors path="/monitors" />
        </Router>
      </MonitorProvider>
    </Pane>
  )
}

export default AuthenticatedApp
