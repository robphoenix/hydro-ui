import React from 'react'
import axios from 'axios'

import { useAuth } from './context/auth-context'
import AuthenticatedApp from './components/AuthenticatedApp'
import UnauthenticatedApp from './components/UnauthenticatedApp'

const App = () => {
  const { isLoggedIn, token } = useAuth()

  // TODO: move into own file
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      try {
        const { data } = error.response
        return Promise.reject(data)
      } catch {
        return Promise.reject(error)
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

  return <div>{isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
}

export default App
