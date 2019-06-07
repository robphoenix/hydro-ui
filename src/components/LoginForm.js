import React from 'react'
import { TextInputField, Button, majorScale, Alert } from 'evergreen-ui'

import useLoginForm from '../hooks/useLoginForm'

const LoginForm = () => {
  const {
    username,
    usernameIsValid,
    password,
    passwordIsValid,
    error,
    handleUsernameChange,
    handleUsernameBlur,
    handleUsernameFocus,
    handlePasswordChange,
    handlePasswordBlur,
    handlePasswordFocus,
    handleSubmit,
  } = useLoginForm()

  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        autoFocus
        placeholder="Username"
        label="Username"
        name="username"
        value={username}
        required
        isInvalid={!usernameIsValid}
        validationMessage={
          !usernameIsValid && 'You must enter your Bet365 username'
        }
        onChange={handleUsernameChange}
        onBlur={handleUsernameBlur}
        onFocus={handleUsernameFocus}
      />

      <TextInputField
        placeholder="Password"
        label="Password"
        type="password"
        name="password"
        value={password}
        required
        isInvalid={!passwordIsValid}
        validationMessage={
          !passwordIsValid && 'You must enter your Bet365 password'
        }
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        onFocus={handlePasswordFocus}
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
