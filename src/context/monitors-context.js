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
} from '../utils/monitors-client'
import { eventBusLiveData, eventBusCachedData } from '../utils/eventbus-client'

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
      case 'SUCCESS':
        return {
          ...state,
          ...action.payload,
          isLoading: false,
        }
      case 'SET_ERROR':
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.payload,
          },
        }
      case 'ADD_CONNECTION':
        return {
          ...state,
          eventBusConnections: [...state.eventBusConnections, action.payload],
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
    liveDataMessage: {},
    cachedDataMessage: {},
    eventBusConnections: [],
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

  const getMessageData = (body) => {
    const { h, d } = body

    const headersMetadata = h.reduce((metadata, header) => {
      const { n: name, t: type, f: format } = header
      metadata[name] = { type, format }
      return metadata
    }, {})

    const headers = h.map((header) => header.n)

    const data = d.map((attributes) => {
      return attributes.reduce((columns, column, i) => {
        columns[headers[i]] = column
        return columns
      }, {})
    })
    return { headersMetadata, headers, data }
  }

  const initLiveDataConnection = React.useCallback((name) => {
    if (name) {
      const eb = eventBusLiveData(name, (error, message) => {
        if (error) {
          eb.close()
          dispatch({ type: 'SET_ERROR', payload: { liveData: error } })
        }
        if (message) {
          dispatch({
            type: 'SUCCESS',
            payload: { liveDataMessage: getMessageData(message.body) },
          })
        }
      })
      dispatch({ type: 'ADD_CONNECTION', payload: eb })
    }
  }, [])

  const closeEventBusConnections = () => {
    state.eventBusConnections.map((eb) => eb.close())
  }

  const initCachedDataConnection = React.useCallback((name) => {
    if (name) {
      const eb = eventBusCachedData(name, (error, message) => {
        if (error) {
          eb.close()
          dispatch({ type: 'SET_ERROR', payload: { cachedData: error } })
        }
        if (message) {
          if (message.body) {
            dispatch({
              type: 'SUCCESS',
              payload: { cachedDataMessage: getMessageData(message.body) },
            })
          }
          // we'll only ever recieve the one message
          eb.close()
        }
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
        initLiveDataConnection,
        initCachedDataConnection,
        closeEventBusConnections,
        ...state,
      }}
      {...props}
    />
  )
}

export { useMonitors, MonitorsProvider }
