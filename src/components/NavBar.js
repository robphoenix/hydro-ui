import React from 'react'
import {
  Pane,
  Button,
  majorScale,
  Popover,
  Position,
  Menu,
  Text,
  toaster,
} from 'evergreen-ui'

import Logo from './Logo'
import { useUser } from '../context/user-context'
import { useAuth } from '../context/auth-context'
import NavLink from './NavLink'
import { Link } from '@reach/router'
import { reload } from '../utils/monitors-client'

const MenuButton = (props) => (
  <Button
    appearance="minimal"
    iconAfter="caret-down"
    marginLeft={majorScale(1)}
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

  const handleReload = async () => {
    try {
      const res = await reload()
      toaster.danger(res)
    } catch (error) {
      const { message, cause, uuid } = error
      toaster.danger(message, { description: `${cause} - uuid: ${uuid}` })
    }
  }

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
      <Link to="/">
        <Logo height="48px" />
      </Link>
      <Pane is="nav" display="flex" width="100%" justifyContent="flex-end">
        <Button
          type="button"
          onClick={handleReload}
          appearance="minimal"
          intent="danger"
          marginLeft={majorScale(4)}
        >
          Reload The LLDD
        </Button>
        <Popover
          position={Position.BOTTOM_LEFT}
          content={({ close }) => (
            <Menu>
              <Menu.Group>
                {monitorsLinks.map((link) => (
                  <NavLink key={link.to} to={link.to}>
                    <Menu.Item onSelect={close}>{link.label}</Menu.Item>
                  </NavLink>
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
                  <NavLink key={link.to} to={link.to}>
                    <Menu.Item onSelect={close}>{link.label}</Menu.Item>
                  </NavLink>
                ))}
              </Menu.Group>
            </Menu>
          )}
        >
          <MenuButton>
            <LinkTitle>actions</LinkTitle>
          </MenuButton>
        </Popover>

        <Button
          appearance="minimal"
          onClick={logout}
          marginLeft={majorScale(4)}
        >
          <Text>Log Out {user.displayName}</Text>
        </Button>
      </Pane>
    </Pane>
  )
}

export default NavBar
