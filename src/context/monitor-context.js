import React from 'react'

import * as monitors from '../utils/monitor-client'
import {
  getMonitors,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  unarchiveMonitor,
} from '../utils/monitor-client'

const MonitorContext = React.createContext()

function useMonitor() {
  const context = React.useContext(MonitorContext)
  if (context === undefined) {
    throw new Error(`useMonitor must be used within a MonitorProvider`)
  }
  return context
}

function MonitorProvider(props) {
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
