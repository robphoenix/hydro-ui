import React, { useState } from 'react'

const apiUrl = 'http://mn2formlt0001d0:6080'
const tokenKey = '__hydro_token__'

const login = ({ username, password }) => {
  const url = `${apiUrl}/login`
  const headers = { 'Content-Type': 'application/json' }
  const method = 'POST'
  const body = JSON.stringify({ username, password })
  const config = {
    method,
    headers,
    body,
  }

  window
    .fetch(url, config)
    .then((res) => res.json())
    .then(({ token }) => {
      window.localStorage.setItem(tokenKey, token)
    })
}

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Hydro UI</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default App
