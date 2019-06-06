import React from 'react'

import { getMonitors } from '../utils/monitors-client'
import * as monitors from '../utils/monitors-client'

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
      .then(() => toaster.notify(`${monitor.name} disabled`))
      .catch((error) => console.log({ error }))
  }
  const enableMonitor = (monitor) => {
    return monitors
      .enableMonitor(monitor)
      .then(() => toaster.notify(`${monitor.name} enabled`))
      .catch((error) => console.log({ error }))
  }

  return (
    <MonitorContext.Provider
      value={{
        getMonitors,
        disableMonitor,
        enableMonitor,
      }}
      {...props}
    />
  )
}

export { useMonitor, MonitorProvider }
