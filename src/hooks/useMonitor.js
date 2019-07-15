import React from 'react'
import { getMonitorById } from '../utils/monitors-client'

const monitorsReducer = (state, action) => {
  switch (action.type) {
    case `SUCCESS`:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        errors: {},
      }
    case `ERROR`:
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
  errors: {},
}

const useMonitor = () => {
  const [state, dispatch] = React.useReducer(monitorsReducer, initialState)

  const fetchMonitorById = async (id) => {
    try {
      const monitor = await getMonitorById(id)
      dispatch({ type: `SUCCESS`, payload: { monitor } })
    } catch (error) {
      dispatch({ type: `ERROR`, payload: { monitorById: error } })
    }
  }

  return {
    fetchMonitorById,
    ...state,
  }
}

export default useMonitor
