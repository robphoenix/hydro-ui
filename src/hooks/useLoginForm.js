import { useState } from 'react'

import { useAuth } from '../context/auth-context'

const useLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameIsValid, setUsernameIsValid] = useState(true)
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [error, setError] = useState('')

  const { login } = useAuth()

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleUsernameBlur = () => setUsernameIsValid(username !== '')
  const handleUsernameFocus = () => {
    setError('')
    setUsernameIsValid(true)
  }

  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handlePasswordBlur = () => setPasswordIsValid(password !== '')
  const handlePasswordFocus = () => {
    setError('')
    setPasswordIsValid(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ username, password }).catch((err) => {
      setError(err.message)
    })
    setUsername('')
    setPassword('')
  }

  return {
    username,
    password,
    usernameIsValid,
    passwordIsValid,
    error,
    handleUsernameChange,
    handleUsernameBlur,
    handleUsernameFocus,
    handlePasswordChange,
    handlePasswordBlur,
    handlePasswordFocus,
    handleSubmit,
  }
}

export default useLoginForm
