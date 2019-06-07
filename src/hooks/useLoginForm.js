import { useReducer } from 'react'

import { useAuth } from '../context/auth-context'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.value,
        },
      }
    case 'blur':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          valid: action.value,
        },
      }
    case 'focus':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          valid: true,
        },
        error: '',
      }
    case 'error':
      return {
        ...state,
        error: action.value,
      }
    case 'login':
      return {
        ...state,
        username: { value: '', valid: true },
        password: { value: '', valid: true },
      }
    default:
      return state
  }
}

const initialState = {
  username: {
    value: '',
    valid: true,
  },
  password: {
    value: '',
    valid: true,
  },
  error: '',
}

const useLoginForm = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState)
  const { username, password, error } = state

  const { login } = useAuth()

  const handleChange = (e) =>
    dispatch({
      type: 'field',
      name: e.currentTarget.name,
      value: e.currentTarget.value,
    })

  const handleBlur = (e) =>
    dispatch({
      type: 'blur',
      name: e.currentTarget.name,
      value: username.value !== '',
    })

  const handleFocus = (e) =>
    dispatch({ type: 'focus', name: e.currentTarget.name })

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ username: username.value, password: password.value }).catch(
      (error) => {
        dispatch({ type: 'error', value: error.message })
      },
    )
    dispatch({ type: 'login' })
  }

  return {
    username,
    password,
    error,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
  }
}

export default useLoginForm
