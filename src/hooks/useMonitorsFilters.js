import React from 'react'
import {
  matchesSearchQuery,
  hasSelectedCategories,
  isStatus,
} from '../utils/filters'

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

const useMonitorsFilters = (initialValues) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialValues,
    filtered: initialValues.original,
  })

  React.useEffect(() => {
    dispatch({
      type: `SET_VALUE`,
      payload: { original: initialValues.original },
    })
  }, [initialValues.original])

  const handleTableSearchChange = (value) => {
    dispatch({
      type: `SET_VALUE`,
      payload: { searchQuery: value },
    })
  }

  const handleSegmentedControlChange = (fieldName) => (value) => {
    dispatch({ type: `SET_VALUE`, payload: { [fieldName]: value } })
  }

  const getSegmentedControlProps = (fieldName) => {
    return {
      value: state[fieldName],
      onChange: handleSegmentedControlChange(fieldName),
    }
  }

  const handleSelect = (fieldName) => (item) => {
    dispatch({
      type: `SET_VALUE`,
      payload: {
        [fieldName]: [...state[fieldName], item.value],
      },
    })
  }

  const handleDeselect = (fieldName) => (item) => {
    const current = state[fieldName]
    const updated = current.filter((_, i) => i !== current.indexOf(item.value))

    dispatch({ type: `SET_VALUE`, payload: { [fieldName]: updated } })
  }

  const getSelectMenuProps = (fieldName) => ({
    selected: state[fieldName],
    onSelect: handleSelect(fieldName),
    onDeselect: handleDeselect(fieldName),
  })

  const filter = React.useCallback(
    (original) => {
      return original.filter((item) => {
        const term = `${item.name} ${item.description}`.toLowerCase()

        return (
          isStatus(item, state.status) &&
          matchesSearchQuery(term, state.searchQuery) &&
          hasSelectedCategories(item.categories, state.selectedCategories)
        )
      })
    },
    [state.searchQuery, state.selectedCategories, state.status],
  )

  React.useEffect(() => {
    dispatch({
      type: `SET_VALUE`,
      payload: { filtered: filter(state.original) },
    })
  }, [filter, state.original])

  return {
    getSegmentedControlProps,
    getSelectMenuProps,
    handleTableSearchChange,
    ...state,
  }
}

export default useMonitorsFilters
