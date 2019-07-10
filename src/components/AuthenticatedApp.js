import React from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from '../context/auth-context'
import ViewMonitors from '../pages/ViewMonitors'
import NavBar from './NavBar'
import { Pane } from 'evergreen-ui'
import { MonitorsProvider } from '../context/monitors-context'
import AddMonitor from '../pages/AddMonitor'
import ViewMonitorById from '../pages/ViewMonitorById'
import EditMonitor from '../pages/EditMonitor'
import DuplicateMonitor from '../pages/DuplicateMonitor'
import ViewFeedTypes from '../pages/ViewFeedTypes'
import NotFound from '../pages/NotFound'
import AddAction from '../pages/AddAction'
import ViewActions from '../pages/ViewActions'
import PopulateDb from '../pages/PopulateDb'
import EditAction from '../pages/EditAction'

const AuthenticatedApp = () => {
  const { initTokenRefreshInterval } = useAuth()

  React.useEffect(() => {
    initTokenRefreshInterval()
  }, [initTokenRefreshInterval])

  return (
    <Pane>
      <NavBar />

      <MonitorsProvider>
        <Router>
          <Redirect from="/" to="/monitors/view" noThrow />
          <ViewMonitors path="/monitors/view" />
          <ViewFeedTypes path="/monitors/feedtypes" />
          <AddMonitor path="/monitors/add" />
          <EditMonitor path="/monitors/:id/edit" />
          <DuplicateMonitor path="/monitors/:id/duplicate" />
          <ViewMonitorById path="/monitors/:id" />
          <ViewActions path="/actions/view" />
          <AddAction path="/actions/add" />
          <EditAction path="/actions/:id/edit" />
          <PopulateDb path="/populate" />
          <NotFound default />
        </Router>
      </MonitorsProvider>
    </Pane>
  )
}

export default AuthenticatedApp
