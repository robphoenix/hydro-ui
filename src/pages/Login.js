import React from 'react'
import { Pane, majorScale, Text } from 'evergreen-ui'

import LoginForm from '../components/LoginForm'
import Logo from '../components/Logo'
import { navigate } from '@reach/router'
import PageHeading from '../components/PageHeading'
import hydroPhoto from '../assets/images/hydro-photo-medium.jpg'

const Login = () => {
  React.useEffect(() => {
    // change the URL, for instance if a user has logged out from another page
    navigate(`/login`)
  }, [])

  return (
    <Pane display="flex" height="100vh">
      <Pane
        flex="1"
        backgroundImage={`url(${hydroPhoto})`}
        backgroundSize="cover"
      />
      <Pane flex="1" display="flex" justifyContent="center" alignItems="center">
        <Pane width="30%" marginBottom={majorScale(16)}>
          <Pane display="flex" marginBottom={majorScale(8)}>
            <Logo />
          </Pane>

          <Pane marginBottom={majorScale(4)}>
            <PageHeading small>login</PageHeading>
            <Text as="p" size={500}>
              Please enter your Bet365 credentials
            </Text>
          </Pane>
          <LoginForm />
        </Pane>
      </Pane>
    </Pane>
  )
}

export default Login
