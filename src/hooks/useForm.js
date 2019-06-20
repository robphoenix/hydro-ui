import React from 'react'

import { setNestedObjectValues } from '../utils/utils'

// https://codesandbox.io/s/pp3k64jj1x

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      }
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      }
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload,
        },
      }
    case 'SUBMIT_ATTEMPT':
      return {
        ...state,
        isSubmitting: true,
        touched: setNestedObjectValues(state.values, true),
      }
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
      }
    case 'SUBMIT_FAILURE':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      }
    default:
      return state
  }
}

function useForm(props) {
  if (!props.onSubmit) {
    throw new Error('You forgot to pass onSubmit to useForm!')
  }

  const [state, dispatch] = React.useReducer(reducer, {
    values: props.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  })

  React.useEffect(() => {
    if (props.validate) {
      const errors = props.validate(state.values)
      dispatch({ type: 'SET_ERRORS', payload: errors })
    }
  }, [props, state.values])

  const handleInputChange = (fieldName) => (event) => {
    event.persist()
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: event.target.value },
    })
  }

  const handleTagInputChange = (fieldName) => (values) => {
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: values },
    })
  }

  const handleSwitchChange = (fieldName) => (event) => {
    event.persist()
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: event.target.checked },
    })
  }

  const handleSegmentedControlChange = (fieldName) => (event) => {
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: event },
    })
  }

  const handleQuillEditorChange = (fieldName) => (event) => {
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: event },
    })
  }

  const handleRadioGroupChange = (fieldName) => (event) => {
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: event },
    })
  }

  const handleSelect = (fieldName) => (item) => {
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: [...state.values[fieldName], item.value] },
    })
  }

  const handleDeselect = (fieldName) => (item) => {
    const values = state.values[fieldName]
    const deselectedItemIndex = values.indexOf(item.value)
    const selectedItems = values.filter((_item, i) => i !== deselectedItemIndex)

    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: selectedItems },
    })
  }

  const handleBlur = (fieldName) => () => {
    dispatch({
      type: 'SET_FIELD_TOUCHED',
      payload: { [fieldName]: true },
    })
  }

  const getInputFieldProps = (fieldName) => {
    return {
      value: state.values[fieldName],
      onChange: handleInputChange(fieldName),
      onBlur: handleBlur(fieldName),
    }
  }

  const getTagInputFieldProps = (fieldName) => ({
    values: state.values[fieldName],
    onChange: handleTagInputChange(fieldName),
    onBlur: handleBlur(fieldName),
  })

  const getSwitchFieldProps = (fieldName) => ({
    checked: state.values[fieldName],
    onChange: handleSwitchChange(fieldName),
  })

  const getSegmentedControlFieldProps = (fieldName) => ({
    value: state.values[fieldName],
    onChange: handleSegmentedControlChange(fieldName),
  })

  const getSelectMenuProps = (fieldName) => ({
    selected: state.values[fieldName],
    onSelect: handleSelect(fieldName),
    onDeselect: handleDeselect(fieldName),
  })

  const getQuillEditorProps = (fieldName) => ({
    defaultValue: state.values[fieldName],
    onChange: handleQuillEditorChange(fieldName),
    onBlur: handleBlur(fieldName),
  })

  const getRadioGroupProps = (fieldName) => ({
    value: state.values[fieldName],
    onChange: handleRadioGroupChange(fieldName),
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch({ type: 'SUBMIT_ATTEMPT' })
    const errors = props.validate(state.values)
    if (!Object.keys(errors).length) {
      try {
        await props.onSubmit(state.values)
        dispatch({ type: 'SUBMIT_SUCCESS' })
      } catch (submitError) {
        dispatch({ type: 'SUBMIT_FAILURE', payload: submitError })
      }
    } else {
      dispatch({ type: 'SET_ERRORS', payload: errors })
      dispatch({ type: 'SUBMIT_FAILURE' })
    }
  }

  return {
    handleSubmit,
    getInputFieldProps,
    getTagInputFieldProps,
    getSwitchFieldProps,
    getSegmentedControlFieldProps,
    getSelectMenuProps,
    getQuillEditorProps,
    getRadioGroupProps,
    ...state,
  }
}

export default useForm
