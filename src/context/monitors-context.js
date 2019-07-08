import React from 'react'

import {
  getMonitors,
  getMonitorById,
  addMonitor,
  updateMonitor,
  addCategories,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  archiveAction,
  unarchiveMonitor,
  getAllGroups,
  getAllCategories,
  getAllActions,
  getFeedTypes,
  addAction,
  reload,
} from '../utils/monitors-client'
import { eventBusChangeEvents } from '../utils/eventbus-client'

const MonitorsContext = React.createContext(null)

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
      case `SUCCESS`:
        return {
          ...state,
          ...action.payload,
          isLoading: false,
        }
      case `SET_ERROR`:
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

  const initialState = {
    isLoading: true,
    monitors: [],
    monitor: {},
    feedTypes: {},
    allGroups: [],
    allCategories: [],
    allActions: [],
    errors: {},
    changeEvent: {},
  }

  const [state, dispatch] = React.useReducer(monitorsReducer, initialState)

  const fetchMonitors = React.useCallback(async () => {
    try {
      const monitors = await getMonitors()
      dispatch({ type: 'SUCCESS', payload: { monitors } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { monitors: error } })
    }
  }, [])

  const fetchMonitorById = React.useCallback(async (id) => {
    try {
      const monitor = await getMonitorById(id)
      dispatch({ type: 'SUCCESS', payload: { monitor } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { monitorById: error } })
    }
  }, [])

  const fetchGroups = React.useCallback(async () => {
    try {
      const allGroups = await getAllGroups()
      dispatch({ type: 'SUCCESS', payload: { allGroups } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { allGroups: error } })
    }
  }, [])

  const fetchCategories = React.useCallback(async () => {
    try {
      const allCategories = await getAllCategories()
      dispatch({ type: 'SUCCESS', payload: { allCategories } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { allCategories: error } })
    }
  }, [])

  const fetchActions = React.useCallback(async () => {
    try {
      const allActions = await getAllActions()
      dispatch({ type: 'SUCCESS', payload: { allActions } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { allActions: error } })
    }
  }, [])

  const fetchFeedTypes = React.useCallback(async () => {
    try {
      const feedTypes = await getFeedTypes()
      dispatch({ type: 'SUCCESS', payload: { feedTypes } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { feedTypes: error } })
    }
  }, [])

  const initChangeEventsConnection = React.useCallback((name) => {
    if (name) {
      const eb = eventBusChangeEvents(name, (error, message) => {
        if (error) {
          eb.close()
          dispatch({ type: `SET_ERROR`, payload: { changeEvent: error } })
        }
        if (message) {
          dispatch({
            type: `SUCCESS`,
            payload: { changeEvent: message },
          })
        }
      })
      dispatch({
        type: `ADD_CONNECTION`,
        payload: { name: `CHANGE EVENTS ${name}`, eb },
      })
    }
  }, [])

  return (
    <MonitorsContext.Provider
      value={{
        addMonitor,
        addAction,
        updateMonitor,
        addCategories,
        disableMonitor,
        enableMonitor,
        archiveMonitor,
        unarchiveMonitor,
        fetchMonitors,
        fetchMonitorById,
        fetchGroups,
        fetchCategories,
        fetchActions,
        archiveAction,
        fetchFeedTypes,
        initChangeEventsConnection,
        reload,
        ...state,
      }}
      {...props}
    />
  )
}

export { useMonitors, MonitorsProvider }
