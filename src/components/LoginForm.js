import React from 'react'
import { TextInputField, Button, majorScale, Alert } from 'evergreen-ui'

import useLoginForm from '../hooks/useLoginForm'

const LoginForm = () => {
  const {
    username,
    password,
    error,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
  } = useLoginForm()

  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        autoFocus
        placeholder="Username"
        label="Username"
        name="username"
        value={username.value}
        required
        isInvalid={!username.valid}
        validationMessage={
          !username.valid && 'You must enter your Bet365 username'
        }
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />

      <TextInputField
        placeholder="Password"
        label="Password"
        type="password"
        name="password"
        value={password.value}
        required
        isInvalid={!password.valid}
        validationMessage={
          !password.valid && 'You must enter your Bet365 password'
        }
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />

      <Button
        type="submit"
        appearance="primary"
        disabled={username.value === '' || password.value === ''}
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
