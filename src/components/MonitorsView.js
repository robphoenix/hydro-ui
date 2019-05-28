import React from 'react'

import { useUser } from '../context/user-context'

const MonitorsView = () => {
  const user = useUser()

  return (
    <div>
      <div>Hello {user ? user.displayName : 'World'}</div>
    </div>
  )
}

export default MonitorsView
