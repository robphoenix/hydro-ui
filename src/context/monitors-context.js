import React from 'react'

import {
  getMonitors,
  getMonitorById,
  addMonitor,
  addCategories,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  unarchiveMonitor,
  getAllGroups,
  getAllCategories,
  getAllActions,
} from '../utils/monitors-client'
import { newEventBus } from '../utils/eventbus-client'

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
    monitor: {},
    allGroups: [],
    allCategories: [],
    allActions: [],
    errors: {},
    eventBusMessage: {},
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

  const fetchMonitorById = React.useCallback(async (id) => {
    try {
      const monitor = await getMonitorById(id)
      dispatch({ type: 'SUCCESS', payload: { monitor } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: { monitors: error } })
    }
  }, [])

  const fetchGroups = React.useCallback(async () => {
    try {
      const allGroups = await getAllGroups()
      dispatch({ type: 'SUCCESS', payload: { allGroups } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: { allGroups: error } })
    }
  }, [])

  const fetchCategories = React.useCallback(async () => {
    try {
      const allCategories = await getAllCategories()
      dispatch({ type: 'SUCCESS', payload: { allCategories } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: { allCategories: error } })
    }
  }, [])

  const fetchActions = React.useCallback(async () => {
    try {
      const allActions = await getAllActions()
      dispatch({ type: 'SUCCESS', payload: { allActions } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', value: { allActions: error } })
    }
  }, [])

  const initEventBus = React.useCallback((name) => {
    if (name) {
      const eb = newEventBus(name, (error, eventBusMessage) => {
        if (error) {
          eb.close()
          dispatch({ type: 'SET_ERROR', value: { eventBus: error } })
        }
        if (eventBusMessage) {
          const { h: headers, d: data } = eventBusMessage.body
          dispatch({
            type: 'SUCCESS',
            payload: { eventBusMessage: { headers, data } },
          })
        }
      })
    }
  }, [])

  return (
    <MonitorsContext.Provider
      value={{
        addMonitor,
        addCategories,
        disableMonitor,
        enableMonitor,
        archiveMonitor,
        unarchiveMonitor,
        fetchMonitors,
        fetchMonitorById,
        refreshMonitors,
        fetchGroups,
        fetchCategories,
        fetchActions,
        initEventBus,
        ...state,
      }}
      {...props}
    />
  )
}

export { useMonitors, MonitorsProvider }
