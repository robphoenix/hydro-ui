import React from 'react'

import {
  getMonitors,
  addMonitor,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  unarchiveMonitor,
  getAllGroups,
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
      case 'SUCCESS':
        return {
          ...state,
          ...action.payload,
        }
      case 'SET_ERROR':
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.payload,
          },
        }
      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(monitorsReducer, {
    monitors: [],
    allGroups: [],
    errors: {},
  })

  const fetchMonitors = React.useCallback(async () => {
    try {
      const monitors = await getMonitors()
      dispatch({ type: 'SUCCESS', payload: { monitors } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: { monitors: error } })
    }
  }, [])

  const refreshMonitors = fetchMonitors

  const fetchGroups = React.useCallback(async () => {
    try {
      const allGroups = await getAllGroups()
      dispatch({ type: 'SUCCESS', payload: { allGroups } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: { allGroups: error } })
    }
  }, [])

  const { monitors, allGroups } = state

  return (
    <MonitorsContext.Provider
      value={{
        addMonitor,
        disableMonitor,
        enableMonitor,
        archiveMonitor,
        unarchiveMonitor,
        monitors,
        fetchMonitors,
        refreshMonitors,
        fetchGroups,
        allGroups,
      }}
      {...props}
    />
  )
}

export { useMonitors, MonitorsProvider }
