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

const useSearch = (monitors) => {
  const [state, dispatch] = React.useReducer(reducer, {
    searchQuery: ``,
    status: `online`,
    selectedCategories: [],
    categoriesButtonText: `Filter Categories...`,
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

  const handleCategorySelect = (item) => {
    dispatch({
      type: `SET_VALUE`,
      payload: {
        selectedCategories: [...state.selectedCategories, item.value],
      },
    })
  }

  const handleCategoryDeselect = (item) => {
    const deselectedItemIndex = state.selectedCategories.indexOf(item.value)
    const selectedCategories = state.selectedCategories.filter(
      (_item, i) => i !== deselectedItemIndex,
    )
    dispatch({
      type: `SET_VALUE`,
      payload: {
        selectedCategories,
      },
    })
  }

  React.useEffect(() => {
    const numberOfCategories = state.selectedCategories.length
    if (!numberOfCategories) {
      dispatch({
        type: `SET_VALUE`,
        payload: { categoriesButtonText: `Filter Categories...` },
      })
    }
    if (numberOfCategories === 1) {
      dispatch({
        type: `SET_VALUE`,
        payload: {
          categoriesButtonText: `${state.selectedCategories[0]} selected`,
        },
      })
    }
    if (numberOfCategories > 1) {
      dispatch({
        type: `SET_VALUE`,
        payload: {
          categoriesButtonText: `${numberOfCategories} categories selected`,
        },
      })
    }
  }, [state.selectedCategories])

  const categoryOptions = Array.from(
    new Set(
      monitors.reduce(
        (prev, monitor) => [...prev, ...monitor.categories.map((c) => c.name)],
        [],
      ),
    ),
  ).map((label) => ({ label, value: label }))

  const hasSelectedCategories = (categories, selected) => {
    if (!selected || !selected.length) {
      return true
    }
    return categories
      .map((category) => category.name)
      .some((name) => selected.includes(name))
  }

  return {
    handleSearchChange,
    handleStatusChange,
    matchesSearchQuery,
    statusOptions,
    categoryOptions,
    hasSelectedCategories,
    handleCategorySelect,
    handleCategoryDeselect,
    ...state,
  }
}

export default useSearch
