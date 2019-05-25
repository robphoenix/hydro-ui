import React from 'react'
import { Heading, minorScale } from 'evergreen-ui'

import LoginForm from './components/LoginForm'
import { useAuth } from './context/auth-context'
import AppAuthenticated from './components/AppAuthenticated'

function App() {
  const { isLoggedIn, displayName } = useAuth()
  const authenticated = isLoggedIn()

  return (
    <div>
      <Heading
        is="h1"
        size={900}
        marginTop={minorScale(4)}
        marginBottom={minorScale(7)}
      >
        Hydro UI
      </Heading>
      {authenticated ? <div>Welcome! {displayName}</div> : <AppAuthenticated />}
    </div>
  )
}

export default App
