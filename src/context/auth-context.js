import React from 'react'
import { navigate } from '@reach/router'

import * as auth from '../utils/auth'

const AuthContext = React.createContext()

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function onAuthenticationChange(path) {
  navigate(path)
  window.location.reload()
}

function AuthProvider(props) {
  const isLoggedIn = () => auth.isLoggedIn()
  const login = (form) =>
    auth.login(form).then(() => onAuthenticationChange(`/monitors`))
  const initTokenRefreshInterval = () => auth.initTokenRefreshInterval()
  const logout = () =>
    auth.logout().then(() => onAuthenticationChange(`/login`))
  const user = auth.getDecodedToken()
  const token = auth.getToken()

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        user,
        initTokenRefreshInterval,
        logout,
        token,
      }}
      {...props}
    />
  )
}

export { useAuth, AuthProvider }
