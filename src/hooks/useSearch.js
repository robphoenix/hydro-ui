import React from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case `SET_SEARCH`:
      return {
        ...state,
        searchQuery: action.payload,
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
      type: `SET_SEARCH`,
      payload: value,
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

  return {
    handleSearchChange,
    matchesSearchQuery,
  }
}

export default useSearch
