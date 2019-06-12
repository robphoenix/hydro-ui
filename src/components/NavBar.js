import React from 'react'
import {
  Pane,
  Heading,
  Button,
  majorScale,
  Popover,
  Position,
  Menu,
  Text,
} from 'evergreen-ui'
import { navigate } from '@reach/router'

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
      zIndex="999"
    >
      <Logo height="40px" />
      <Heading is="h1" size={700} marginLeft={majorScale(2)}>
        HYDRO
      </Heading>
      <Pane is="nav" display="flex" width="100%">
        <Popover
          position={Position.BOTTOM_LEFT}
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item onSelect={() => navigate(`/monitors/view`)}>
                  View Monitors
                </Menu.Item>
                <Menu.Item onSelect={() => navigate(`/monitors/add`)}>
                  Add New Monitor
                </Menu.Item>
                <Menu.Item onSelect={() => {}}>View Feed Types</Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <Button
            appearance="minimal"
            iconAfter="caret-down"
            marginLeft={majorScale(4)}
            color="muted"
          >
            <Text size={500} textTransform="uppercase" letterSpacing="0.4px">
              Monitors
            </Text>
          </Button>
        </Popover>

        <Button appearance="minimal" marginLeft="auto" onClick={() => logout()}>
          <Text>Log Out {user.displayName}</Text>
        </Button>
      </Pane>
    </Pane>
  )
}

export default NavBar
