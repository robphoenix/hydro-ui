import React from 'react'
import axios from 'axios'

import { useAuth } from './context/auth-context'
import { Spinner, Pane } from 'evergreen-ui'

const loadAuthenticatedApp = () => import('./components/AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() =>
  import('./components/UnauthenticatedApp'),
)

const FullPageSpinner = () => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={800}
    >
      <Spinner />
    </Pane>
  )
}

const App = () => {
  const { isLoggedIn, token } = useAuth()

  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])

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

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
