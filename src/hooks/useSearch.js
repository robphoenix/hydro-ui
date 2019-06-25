import React from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case `SET_VALUE`:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const useSearch = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    searchQuery: ``,
    status: `online`,
  })

  const handleSearchChange = (value) => {
    dispatch({
      type: `SET_VALUE`,
      payload: { searchQuery: value },
    })
  }

  const matchesSearchQuery = (term) => {
    const query = state.searchQuery.trim()
    if (query === '') {
      return true
    }
    const regex = new RegExp(query.toLowerCase(), 'gi')
    const match = term.match(regex)
    return match && match.length > 0
  }

  const handleStatusChange = (value) => {
    dispatch({ type: `SET_VALUE`, payload: { status: value } })
  }

  const statusOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Archived', value: 'archived' },
  ]

  return {
    handleSearchChange,
    handleStatusChange,
    matchesSearchQuery,
    statusOptions,
    ...state,
  }
}

export default useSearch
