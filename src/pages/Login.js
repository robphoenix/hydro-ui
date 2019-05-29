import React from 'react'
import { Pane, Heading, majorScale, Text } from 'evergreen-ui'

import { useAuth } from '../context/auth-context'
import LoginForm from '../components/LoginForm'
import Logo from '../components/Logo'

const Login = () => {
  const { login } = useAuth()
  return (
    <Pane display="flex" justifyContent="center" marginTop={majorScale(5)}>
      <Pane width={300}>
        <Pane display="flex" alignItems="center" marginBottom={majorScale(3)}>
          <Logo height="48px" />
          <Heading is="h1" size={800} marginLeft={majorScale(1)}>
            HYDRO
          </Heading>
        </Pane>

        <Pane marginBottom={majorScale(4)}>
          <Heading is="h2" size={700} marginBottom={majorScale(2)}>
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
