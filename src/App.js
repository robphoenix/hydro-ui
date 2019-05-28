import React from 'react'
import axios from 'axios'

import { useAuth } from './context/auth-context'
import AuthenticatedApp from './components/AuthenticatedApp'
import UnauthenticatedApp from './components/UnauthenticatedApp'

function App() {
  const { isLoggedIn, token } = useAuth()
  const authenticated = isLoggedIn()

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const { status, data } = error.response
      if (status === 401) {
        return Promise.reject(data)
      }
    },
  )

  axios.interceptors.request.use((config) => {
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    config.headers = headers
    return config
  })

  return (
    <div>{authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
  )
}

export default App
