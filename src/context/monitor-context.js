import React from 'react'

import { getMonitors } from '../utils/monitor-client'
import * as monitors from '../utils/monitor-client'

import { toaster } from 'evergreen-ui'

const MonitorContext = React.createContext()

function useMonitor() {
  const context = React.useContext(MonitorContext)
  if (context === undefined) {
    throw new Error(`useMonitor must be used within a MonitorProvider`)
  }
  return context
}

function MonitorProvider(props) {
  const disableMonitor = (monitor) => {
    return monitors
      .disableMonitor(monitor)
      .then(() => toaster.notify(`${monitor.name} has been disabled`))
      .catch((error) => console.log({ error }))
  }

  const enableMonitor = (monitor) => {
    return monitors
      .enableMonitor(monitor)
      .then(() => toaster.notify(`${monitor.name} has been enabled`))
      .catch((error) => console.log({ error }))
  }

  const archiveMonitor = (monitor) => {
    return monitors
      .archiveMonitor(monitor)
      .then(() => toaster.notify(`${monitor.name} has been archived`))
      .catch((error) => console.log({ error }))
  }

  const unarchiveMonitor = (monitor) => {
    return monitors
      .unarchiveMonitor(monitor)
      .then(() => toaster.notify(`${monitor.name} has been archived`))
      .catch((error) => console.log({ error }))
  }

  return (
    <MonitorContext.Provider
      value={{
        getMonitors,
        disableMonitor,
        enableMonitor,
        archiveMonitor,
        unarchiveMonitor,
      }}
      {...props}
    />
  )
}

export { useMonitor, MonitorProvider }
