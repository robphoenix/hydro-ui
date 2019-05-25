import React from 'react'
import { Heading, minorScale } from 'evergreen-ui'

import { useAuth } from './context/auth-context'
import AppAuthenticated from './components/AppAuthenticated'
import AppNotAuthenticated from './components/AppNotAuthenticated'

function App() {
  const { isLoggedIn } = useAuth()
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
      {authenticated ? <AppAuthenticated /> : <AppNotAuthenticated />}
    </div>
  )
}

export default App
