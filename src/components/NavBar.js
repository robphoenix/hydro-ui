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
import { version } from '../../package.json'

const MenuButton = (props) => (
  <Button
    appearance="minimal"
    iconAfter="caret-down"
    marginLeft={majorScale(4)}
    color="muted"
    {...props}
  />
)

const LinkTitle = (props) => (
  <Text size={500} textTransform="uppercase" letterSpacing="0.4px" {...props} />
)

const NavBar = () => {
  const user = useUser()
  const { logout } = useAuth()

  const monitorsLinks = [
    { to: `/monitors/view`, label: `View Monitors` },
    { to: `/monitors/add`, label: `Add New Monitor` },
    { to: `/monitors/feedtypes`, label: `View Feed Types` },
  ]
  const actionsLinks = [
    { to: `/actions/view`, label: `View Actions` },
    { to: `/actions/add`, label: `Add New Action` },
  ]

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
      <Heading
        is="h1"
        size={700}
        marginLeft={majorScale(2)}
        marginRight={majorScale(4)}
      >
        HYDRO
      </Heading>
      <Text size={400}>v{version}</Text>
      <Pane is="nav" display="flex" width="100%">
        <Popover
          position={Position.BOTTOM_LEFT}
          content={({ close }) => (
            <Menu>
              <Menu.Group>
                {monitorsLinks.map((link) => (
                  <Menu.Item key={link.to} onSelect={close}>
                    <NavLink to={link.to}>{link.label}</NavLink>
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu>
          )}
        >
          <MenuButton>
            <LinkTitle>monitors</LinkTitle>
          </MenuButton>
        </Popover>

        <Popover
          position={Position.BOTTOM_LEFT}
          content={({ close }) => (
            <Menu>
              <Menu.Group>
                {actionsLinks.map((link) => (
                  <Menu.Item key={link.to} onSelect={close}>
                    <NavLink to={link.to}>{link.label}</NavLink>
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu>
          )}
        >
          <Button
            appearance="minimal"
            iconAfter="caret-down"
            marginLeft={majorScale(4)}
            color="muted"
          >
            <LinkTitle>actions</LinkTitle>
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
