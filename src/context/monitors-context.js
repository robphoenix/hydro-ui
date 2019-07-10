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
  getActionById,
  updateAction,
  reload,
} from '../utils/monitors-client'

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
          errors: {},
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
    monitor: {},
    isLoading: true,
    monitors: [],
    feedTypes: {},
    allGroups: [],
    allCategories: [],
    allActions: [],
    errors: {},
    action: {},
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

  const fetchActionById = React.useCallback(async (id) => {
    try {
      const action = await getActionById(id)
      dispatch({ type: 'SUCCESS', payload: { action } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { actionById: error } })
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
        getMonitorById,
        fetchMonitorById,
        fetchGroups,
        fetchCategories,
        fetchActions,
        archiveAction,
        fetchFeedTypes,
        reload,
        fetchActionById,
        updateAction,
        ...state,
      }}
      {...props}
    />
  )
}

export { useMonitors, MonitorsProvider }
