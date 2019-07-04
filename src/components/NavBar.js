import React from 'react'
import {
  Pane,
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
import { Link } from '@reach/router'

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
  const { displayName, isAdmin } = useUser()
  const { logout } = useAuth()

  const monitorsLinks = [
    { to: `/monitors/view`, label: `View Monitors`, show: true },
    { to: `/monitors/add`, label: `Add New Monitor`, show: isAdmin },
    { to: `/monitors/feedtypes`, label: `View Feed Types`, show: true },
  ]
  const actionsLinks = [
    { to: `/actions/view`, label: `View Actions`, show: true },
    { to: `/actions/add`, label: `Add New Action`, show: isAdmin },
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
        <Popover
          position={Position.BOTTOM_LEFT}
          content={({ close }) => (
            <Menu>
              <Menu.Group>
                {monitorsLinks
                  .filter((link) => link.show)
                  .map((link) => (
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
                {actionsLinks
                  .filter((link) => link.show)
                  .map((link) => (
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
          <Icon icon="user" marginRight={majorScale(1)} color="muted" />
          <Text>Log Out {displayName}</Text>
        </Button>
      </Pane>
    </Pane>
  )
}

export default NavBar
