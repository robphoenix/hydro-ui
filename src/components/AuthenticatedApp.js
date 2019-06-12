import React, { useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from '../context/auth-context'
import ViewMonitors from '../pages/ViewMonitors'
import NavBar from './NavBar'
import { Pane } from 'evergreen-ui'
import { MonitorsProvider } from '../context/monitors-context'
import AddMonitor from '../pages/AddMonitor'
import ViewMonitorById from '../pages/ViewMonitorById'

const AuthenticatedApp = () => {
  const { initTokenRefreshInterval } = useAuth()

  useEffect(() => {
    initTokenRefreshInterval()
  }, [initTokenRefreshInterval])

  return (
    <Pane>
      <NavBar />

      <MonitorsProvider>
        <Router>
          <Redirect from="/" to="/monitors/view" noThrow />
          <ViewMonitors path="/monitors/view" />
          <AddMonitor path="/monitors/add" />
          <ViewMonitorById path="/monitors/:id" />
        </Router>
      </MonitorsProvider>
    </Pane>
  )
}

export default AuthenticatedApp
