import React from 'react'

import { isLoggedIn, getDisplayName } from '../utils/auth'

const AuthContext = React.createContext({
  isLoggedIn: false,
  displayName: '',
})

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function AuthProvider(props) {
  const authenticatedUser = isLoggedIn()
  const displayName = getDisplayName()
  return (
    <AuthContext.Provider
      value={{ authenticatedUser, displayName }}
      {...props}
    />
  )
}

export { useAuth, AuthProvider }
