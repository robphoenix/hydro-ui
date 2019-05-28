import React, { useState } from 'react'
import { Pane, TextInputField, Button, Heading, majorScale } from 'evergreen-ui'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width={300}>
        <Heading
          is="h1"
          size={900}
          marginTop={majorScale(5)}
          marginBottom={majorScale(6)}
        >
          Hydro Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <TextInputField
            id="username"
            placeholder="Bet365 Username"
            label="Bet365 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInputField
            id="password"
            placeholder="Password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" appearance="primary">
            Log In
          </Button>
        </form>
      </Pane>
    </Pane>
  )
}

export default LoginForm
