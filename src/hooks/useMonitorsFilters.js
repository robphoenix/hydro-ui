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

const useMonitorsFilters = (monitors) => {
  const [state, dispatch] = React.useReducer(reducer, {
    searchQuery: ``,
    status: `online`,
    selectedCategories: [],
    categoriesButtonText: `Filter Categories...`,
    filtered: monitors,
  })

  const handleSearchChange = (value) => {
    dispatch({
      type: `SET_VALUE`,
      payload: { searchQuery: value },
    })
  }

  const matchesSearchQuery = React.useCallback(
    (term) => {
      const query = state.searchQuery.trim()
      if (query === '') {
        return true
      }
      const regex = new RegExp(query.toLowerCase(), 'gi')
      const match = term.match(regex)
      return match && match.length > 0
    },
    [state.searchQuery],
  )

  const handleStatusChange = (value) => {
    dispatch({ type: `SET_VALUE`, payload: { status: value } })
  }

  const getStatusProps = () => ({
    value: state.status,
    onChange: handleStatusChange,
  })

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

  const hasSelectedCategories = (categories, selected) => {
    if (!selected || !selected.length) {
      return true
    }
    return categories
      .map((category) => category.name)
      .some((name) => selected.includes(name))
  }

  const getCategoriesProps = () => ({
    selected: state.selectedCategories,
    onSelect: handleCategorySelect,
    onDeselect: handleCategoryDeselect,
  })

  const filter = React.useCallback(
    (monitors) => {
      return monitors.filter((monitor) => {
        const term = `${monitor.name} ${monitor.description}`.toLowerCase()

        return (
          monitor.status === state.status &&
          matchesSearchQuery(term) &&
          hasSelectedCategories(monitor.categories, state.selectedCategories)
        )
      })
    },
    [matchesSearchQuery, state.selectedCategories, state.status],
  )

  React.useEffect(() => {
    dispatch({
      type: `SET_VALUE`,
      payload: { filtered: filter(monitors) },
    })
  }, [filter, monitors, state])

  return {
    getStatusProps,
    getCategoriesProps,
    handleSearchChange,
    ...state,
  }
}

export default useMonitorsFilters
