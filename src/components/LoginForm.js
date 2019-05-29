import React, { useState } from 'react'
import { TextInputField, Button, majorScale, Alert } from 'evergreen-ui'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [invalidUsername, setInvalidUsername] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ username, password }).catch((err) => {
      setError(err.message)
    })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        autoFocus
        placeholder="Username"
        label="Username"
        value={username}
        required
        isInvalid={invalidUsername}
        validationMessage={
          invalidUsername && 'You must enter your Bet365 username'
        }
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => setInvalidUsername(username === '')}
        onFocus={() => {
          setError('')
          setInvalidUsername(false)
        }}
      />

      <TextInputField
        placeholder="Password"
        label="Password"
        type="password"
        value={password}
        required
        isInvalid={invalidPassword}
        validationMessage={
          invalidPassword && 'You must enter your Bet365 password'
        }
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setInvalidPassword(password === '')}
        onFocus={() => {
          setError('')
          setInvalidPassword(false)
        }}
      />

      <Button
        type="submit"
        appearance="primary"
        disabled={username === '' || password === ''}
      >
        LOG IN
      </Button>
      {error && (
        <Alert intent="danger" title={error} marginTop={majorScale(4)} />
      )}
    </form>
  )
}

export default LoginForm
