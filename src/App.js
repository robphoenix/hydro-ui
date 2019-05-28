import React from 'react'

import { useAuth } from './context/auth-context'
import AppAuthenticated from './components/AppAuthenticated'
import AppNotAuthenticated from './components/AppNotAuthenticated'

function App() {
  const { isLoggedIn } = useAuth()
  const authenticated = isLoggedIn()

  return (
    <div>{authenticated ? <AppAuthenticated /> : <AppNotAuthenticated />}</div>
  )
}

export default App
