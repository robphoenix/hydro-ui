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
  Icon,
} from 'evergreen-ui'

import Logo from './Logo'
import { useUser } from '../context/user-context'
import { useAuth } from '../context/auth-context'
import NavLink from './NavLink'

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
      zIndex="2"
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
                <Menu.Item>
                  <NavLink to="/monitors/view">View Monitors</NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/monitors/add">Add New Monitor</NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/monitors/feedtypes">View Feed Types</NavLink>
                </Menu.Item>
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
              monitors
            </Text>
          </Button>
        </Popover>

        <Popover
          position={Position.BOTTOM_LEFT}
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item>
                  <NavLink to="/actions/view">View Actions</NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/actions/add">Add New Action</NavLink>
                </Menu.Item>
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
              actions
            </Text>
          </Button>
        </Popover>

        <Button
          appearance="minimal"
          marginLeft="auto"
          onClick={logout}
          display="flex"
          alignItems="center"
        >
          <Text>Log Out {user.displayName}</Text>
          <Icon icon="log-out" color="muted" marginLeft={majorScale(2)} />
        </Button>
      </Pane>
    </Pane>
  )
}

export default NavBar
