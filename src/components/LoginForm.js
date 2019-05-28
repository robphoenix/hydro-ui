import React, { useState, useEffect } from 'react'
import {
  Pane,
  TextInputField,
  Button,
  Heading,
  majorScale,
  minorScale,
  Text,
  Alert,
} from 'evergreen-ui'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [validForm, setValidForm] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ username, password }).catch((err) => {
      setError(err.message)
    })
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    setValidForm(username && password)
  }, [username, password])

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width={300}>
        <Heading
          is="h1"
          size={900}
          marginTop={majorScale(5)}
          marginBottom={minorScale(5)}
        >
          Hydro Login
        </Heading>

        <Pane marginBottom={minorScale(6)}>
          <Text as="p" size={500}>
            Please enter your Bet365 credentials
          </Text>
        </Pane>

        <form onSubmit={handleSubmit}>
          <TextInputField
            id="username"
            placeholder="Username"
            label="Username"
            value={username}
            onChange={(e) => {
              setError('')
              setUsername(e.target.value)
            }}
          />

          <TextInputField
            id="password"
            placeholder="Password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setError('')
              setPassword(e.target.value)
            }}
          />

          <Button
            type="submit"
            appearance="primary"
            disabled={!validForm}
            // TODO: move this margin bottom onto the form
            marginBottom={minorScale(4)}
          >
            LOG IN
          </Button>
        </form>
        {error && <Alert intent="danger" title={error} />}
      </Pane>
    </Pane>
  )
}

export default LoginForm
