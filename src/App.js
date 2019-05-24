import React from 'react'

import { login } from './utils/auth'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div>
      <h1>Hydro UI</h1>
      <LoginForm onSubmit={login} />
    </div>
  )
}

export default App
