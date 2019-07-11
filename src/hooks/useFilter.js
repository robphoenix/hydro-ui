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

const useFilter = (initialValues) => {
  const [state, dispatch] = React.useReducer(reducer, initialValues)

  const handleSearchInputChange = (fieldName) => (event) => {
    dispatch({
      type: `SET_VALUE`,
      payload: { [fieldName]: event.target.value },
    })
  }

  const getSearchInputProps = (fieldName) => ({
    value: state[fieldName],
    onChange: handleSearchInputChange(fieldName),
  })

  const handleTableSearchChange = (value) =>
    dispatch({
      type: `SET_VALUE`,
      payload: { searchQuery: value },
    })

  const handleSegmentedControlChange = (fieldName) => (value) => {
    dispatch({ type: `SET_VALUE`, payload: { [fieldName]: value } })
  }

  const getSegmentedControlProps = (fieldName) => {
    return {
      value: state[fieldName],
      onChange: handleSegmentedControlChange(fieldName),
    }
  }

  const handleMultiSelect = (fieldName) => (item) => {
    dispatch({
      type: `SET_VALUE`,
      payload: {
        [fieldName]: [...state[fieldName], item.value],
      },
    })
  }

  const handleMultiDeselect = (fieldName) => (item) => {
    const current = state[fieldName]
    const updated = current.filter((_, i) => i !== current.indexOf(item.value))
    dispatch({ type: `SET_VALUE`, payload: { [fieldName]: updated } })
  }

  const getMultiSelectMenuProps = (fieldName) => ({
    selected: state[fieldName],
    onSelect: handleMultiSelect(fieldName),
    onDeselect: handleMultiDeselect(fieldName),
  })

  const handleSelect = (fieldName) => (item) => {
    dispatch({
      type: `SET_VALUE`,
      payload: { [fieldName]: item },
    })
  }

  const getSelectMenuProps = (fieldName) => ({
    selected: state[fieldName].value,
    onSelect: handleSelect(fieldName),
  })

  return {
    getSegmentedControlProps,
    getMultiSelectMenuProps,
    getSelectMenuProps,
    getSearchInputProps,
    handleTableSearchChange,
    ...state,
  }
}

export default useFilter
