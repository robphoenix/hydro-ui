import React from 'react'
import dateFnsFormat from 'date-fns/format'

import { getMonitorById } from '../utils/monitors-client'

const changeEventMessages = {
  // this monitor was just removed from the monitor cache, which means it got archived;
  removed: `The monitor has been archived by another user.`,
  // this monitor just got its status changed to online;
  online: `The monitor status has been changed to online by another user.`,
  // this monitor just got its status changed to online;
  offline: `The monitor status has been changed to offline by another user.`,
  // the EPL query for this monitor was updated;
  eplUpdated: `The monitor EPL Query has been changed by another user.`,
  // the cache window for this monitor was updated.
  cacheWindowChanged: `The monitor cache window has been changed by another user.`,
}

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

  const maxLengths = data.reduce((lengths, attributes) => {
    Object.keys(attributes).forEach((attribute) => {
      if (!lengths[attribute]) {
        lengths[attribute] =
          attribute.length > `${attributes[attribute]}`.length
            ? attribute.length
            : `${attributes[attribute]}`.length
      } else {
        const max =
          lengths[attribute] > `${attributes[attribute]}`.length
            ? lengths[attribute]
            : `${attributes[attribute]}`.length

        lengths[attribute] = max
      }
    })
    return lengths
  }, {})

  return { headersMetadata, headers, data, maxLengths }
}

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
    case `SET_VALUE`:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const initialState = {
  monitor: {},
  isLoading: true,
  errors: {},
  headers: [],
  headersMetadata: [],
  data: [],
  isLiveData: false,
  showEplQuery: false,
  paused: false,
  receivedAt: ``,
  direction: {},
  searchQuery: ``,
  showChangeEvent: false,
  changeEventMessage: ``,
}

const useMonitor = () => {
  const [state, dispatch] = React.useReducer(monitorsReducer, initialState)

  const fetchMonitorById = React.useCallback(async (id) => {
    try {
      const monitor = await getMonitorById(id)
      dispatch({ type: `SUCCESS`, payload: { monitor } })
    } catch (error) {
      dispatch({ type: `ERROR`, payload: { monitorById: error } })
    }
  }, [])

  const handleCachedMessage = React.useCallback((message) => {
    if (message.body) {
      const { headers, headersMetadata, data, maxLengths } = getMessageData(
        message.body,
      )
      dispatch({
        type: `SET_VALUE`,
        payload: { headers, headersMetadata, data, maxLengths },
      })
    }
  }, [])

  const handleLiveMessage = React.useCallback((message) => {
    if (message.body) {
      const isLiveData = true
      const receivedAt = dateFnsFormat(new Date(), `HH:mm:ss dd/MM/yyyy`)
      const { headers, headersMetadata, data, maxLengths } = getMessageData(
        message.body,
      )
      dispatch({
        type: `SET_VALUE`,
        payload: {
          headers,
          headersMetadata,
          data,
          isLiveData,
          receivedAt,
          maxLengths,
        },
      })
    }
  }, [])

  const handleChangeEventMessage = React.useCallback((message) => {
    if (message.body) {
      const changeEventMessage = changeEventMessages[message.body]
      dispatch({
        type: `SET_VALUE`,
        payload: {
          showChangeEvent: true,
          changeEventMessage,
        },
      })
    }
  }, [])

  const showEpl = (showEplQuery) => {
    dispatch({ type: `SET_VALUE`, payload: { showEplQuery } })
  }

  const togglePause = () => {
    dispatch({ type: `SET_VALUE`, payload: { paused: !state.paused } })
  }

  const handleSearchChange = (e) =>
    dispatch({
      type: `SET_VALUE`,
      payload: { searchQuery: e.target.value.trim() },
    })

  const handleChangeEventClose = () => {
    dispatch({
      type: `SET_VALUE`,
      payload: {
        showChangeEvent: false,
        changeEventMessage: ``,
      },
    })
  }

  return {
    fetchMonitorById,
    handleCachedMessage,
    handleLiveMessage,
    handleChangeEventMessage,
    showEpl,
    togglePause,
    handleSearchChange,
    handleChangeEventClose,
    ...state,
  }
}

export default useMonitor
