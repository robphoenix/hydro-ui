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

const useFilter = (props) => {
  const { initialValues } = props
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

  const getMultiSelectMenuProps = (fieldName) => {
    return {
      selected: state[fieldName],
      onSelect: handleMultiSelect(fieldName),
      onDeselect: handleMultiDeselect(fieldName),
    }
  }

  const handleSelect = (fieldName) => (item) => {
    dispatch({
      type: `SET_VALUE`,
      payload: { [fieldName]: item.value },
    })
  }

  const getSelectMenuProps = (fieldName) => {
    return {
      selected: state[fieldName],
      onSelect: handleSelect(fieldName),
    }
  }

  return {
    getSegmentedControlProps,
    getMultiSelectMenuProps,
    getSelectMenuProps,
    handleTableSearchChange,
    ...state,
  }
}

export default useFilter
