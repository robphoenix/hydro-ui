import React, { useState, useEffect } from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'

import client from '../utils/api-client'
import MonitorsTable from '../components/MonitorsTable'

const ViewMonitors = () => {
  const [monitors, setMonitors] = useState([])

  useEffect(() => {
    async function fetchData() {
      const monitors = await client(`/p/monitors`)
      setMonitors(monitors)
    }
    fetchData()
  }, [])

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="75%">
        <Heading
          is="h2"
          size={700}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Monitors
        </Heading>

        <MonitorsTable monitors={monitors} />
      </Pane>
    </Pane>
  )
}

export default ViewMonitors
