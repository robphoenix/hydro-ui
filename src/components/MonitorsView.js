import React from 'react'
import { Heading, minorScale } from 'evergreen-ui'
import { useUser } from '../context/user-context'

const MonitorsView = () => {
  const user = useUser()

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
      <div>Hello {user ? user.displayName : 'World'}</div>
    </div>
  )
}

export default MonitorsView
