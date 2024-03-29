import React from 'react'
import { useAuth } from './auth-context'

const UserContext = React.createContext(null)

function UserProvider(props) {
  const { user } = useAuth()
  const { displayName, groups, permissions } = user
  const isAdmin =
    permissions && !!permissions.length && permissions.includes(`isAdmin`)
  const allowsEdit =
    permissions && !!permissions.length && permissions.includes(`allowsEdit`)

  return (
    <UserContext.Provider
      value={{ displayName, userGroups: groups, isAdmin, allowsEdit }}
      {...props}
    />
  )
}

function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}

export { UserProvider, useUser }
