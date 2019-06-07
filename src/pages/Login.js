import React from 'react'
import { Pane, Heading, majorScale, Text } from 'evergreen-ui'

import LoginForm from '../components/LoginForm'
import Logo from '../components/Logo'

const Login = () => {
  return (
    <Pane display="flex" justifyContent="center" marginTop={majorScale(5)}>
      <Pane width={300}>
        <Pane display="flex" alignItems="center" marginBottom={majorScale(5)}>
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
        <LoginForm />
      </Pane>
    </Pane>
  )
}

export default Login
