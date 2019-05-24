import React from 'react'

import { isLoggedIn } from '../utils/auth'

const AuthContext = React.createContext({
  isLoggedIn: false,
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
  return <AuthContext.Provider value={{ authenticatedUser }} {...props} />
}

export { useAuth, AuthProvider }
