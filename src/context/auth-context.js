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
  const login = (form) => auth.login(form)
  const user = auth.getDecodedToken()

  return <AuthContext.Provider value={{ isLoggedIn, login, user }} {...props} />
}

export { useAuth, AuthProvider }
