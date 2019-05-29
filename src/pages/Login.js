import React from 'react'
import { Pane, Heading, majorScale, minorScale, Text } from 'evergreen-ui'

import { useAuth } from '../context/auth-context'
import LoginForm from '../components/LoginForm'
import Logo from '../components/Logo'

const Login = () => {
  const { login } = useAuth()
  return (
    <Pane display="flex" justifyContent="center" marginTop={majorScale(5)}>
      <Pane width={300}>
        <Pane display="flex" alignItems="center" marginBottom={minorScale(6)}>
          <Logo height="48px" />
          <Heading is="h1" size={800} marginLeft={minorScale(2)}>
            HYDRO
          </Heading>
        </Pane>

        <Pane marginBottom={minorScale(6)}>
          <Heading is="h2" size={700} marginBottom={minorScale(2)}>
            Login
          </Heading>
          <Text as="p" size={500}>
            Please enter your Bet365 credentials
          </Text>
        </Pane>
        <LoginForm onSubmit={login} />
      </Pane>
    </Pane>
  )
}

export default Login
