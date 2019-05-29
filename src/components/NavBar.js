import React from 'react'
import { Pane, Heading, Button, majorScale } from 'evergreen-ui'

import Logo from './Logo'
import { useUser } from '../context/user-context'
import { useAuth } from '../context/auth-context'

const NavBar = () => {
  const user = useUser()
  const { logout } = useAuth()

  return (
    <Pane
      display="flex"
      alignItems="center"
      paddingX={majorScale(4)}
      elevation={1}
      position="sticky"
      top="0"
      width="100%"
      height={majorScale(11)}
      backgroundColor="white"
    >
      <Logo height="40px" />
      <Heading is="h1" size={700} marginLeft={majorScale(2)}>
        HYDRO
      </Heading>
      <Pane is="nav" display="flex" width="100%">
        <Button appearance="minimal" marginLeft="auto" onClick={() => logout()}>
          Log Out {user.displayName}
        </Button>
      </Pane>
    </Pane>
  )
}

export default NavBar
