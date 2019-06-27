import React from 'react'
import { Pane, majorScale, Text } from 'evergreen-ui'

import LoginForm from '../components/LoginForm'
import Logo from '../components/Logo'
import { navigate } from '@reach/router'
import PageHeading from '../components/PageHeading'

const Login = () => {
  React.useEffect(() => {
    // change the URL, for instance if a user has logged out from another page
    navigate(`/login`)
  }, [])

  return (
    <Pane display="flex" justifyContent="center" marginTop={majorScale(6)}>
      <Pane width={300}>
        <Pane display="flex" alignItems="center" marginBottom={majorScale(8)}>
          <Logo />
        </Pane>

        <Pane marginBottom={majorScale(4)}>
          <PageHeading small>Login</PageHeading>
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
