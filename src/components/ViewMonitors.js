import React, { useState, useEffect } from 'react'
import client from '../utils/api-client'

import { useUser } from '../context/user-context'

const ViewMonitors = () => {
  const user = useUser()
  const [monitors, setMonitors] = useState([])

  useEffect(() => {
    async function fetchData() {
      const monitors = await client(`/p/monitors`)
      setMonitors(monitors)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div>Hello {user ? user.displayName : 'World'}</div>
      <p>{monitors[0] && monitors[0].name}</p>
    </div>
  )
}

export default ViewMonitors
