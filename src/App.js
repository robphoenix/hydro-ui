import React from 'react'
import { Heading, minorScale } from 'evergreen-ui'

import { login } from './utils/auth'
import LoginForm from './components/LoginForm'
import { useAuth } from './context/auth-context'

function App() {
  const { authenticatedUser, displayName } = useAuth()

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
      {authenticatedUser ? (
        <div>Welcome! {displayName}</div>
      ) : (
        <LoginForm onSubmit={login} />
      )}
    </div>
  )
}

export default App
