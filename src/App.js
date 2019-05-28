import React from 'react'
import axios from 'axios'

import { useAuth } from './context/auth-context'
import AppAuthenticated from './components/AppAuthenticated'
import AppNotAuthenticated from './components/AppNotAuthenticated'

function App() {
  const { isLoggedIn } = useAuth()
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

  return (
    <div>{authenticated ? <AppAuthenticated /> : <AppNotAuthenticated />}</div>
  )
}

export default App
