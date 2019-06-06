import React, { useState, useEffect } from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'

import MonitorsTable from '../components/MonitorsTable'
import { useMonitor } from '../context/monitor-context'

const ViewMonitors = () => {
  const [monitors, setMonitors] = useState([])

  const { getMonitors } = useMonitor()

  useEffect(() => {
    getMonitors()
      .then((monitors) => setMonitors(monitors))
      .catch((error) => console.log({ error }))
  }, [getMonitors])

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
