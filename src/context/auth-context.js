import React from 'react'

import * as auth from '../utils/auth'

const AuthContext = React.createContext()

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function AuthProvider(props) {
  const isLoggedIn = () => auth.isLoggedIn()
  const displayName = () => auth.getDisplayName()
  const login = (form) => auth.login(form)
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, displayName, login }}
      {...props}
    />
  )
}

export { useAuth, AuthProvider }
