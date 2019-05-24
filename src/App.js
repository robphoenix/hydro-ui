import React from 'react'
import { Heading, minorScale } from 'evergreen-ui'

import { login } from './utils/auth'
import LoginForm from './components/LoginForm'

function App() {
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

      <LoginForm onSubmit={login} />
    </div>
  )
}

export default App
