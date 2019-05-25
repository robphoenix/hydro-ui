import React from 'react'

import { useUser } from '../context/user-context'

const AppAuthenticated = () => {
  const user = useUser()
  return <div>Hello {user ? user.displayName : 'World'}</div>
}

export default AppAuthenticated
