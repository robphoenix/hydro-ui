import React from 'react'

import {
  getMonitors,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  unarchiveMonitor,
} from '../utils/monitor-client'

const MonitorsContext = React.createContext()

function useMonitors() {
  const context = React.useContext(MonitorsContext)
  if (context === undefined) {
    throw new Error(`useMonitors must be used within a MonitorsProvider`)
  }
  return context
}

function MonitorsProvider(props) {
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
    <MonitorsContext.Provider
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

export { useMonitors, MonitorsProvider }
