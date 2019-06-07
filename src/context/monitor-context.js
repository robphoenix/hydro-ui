import React from 'react'

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
  const monitorsReducer = (state, action) => {
    switch (action.type) {
      case 'success':
        return {
          monitors: action.value,
          error: ``,
        }
      case 'error':
        return {
          monitors: [],
          error: action.value,
        }
      default:
        return state
    }
  }

  const initialState = {
    monitors: [],
    error: ``,
  }

  const [state, dispatch] = React.useReducer(monitorsReducer, initialState)

  const fetchMonitors = async () => {
    try {
      const monitors = await getMonitors()
      dispatch({ type: 'success', value: monitors })
    } catch (error) {
      dispatch({ type: 'error', value: error })
    }
  }

  const refreshMonitors = fetchMonitors
  const { monitors } = state

  return (
    <MonitorContext.Provider
      value={{
        disableMonitor,
        enableMonitor,
        archiveMonitor,
        unarchiveMonitor,
        monitors,
        fetchMonitors,
        refreshMonitors,
      }}
      {...props}
    />
  )
}

export { useMonitor, MonitorProvider }
